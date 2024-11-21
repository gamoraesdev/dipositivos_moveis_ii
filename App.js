import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProductList from './components/Products/Products';
import SearchProducts from './components/Products/SearchProducts';
import AddProduct from './components/Products/AddProducts';
import EditProduct from './components/Products/EditProduct';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>        
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="SearchProducts" component={SearchProducts} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
