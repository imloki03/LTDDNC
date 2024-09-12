import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
  });

  const handleLogin = async (values) => {
    const savedEmail = await AsyncStorage.getItem('userEmail');
    const savedPassword = await AsyncStorage.getItem('userPassword');

    if (values.email === savedEmail && values.password === savedPassword) {
      navigation.navigate('Home');
    } else {
      alert('Login failed. Please check again');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="flex-1 justify-center bg-gray-100 p-6">
          <View className="items-center mb-20">
            <Image
              source={require('../assets/logo.png')}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </View>

          <TextInput
            className="border border-gray-300 p-3 rounded mb-3"
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
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
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="bg-gray-500 py-3 rounded mb-3"
          >
            <Text className="text-white text-center">Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className="text-blue-600 text-center">Forgot password?</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Login;
