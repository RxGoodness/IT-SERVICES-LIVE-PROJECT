import nodemailer from "nodemailer";
//send Email

async function sendEmail(email: any, subject: any, text: any) {
  let transport = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: subject,
    text: text,
  };

  transport.sendMail(
    mailOptions,
    function (err: any, info: { response: string }) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent to user " + info.response);
      }
    }
  );
}

export const validateImageFile = async (file: string) => {
  if (!file) {
    return "No image in the request";
  }
};
export { sendEmail };


