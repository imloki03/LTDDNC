import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.10:3000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setSentOtp(data.otp);
      setShowOtpInput(true);
      Alert.alert('OTP has been sent to your email');
    } catch (error) {
      Alert.alert('Error sending OTP');
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    if (otp === sentOtp+"") {
      Alert.alert('OTP verified successfully!', 'Please enter your new password');
    } else {
      Alert.alert('Incorrect OTP');
    }
  };

  const resetPassword = async () => {
    if (otp !== sentOtp+"") {
      Alert.alert('Please verify the OTP first');
      return;
    }

    if (!newPassword) {
      Alert.alert('Please enter your new password');
      return;
    }

    try {
      await AsyncStorage.setItem("userPassword", newPassword);
      Alert.alert('Password reset successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error resetting password');
    }
  };

  return (
    <View>
      {!showOtpInput ? (
        <>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
          
          <TextInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Button title="Reset Password" onPress={resetPassword} />
        </>
      )}
    </View>
  );
};

export default ForgotPassword;
