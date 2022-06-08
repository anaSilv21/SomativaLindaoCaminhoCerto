import React, { useState } from 'react'
// import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Entypo, Feather } from '@expo/vector-icons'
import Notes from './notes'
import firebaseApp from './firebaseConfig'


const db = firebaseApp.firestore();
const storage = firebaseApp.storage();


export default function addNote({ navigation }) {
    const [titulo, setTitulo] = useState('Título...')
    const [anotacoes, setAnotacoes] = useState('')
    const [time, setTime] = useState();


    function adicionar() {
        db.collection("notas").add({
            title: titulo,
            text: anotacoes,
            hour: time
        })
        
        const date = getCurrentTime();

        setTime(date)
        setAnotacoes("")
        navigation.navigate("Notes" )

    }
    console.log(time)
    const getCurrentTime = () => {
        let today = new Date();
        let day = (today.getDay() < 10 ? "0" : '') + today.getDay();
        let month = (today.getMonth() < 10 ? "0" : '') + today.getMonth();
        let year = today.getFullYear();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return day + '/' + month + '/' + year + " - " + hours + ":" + minutes;
      }


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.voltar}
                onPress={() => {
                    navigation.navigate('Notes')
                }}>
                <Feather name="corner-up-left" size={30} color={30} />
            </TouchableOpacity>
            <View style={styles.container2}>

                <TextInput style={styles.textInput1}
                    placeholder={titulo}
                    type='text'
                    onChangeText={(text) => setTitulo(text)}
                    value={titulo}
                />

                <View style={styles.campText}>

                    <TextInput style={styles.textInput2}
                        placeholder='Anotações'
                        type='text'
                        maxLength={1000}
                        multiline
                        autoCorrect
                        onChangeText={(text) => setAnotacoes(text)}
                        value={anotacoes}
                    />
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity 
                    style={styles.interage}
                    onPress={adicionar}
                    >
                        Salvar
                    </TouchableOpacity>

                </View>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: '#f20a4f',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'calibri'
    },
    campText: {
        marginTop: 10,
        height: 360,
        width: 350,
        backgroundColor: '#deab97',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput1: {
        height: 30,
        width: 160,
        marginTop: 100
    },
    textInput2: {
        paddingTop: 10,
        height: 290,
        width: 280
    },
    interage: {
        backgroundColor: "#e34400",
        height: 50,
        width: 100,
        margin: 5,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'calibri'

    },
    viewButton: {
        flexDirection: "row",
    },
    voltar: {
        marginTop: 20,
        marginLeft: 20,
    }
})