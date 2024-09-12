const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xeuchayxc@gmail.com', 
    pass: 'frguznmezcltemno', 
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: 'xeuchayxc@gmail.com',
    to: email,
    subject: 'ProjectCT - OTP Forgot Password',
    text: `Your OTP code is ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
