import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PersonalInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./avt.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Nguyễn Văn Thi</Text>
      <Text style={styles.info}>Ngày sinh: 29/11/2003</Text>
      <Text style={styles.info}>Ngành: Công nghệ thông tin</Text>
      <Text style={styles.info}>Trường: Đại học SPKT tp.HCM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default PersonalInfoScreen;
