// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';

// // Load environment variables
// dotenv.config();

// // Create a transporter using SendInBlue credentials
// const transporter = nodemailer.createTransport({
//   host: process.env.SENDINBLUE_HOST,
//   port: parseInt(process.env.SENDINBLUE_PORT),
//   secure: false, // For SendInBlue/Brevo, use 'false' for port 587
//   auth: {
//     user: process.env.SENDINBLUE_USER,
//     pass: process.env.SENDINBLUE_API_KEY, // Use the API key for SendInBlue/Brevo
//   },
// });

// // Function to send email
// const sendEmail = (email, subject, htmlContent) => {
//   const mailOptions = {
//     from: process.env.SENDINBLUE_USER,
//     to: email,
//     subject: subject,
//     html: htmlContent,
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log('Error in sending email: ', error);
//         reject(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//         resolve(info);
//       }
//     });
//   });
// };

// // Export the sendEmail function using ES6 export
// export default sendEmail;








 import dotenv from 'dotenv';
 import nodemailer from 'nodemailer';
 dotenv.config();



const transporter = nodemailer.createTransport({
 service: 'gmail',
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: {
  user: process.env.SENDINBLUE_USER,
  pass: process.env.APP_PASSWORD,
 },
});

const sendEmail = (email, token) => {
 const mailOptions = {
  from: 'niazi@gmail.com',
  to: email,
  subject: 'Email verification',
  html:
'<p>Please click on the following link to verify your email address:</p>' +
'<a href="http://localhost:3000/verify/' +
token +
'">http://localhost:3000/verify/' +
token +
  '</a>',
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Error in sending email  ' + error);
    return true;
  } else {
   console.log('Email sent: ' + info.response);
   return false;
  }
 });
};

export default  sendEmail;