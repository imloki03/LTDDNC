import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOTP = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    const savedOTP = await AsyncStorage.getItem('otp');
    console.log(savedOTP+" "+otp);
    if (savedOTP === otp+"") {
    await AsyncStorage.setItem('isActivated', 'true');
    Alert.alert('Account activated successfully');
    navigation.navigate('Login');
    } else {
    Alert.alert('Invalid OTP');
    }
  };

  return (
    <View className="flex-1 justify-center bg-gray-100 p-6">
      <TextInput
        className="border border-gray-300 p-3 rounded mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
            onPress={handleVerifyOtp}
            className="bg-blue-500 py-3 rounded mb-3"
          >
            <Text className="text-white text-center">Verify OTP</Text>
          </TouchableOpacity>
    </View>
  );
};

export default VerifyOTP;
