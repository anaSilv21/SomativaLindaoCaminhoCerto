import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, TextInput, Dimensions,
    TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'
import myImage from "../assets/images/Gradient_FrUXyC2.png";



export default function App({ navigation }) {
    const [email, setEmail] = useState('macarena@ayy.com')
    const [password, setPassword] = useState('12345678')
    const [errorLogin, setErrorLogin] = useState('')

    const loginFirebase = () => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                navigation.navigate('Home', { idUser: user.uid })
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code
                let errorMessage = error.message
            });
    }

    useEffect(() => {
    }, []);

    return (
        <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            source={myImage}
            resizeMode="cover"

        >
            <View style={styles.TelaLogin}>
                <Text style={styles.title}>Login</Text>
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
                {/*############ ERROR #######################*/}
                {errorLogin === true
                    ?
                    <View style={styles.error}>
                        <MaterialCommunityIcons
                            name='alert-circle'
                            size={20}
                            color='#f00'
                        /><Text style={styles.warning}>E-mail ou senha inválido</Text>
                    </View>
                    :
                    <View />
                }
                {/*############ FIM ERROR ##################*/}

                {email === "" || password === ""
                    ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.textLoginOff}>Login</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonLogin}
                        onPress={loginFirebase}
                    >
                        <Text style={styles.textLoginOn}>Login</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.registration}>
                Não tem cadastro?
                    <TouchableOpacity
                        style={styles.linkSubscribe}
                        onPress={() => navigation.navigate('NewUser')}
                    >
                        <Text> Cadastra-se agora</Text>
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
        display:'flex',
        flexDirection: 'column',

    },

    TelaLogin:{
        width: '100%',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    login: {
        alignSelf:'center',
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        borderRadius: 15,

    },
    title: {
        marginBottom: 10,
        fontSize: 50,
        color: '#82153b',
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
    buttonLogin: {
        width: 90,
        height: 45,
        backgroundColor: '#82153b',
        borderRadius: 12,
        marginTop: 30,
        width: 100,
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        alignSelf:'center',
  
    
    },


    textLoginOff: {
        fontSize: 20,
        color: 'white',

    },
    textLoginOn: {
        fontSize: 17,
        color: 'white',
       
    },
    registration: {
        marginTop: 30,
        fontWeight: 'italic',
        fontSize: 17,
        textAlign: 'center',

    },

    subscribe:{
        textDecorationLine:'underline',
    },

    linkSubscribe: {
        color: '#1256c4',
        fontSize: 17,
        textDecorationLine: 'underline',
        
    },
    rect_imageStyle: {
        width: '100%',
        height: Dimensions.get("window").height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 100,
    },

    input:{
        width: '100%',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    textInput1: {
        borderRadius:5,
        marginTop:20,
        borderWidth:2,
        borderColor: 'black',
        width: '80%',
        height: 40,
        fontSize:15,
        backgroundColor: 'white',
       
    },
    rect:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }



});
