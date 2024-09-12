import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-2xl font-bold mb-8">Welcome to ProjectCT!</Text>
        
        <TouchableOpacity 
          className="bg-blue-500 p-4 rounded-md mb-4 w-64"
          onPress={() => navigation.navigate('Profile')}
        >
          <Text className="text-white text-center">Xem Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-red-500 p-4 rounded-md w-64"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white text-center">Logout</Text>
        </TouchableOpacity>
      </View>
  );
};

export default Home;
