const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.GOOGLE_EMAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GOOGLE_APP_USERNAME,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const EMailTemplates = {
  Otp: fs.readFileSync(
    path.join(__dirname, "emailTemplates", "otp.html"),
    "utf-8"
  ),
  TicketTemplate: fs.readFileSync(
    path.join(__dirname, "emailTemplates", "ticketTemplate.html"),
    "utf-8"
  ),
};

function fillTemplate(content, mapping) {
  for (let key in mapping) {
    content = content.replace(`#{${key}}`, mapping[key]);
  }
  return content;
}

async function emailHelper(emailContent, recieverEmail, mapping) {
  const htmlContent = fillTemplate(emailContent, mapping);
  const emailDetails = {
    to: recieverEmail,
    from: process.env.GOOGLE_APP_USERNAME,
    subject: "Mail from Scaler BookMyShow",
    html: htmlContent,
  };

  try {
    await transport.sendMail(emailDetails);
  } catch (err) {
    if (err.response && err.response.body) {
      console.error("Error sending email:", err.response.body);
    } else {
      console.error("Error occurred:", err.message);
    }
  }
}

module.exports = {
  default: emailHelper,
  EMailTemplates,
};
