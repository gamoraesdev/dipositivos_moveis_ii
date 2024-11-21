import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

const SearchProducts = () => {
  const [nome, setNome] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarProdutos = async () => {
    try {
      
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Erro', 'Você não está logado. Faça o login primeiro.');
        return;
      }

      
      const response = await axios.get(`https://backend-aula.vercel.app/app/produtos/${nome}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      setResultados(response.data);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao buscar produtos');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />
      <Button title="Buscar" onPress={buscarProdutos} />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={{ padding: 10 }}>{item.nome}</Text>}
      />
    </View>
  );
};

export default SearchProducts;
