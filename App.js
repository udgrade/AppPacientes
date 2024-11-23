import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator() 

import PacientesList from './Screens/PacientesList'
import CrearPaciente from './Screens/CrearPaciente'
import PacientesDetail from './Screens/PacientesDetail'


function MyStack(){

  return(
    <Stack.Navigator>
      <Stack.Screen name="PacientesList" component={PacientesList} options={{title: 'Lista de Pacientes'}}/>
      <Stack.Screen name="CrearPaciente" component={CrearPaciente} options={{title: 'Añadir Paciente'}}/>
      <Stack.Screen name="PacientesDetail" component={PacientesDetail} options={{title: 'Datos del Paciente'}}/>
    </Stack.Navigator>
  );


}

export default function App() {
  return (
    <NavigationContainer>

      <MyStack/>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
