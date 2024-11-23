import React, {useEffect, useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'

const PacientesDetail = (props) => {

    const initialState = {
        id: '',
        name: '',
        age: '',
        phone: '',
        location: ''
    }

    const [paciente, setPaciente] = useState({initialState})

    const [loading, setLoading] = useState(true)

    const getPacienteById = async (id) => {
        const dbRef = firebase.db.collection('Pacientes').doc(id)
        const doc = await dbRef.get();
        const paciente = doc.data();
        setPaciente({
            ...paciente,
            id: doc.id
        })
        setLoading(false)
    }

    useEffect(() =>{
        getPacienteById(props.route.params.pacienteID)
    }, []);

    const deletePaciente = async () => {
        const dbRef = firebase.db.collection('Pacientes').doc(props.route.params.pacienteID);
        await dbRef.delete();
        alert('Paciente Eliminado')
        props.navigation.navigate('PacientesList')
    }
    
    const confirmationAlert = () => {
        Alert.alert('¿Eliminar Paciente?', '¿Estas Seguro?', [
            {text: 'Si', onPress: () => deletePaciente()},
            {text: 'No', onPress: () => console.log('Cancelado')}
        ])
    }

    const updatePaciente = async () => {
        const dbRef = firebase.db.collection('Pacientes').doc(paciente.id);
        await dbRef.set({
            name: paciente.name,
            age: paciente.age,
            phone: paciente.phone,
            location: paciente.location
        })
        setPaciente(initialState)
        alert('Datos del Paciente Actualizados')
        props.navigation.navigate("PacientesList")
    }

    if(loading){
        return(
            <View>
                <ActivityIndicator size ="large" color="#9e9e9e"/>
            </View>
        )
    }

   return(
    <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Nombre del Paciente" value={paciente.name} onChangeText={(value) => setPaciente({ ...paciente, name: value})}/>
        </View>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Edad del Paciente" value={paciente.age} onChangeText={(value) => setPaciente({ ...paciente, age: value})}/>
        </View>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Celular del Paciente" value={paciente.phone} onChangeText={(value) => setPaciente({ ...paciente, phone: value})}/>
        </View>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Direccion del Paciente" value={paciente.location} onChangeText={(value) => setPaciente({ ...paciente, location: value})}/>
        </View>
        <View>
          <Button color="#19AC52" title="Actualizar Paciente" onPress={() => updatePaciente()}/>
        </View>
        <View>
          <Button color="#E37399" title="Eliminar Paciente" onPress={() => confirmationAlert()}/>
        </View>
  </ScrollView>
   )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default PacientesDetail