import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const AddProduct = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = async () => {
    try {
      
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Erro', 'Você não está logado. Faça o login primeiro.');
        return;
      }

      
      const response = await axios.post('https://backend-aula.vercel.app/app/produtos', 
        {
          nome,
          quantidade,
          preco,
          descricao,
          imagem,
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      Alert.alert('Sucesso', 'Produto adicionado com sucesso');
      navigation.navigate('ProductList'); 
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao adicionar produto');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput 
        placeholder="Nome" 
        value={nome} 
        onChangeText={setNome} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Quantidade" 
        value={quantidade} 
        onChangeText={setQuantidade} 
        keyboardType="numeric" 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Preço" 
        value={preco} 
        onChangeText={setPreco} 
        keyboardType="numeric" 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Descrição" 
        value={descricao} 
        onChangeText={setDescricao} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Imagem (URL)" 
        value={imagem} 
        onChangeText={setImagem} 
        style={styles.input} 
      />
      <Button title="Adicionar Produto" onPress={handleSubmit} />
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

export default AddProduct;
