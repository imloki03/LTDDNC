import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [user, setUser] = useState({
        username: 'xxx',
        name: 'xxx xxx xxx',
        email: '',
      });
    useEffect(() => {
        const loadUserEmail = async () => {
            try {
            const savedEmail = await AsyncStorage.getItem('userEmail');
            if (savedEmail !== null) {
                setUser((prevUser) => ({
                ...prevUser,
                email: savedEmail,
                }));
            }
            } catch (error) {
            console.log('Error loading email:', error);
            }
        };
        loadUserEmail();
    }, []);
  return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Image 
          source={require('../assets/avt.png')} 
          className="w-32 h-32 rounded-full mb-6"
        />
        
        <Text className="text-xl font-bold mb-2">Username: {user.username}</Text>
        <Text className="text-lg mb-2">Name: {user.name}</Text>
        <Text className="text-lg">Email: {user.email}</Text>
      </View>
  );
};

export default Profile;
