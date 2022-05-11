import nodemailer from "nodemailer";

interface JoiError {
  message: string;
  path?: string[];
  type?: string;
  context?: Record<string, string>;
}

export const formatError = (errors: JoiError[]) => {
  errors.map((err) => {
    delete err.path;
    delete err.context;
    delete err.type;
  });

  return errors;
};

export interface FinalError {
  original: Object;
  details: JoiError[];
}

//send Email
async function sendEmail(email: any, subject: any, text: any) {
  let transport = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
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
    },
  );
}
export { sendEmail };
