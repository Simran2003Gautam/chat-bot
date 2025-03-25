class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

//     async onSendButton(chatbox) {
//         var textField = chatbox.querySelector('input');
//         let text1 = textField.value
//         if (text1 === "") {
//             return;
//         }

//         let msg1 = { name: "User", message: text1 }
//         this.messages.push(msg1);
//   let data= await fetch('http://127.0.0.1:5000/predict', {
//             method: 'POST',
//             body: JSON.stringify({ message: text1 }),
//             mode: 'cors',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//           })
//         // .then(r => r.json(), console.log(r))
//         //   .then(r => {
//         //     let msg2 = { name: "Sam", message: r.answer };
//         //     this.messages.push(msg2);
//         //     this.updateChatText(chatbox)
//         //     textField.value = ''

//         // })
//         .catch((error) => {
//             console.error('Error:', error);
//             this.updateChatText(chatbox)
//             textField.value = ''
//           });
         
       
//         let msg2 = {name: "Sam", message: data}
//         this.messages.push(msg2)
//         this.updateChatText(chatbox)
//         textField.value = ''
//     }

async onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value;
    if (text1 === "") {
        return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    try {
        let response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });
console.log((response))
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let data = await response.json();
        let botMessage = JSON.stringify(data.data) || "I am unable to process that at the moment."; // Assuming the bot's response is in `answer`
console.log(botMessage)
        let msg2 = { name: "Sam", message:JSON.stringify(data.data)};
        this.messages.push(msg2);
    } catch (error) {
        console.error('Error:', error);
        let errorMessage = { name: "Sam", message: "Something went wrong. Please try again later." };
        this.messages.push(errorMessage);
    }

    this.updateChatText(chatbox);
    textField.value = '';
}


    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();