import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import PersonalInfoScreen from './fragments/info';
import HelloWorldScreen from './fragments/hello_world';

export default function App() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);

  useEffect(() => {   
    const timer = setTimeout(() => {
    setShowHelloWorld(true);
  }, 10000);
  return () => clearTimeout(timer);
}, []);
  return showHelloWorld ? <HelloWorldScreen /> : <PersonalInfoScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
