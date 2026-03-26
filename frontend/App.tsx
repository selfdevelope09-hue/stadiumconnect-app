import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

// Home Screen
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏟️ StadiumConnect</Text>
      <Text style={styles.subtitle}>India's Premier Event Platform</Text>
      <Button title="Browse Vendors" onPress={() => navigation.navigate('Vendors')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

// Vendors Screen
function VendorsScreen() {
  return (
    <View style={styles.container}>
      <Text>Vendors List</Text>
    </View>
  );
}

// Login Screen
function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Vendors" component={VendorsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001a4d',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
});
