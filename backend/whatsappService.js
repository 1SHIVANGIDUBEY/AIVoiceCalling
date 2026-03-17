const twilio = require("twilio");

// Replace with your Twilio credentials
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

const fromNumber = "whatsapp:+14155238886"; // Twilio Sandbox number

async function sendWhatsApp(to, message) {
  try {
    const msg = await client.messages.create({
      from: fromNumber,
      to: `whatsapp:${to}`, // recipient number with country code
      body: message
    });
    console.log(`Message sent to ${to}: ${msg.sid}`);
  } catch (err) {
    console.error(`Failed to send to ${to}: ${err.message}`);
  }
}

module.exports = sendWhatsApp;