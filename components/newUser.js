import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, TextInput, Dimensions,
    TouchableOpacity, Platform, ImageBackground
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'
import myImage from "../assets/images/Gradient_FrUXyC2.png";


export default function NewUser({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorRegister, setErrorRegister] = useState('')

    const register = () => {
        if (password != password2){
            alert('As senhas não coincidem')

        }else{firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                navigation.navigate('Home', { idUser: user.uid })
            })
            .catch((error) => {
              setErrorRegister(true)
                let errorCode = error.code
                let errorMessage = error.message
            });}
        
    }

    useEffect(() => { }, []);

    return (
        <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={myImage}
            resizeMode="cover"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={styles.title}>Crie</Text>
            <Text style={styles.titleTwo}>Uma Conta</Text>


            <View style={styles.input}>
                <TextInput style={styles.textInput1}
                    placeholder='Email'
                    type='text'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput style={styles.textInput1}
                    placeholder='Senha'
                    secureTextEntry={true}
                    type='password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <TextInput style={styles.textInput1}
                    placeholder='Confirma senha'
                    secureTextEntry={true}
                    type='password'
                    onChangeText={(text) => setPassword2(text)}
                    value={password2}
                />
                
                {/*############ ERROR #######################*/}
                {errorRegister === true
                    ?
                    <View style={styles.error}>
                        <MaterialCommunityIcons
                            name='alert-circle'
                            size={20}
                            color='#f00'
                        /><Text style={styles.warning}> E-mail ou senha inválido</Text>
                    </View>
                    :
                    <View />
                }
                {/*############ FIM ERROR ##################*/}

                {email === "" || password === ""
                    ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.buttonRegister}
                    >
                        <Text style={styles.textRegisterOff}>Register</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonRegister}
                        onPress={register}
                    >
                        <Text style={styles.textRegisterOn}>Register</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.registration}>
                    Já está cadastrado? 
                    <TouchableOpacity
                        style={styles.linkSubscribe}
                        onPress={()=>navigation.navigate('Login')}
                    >
                        <Text> Entre agora</Text>
                    </TouchableOpacity>
                </Text>

            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    textInput: {
        color: '#f00',
        fontSize: 20,
    },
    textInput1: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 30,
        marginTop: 10,
        width: '90%',
        height: 40,
        marginLeft: 22,
    },
    register: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    titleTwo:{
        fontSize: 45,
        marginBottom: 10,
        color: '#82153b',
        alignSelf: 'center',
        fontFamily:'Courier'
    },
    
    title: {
       
        fontSize: 47,
        color: '#82153b',
        alignSelf: 'center',
        fontFamily:'Courier'
    },
    error: {
        flexDirection: 'row',
        width: '80%',
    },
    warning: {
        flexDirection: 'row',
        paddingLeft: 5,
    },
    buttonRegister: {
        width: 90,
        height: 45,
        backgroundColor: '#82153b',
        borderRadius: 12,
        marginTop: 30,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        
    },
    textRegisterOff: {
        fontSize: 18,
        color: 'white',
    },

    textRegisterOn: {
        fontSize: 16,
        color: '#82153b',
    },

    registration: {
        marginTop: 30,
        fontWeight: 'italic',
        fontSize: 17,
        textAlign: 'center',

    },
    linkSubscribe: {
        color: '#1256c4',
        textDecorationLine: 'underline',
    },
    rect_imageStyle: {
        width: '100%',
        height: Dimensions.get("window").height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 100,
    },

    input: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },


    textInput1: {
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: 'black',
        width: '80%',
        height: 40,
        fontSize: 15,
        backgroundColor: 'white',

    },

    rect:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
