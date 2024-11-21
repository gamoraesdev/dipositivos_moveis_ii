import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const ProductList = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Recupera o token armazenado
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token recuperado:', token); 

        if (!token) {
          Alert.alert('Erro', 'Você não está logado. Faça o login primeiro.');
          return;
        }

        
        const response = await axios.get('https://backend-aula.vercel.app/app/produtos', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Produtos recebidos:', response.data); 

        
        setProdutos(response.data);
      } catch (error) {
        Alert.alert('Erro', error.response?.data?.error || 'Erro ao listar produtos');
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
      
      {loading ? (
        <Text>Carregando produtos...</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderWidth: 1, marginVertical: 5 }}>
              <Text>{item.nome}</Text>
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditProduct', { id: item._id })}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ProductList;
