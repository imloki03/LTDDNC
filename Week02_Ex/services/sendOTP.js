const express = require('express');
const { sendOTP } = require('./emailSender');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    console.log("in API");
    await sendOTP(email, otp);
    res.status(200).send({ message: 'OTP sent', otp });
  } catch (error) {
    console.log("bug"+error);
    res.status(500).send({ message: 'Error sending OTP', error });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
