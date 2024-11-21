import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Lojinha</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Novo Produto"
          onPress={() => navigation.navigate('AddProduct')}
        />
        <Button
          title="Listar Produtos"
          onPress={() => navigation.navigate('ProductList')}
        />
        <Button
          title="Editar Produto"
          onPress={() => navigation.navigate('EditProduct')}
        />
        <Button
          title="Deletar Produto"
          onPress={() => navigation.navigate('SearchProducts')} // Pode usar uma tela específica para deletar
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Home;
