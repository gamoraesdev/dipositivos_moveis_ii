import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const EditProduct = ({ navigation, route }) => {
  const { id } = route.params; 
  const [produto, setProduto] = useState({});

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Erro', 'Você não está logado. Faça o login primeiro.');
          return;
        }

        
        const response = await axios.get(`https://backend-aula.vercel.app/app/produtos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, 
        });

        
        setProduto(response.data);
      } catch (error) {
        Alert.alert('Erro', error.response?.data?.error || 'Erro ao buscar produto');
      }
    };

    fetchProduct();
  }, [id]);

  
  const handleUpdate = async () => {
    try {
      
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Erro', 'Você não está logado. Faça o login primeiro.');
        return;
      }

      
      await axios.put(`https://backend-aula.vercel.app/app/produtos/${id}`, produto, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
      navigation.navigate('ProductList'); 
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao atualizar produto');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nome"
        value={produto.nome}
        onChangeText={(text) => setProduto({ ...produto, nome: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={produto.quantidade}
        onChangeText={(text) => setProduto({ ...produto, quantidade: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={produto.preco}
        onChangeText={(text) => setProduto({ ...produto, preco: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={produto.descricao}
        onChangeText={(text) => setProduto({ ...produto, descricao: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Imagem (URL)"
        value={produto.imagem}
        onChangeText={(text) => setProduto({ ...produto, imagem: text })}
        style={styles.input}
      />
      <Button title="Atualizar Produto" onPress={handleUpdate} />
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

export default EditProduct;
