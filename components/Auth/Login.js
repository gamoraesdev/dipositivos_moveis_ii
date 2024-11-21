import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://backend-aula.vercel.app/app/login', {
        usuario,
        senha,
      });

      
      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token); 

      Alert.alert('Sucesso', 'Login realizado com sucesso');
      navigation.navigate('Home'); 
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <TextInput placeholder="Usuário" value={usuario} onChangeText={setUsuario} style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
};

export default Login;
