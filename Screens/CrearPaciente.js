import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase';

const CrearPacientes = (props) => {

    const [state, setState] = useState({
        nombre: "",
        edad: "",
        celular: "",
        direccion: ""
    });

    const addPaciente = async () => {
        if(state.nombre == ''){
            alert('Por favor llene todos los campos.')
        }else{
          try{
            await firebase.db.collection('Pacientes').add({
                name: state.nombre,
                age: state.edad,
                phone: state.celular,
                location: state.direccion
            })
            alert('Paciente añadido')
            props.navigation.navigate("PacientesList")
          }catch (error) {
            alert('Ha ocurrido un error.')
          }
        }
    }

   return(
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Nombre del Paciente" onChangeText={(value) => setState({ ...state, nombre: value})}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Edad del Paciente" onChangeText={(value) => setState({ ...state, edad: value})}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Celular del Paciente" onChangeText={(value) => setState({ ...state, celular: value})}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Direccion del Paciente" onChangeText={(value) => setState({ ...state, direccion: value})}/>
      </View>
      <View>
        <Button title="Añadir Paciente" onPress={() => addPaciente()}/>
      </View>
    </ScrollView>
   )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CrearPacientes