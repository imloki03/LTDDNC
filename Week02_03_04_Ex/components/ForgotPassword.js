import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity, Image } from 'react-native';
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
      const response = await fetch('http://192.168.97.173:3000/send-otp', {
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
    if (otp === sentOtp + "") {
      Alert.alert('OTP verified successfully!', 'Please enter your new password');
    } else {
      Alert.alert('Incorrect OTP');
    }
  };

  const resetPassword = async () => {
    if (otp !== sentOtp + "") {
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
    <View className="flex-1 justify-center bg-gray-100 p-6">
      {!showOtpInput ? (
        <>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="border border-gray-300 p-3 rounded mb-3"
          />
          <TouchableOpacity
            onPress={sendOtp}
            className="bg-blue-500 py-3 rounded mb-3"
          >
            <Text className="text-white text-center">Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            className="border border-gray-300 p-3 rounded mb-3"
          />
          <TouchableOpacity
            onPress={verifyOtp}
            className="bg-blue-500 py-3 rounded mb-3"
          >
            <Text className="text-white text-center">Verify OTP</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            className="border border-gray-300 p-3 rounded mb-3"
          />
          <TouchableOpacity
            onPress={resetPassword}
            className="bg-green-500 py-3 rounded mb-3"
          >
            <Text className="text-white text-center">Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ForgotPassword;
