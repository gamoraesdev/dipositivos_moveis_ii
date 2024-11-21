import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async () => {
    if (senha !== confirm) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    
    try {
      const response = await axios.post('https://backend-aula.vercel.app/app/registrar', {
        usuario,
        senha,
        confirm,
      });
      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.navigate('Login'); // Navegar para a tela de login
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <TextInput placeholder="Usuário" value={usuario} onChangeText={setUsuario} style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirmação" value={confirm} onChangeText={setConfirm} secureTextEntry style={styles.input} />
      <Button title="Registrar" onPress={handleSubmit} />
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

export default Register;
