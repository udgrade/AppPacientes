import React, { useState, useEffect } from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'
import CrearPacientes from './CrearPaciente'
import { ListItem } from 'react-native-elements'

const PacientesList = (props) => {

    const [pacientes, setPacientes] = useState([])

    useEffect(() => {

        firebase.db.collection('Pacientes').onSnapshot(querySnapshot => {

            const pacientes = [];

            querySnapshot.docs.forEach(doc => {
                const {name, age, phone, location} = doc.data()
                pacientes.push({
                    id: doc.id,
                    name,
                    age,
                    phone,
                    location
                })
            })
            setPacientes(pacientes)
        });

    }, []);

   return(
      <ScrollView>
          <Button title="Crear Paciente" onPress={() => props.navigation.navigate("CrearPaciente")}/>

          {
              pacientes.map(paciente => {
                  return(
                      <ListItem key={paciente.id} bottomDivider onPress={() => props.navigation.navigate("PacientesDetail", {pacienteID: paciente.id})}>
                          <ListItem.Chevron/>
                                <ListItem.Content>
                                    <ListItem.Title>{paciente.name}</ListItem.Title>
                                    <ListItem.Subtitle>{paciente.location}</ListItem.Subtitle>
                                </ListItem.Content>
                      </ListItem>
                  )
              })
          }
      </ScrollView>
   )

}

const styles = StyleSheet.create({

})

export default PacientesList