const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  //console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

//   client.on("message", (msg) => {
//     if (msg.body == "!ping") {
//       msg.reply("pong");
//     }
//   });

client.initialize();

const sendMsg = async (numbers, message) => {
  // if (number_details) {
  //     const sendMessageData = await client.sendMessage(number_details, message); // send message
  //     console.log({ sendMessageData });
  //   } else {
  //     console.log(final_number, "Mobile number is not registered");
  //   }
  console.log(numbers);
  console.log(message);
  const number = numbers;
  const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
  const final_number = `91${sanitized_number.substring(
    sanitized_number.length - 10
  )}`; // add 91 before the number here 91 is country code of India

  const number_details = await client.getNumberId(final_number); // get mobile number details

  if (number_details) {
    const sendMessageData = await client.sendMessage(
      number_details._serialized,
      message
    ); // send message
  } else {
    console.log(final_number, "Mobile number is not registered");
  }
};

module.exports = { sendMsg };
