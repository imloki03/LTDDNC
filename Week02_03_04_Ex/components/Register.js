import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
  const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
  });

  const handleRegister = async (values) => {
    await AsyncStorage.setItem('userEmail', values.email);
    await AsyncStorage.setItem('userPassword', values.password);
    await AsyncStorage.setItem('isActivated', 'false');

    // Gửi OTP đến email (gọi API gửi OTP)
    const response = await fetch('http://192.168.97.173:3000/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email }),
    });

    const data = await response.json();
    console.log("regis"+data);

    if (data.otp !== null) {
      await AsyncStorage.setItem('otp', data.otp+"");
      navigation.navigate('VerifyOTP', { email: values.email });
    } else {
      Alert.alert('Failed to send OTP');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="flex-1 justify-center bg-gray-100 p-6">
          <TextInput
            className="border border-gray-300 p-3 rounded mb-3"
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && <Text className="text-red-500 mb-2">{errors.email}</Text>}
          <TextInput
            className="border border-gray-300 p-3 rounded mb-3"
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && <Text className="text-red-500 mb-2">{errors.password}</Text>}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 py-3 rounded mb-3"
          >
            <Text className="text-white text-center">Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};


export default Register;
