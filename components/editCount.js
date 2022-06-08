import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import firebaseApp from './firebaseConfig'

export default function editProfile({ navigation, route }) {
    
    
    const [nomeEdit, setNomeEdit] = useState('')
    const [enderecoEdit, setEnderecoEdit] = useState('')
    const [telefoneEdit, setTelefoneEdit] = useState('')
    const [dataNascimentoEdit, setDataNascimentoEdit] = useState('')
    const [bioEdit, setBioEdit] = useState('')
    const [image, setImage] = useState('');
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();
    const item = route.params.idUser

    function editar(dataNascimentoEdit, enderecoEdit, nomeEdit, telefoneEdit, bioEdit, id){ 

            const img = nomeEdit.replace(/ +/g, "") + "_" + image.name

            db.collection('users').doc('PKbYoBtIMyqLqG2GeNHf').update({
                "dataNascimento": dataNascimentoEdit,
                "endereco": enderecoEdit,
                "nome": nomeEdit,
                "telefone": telefoneEdit,
                "bio": bioEdit,
                "image": img,
                "uid": item,
            }, { merge: true })
        setNomeEdit('');
        setTelefoneEdit('');
        setDataNascimentoEdit('');
        setEnderecoEdit('');
        upload();

        navigation.navigate('TabBar', {idUser: id})
    }

    const upload = () => {
        if (image == null)
            return;
        storage.ref(`/images/${nomeEdit.replace(/ +/g, "") + "_" + image.name}`).put(image);
    }


    return (
        <View style={styles.container}>
          <View style={styles.container}>
          <View style={styles.titulo}>
            <Text style={styles.titleText}>Edite seu perfil</Text>
          </View>
          <TextInput
              style={styles.textInput}
              placeholder="Nome"
              onChangeText={setNomeEdit}
              value={nomeEdit}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Endereço"
              onChangeText={setEnderecoEdit}
              value={enderecoEdit}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Telefone"
              onChangeText={setTelefoneEdit}
              value={telefoneEdit}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Data Nascimento"
              onChangeText={setDataNascimentoEdit}
              value={dataNascimentoEdit}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Bio"
              onChangeText={setBioEdit}
              value={bioEdit}
            />
    
            <View style={styles.foto}>
              <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            </View>
            <View style={styles.botaoSalvar}>
              <TouchableOpacity style={styles.btnsalvar}
                onPress={() => { editar(dataNascimentoEdit, enderecoEdit, nomeEdit, telefoneEdit, bioEdit, item) }}
              ><Text style={styles.btnText}>Salvar</Text></TouchableOpacity>
            </View>
          </View>
        </View >
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:'#fae3eb',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
        borderRadius: 5,
        backgroundColor: '#B5104A',
        marginTop: 15,
        padding: 10,
        height: 40,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        placeholderTextColor: '#fff'
    
      },
      botaoSalvar: {
        position: 'absolute',
        marginTop: 500,
        alignItems: 'center',
        justifyContent: 'center',
        textColor: 'white',
    
      },
      salvar: {
        fontSize: 10,
        color: 'red',
        fontFamily: 'arial',
      },
      titleText: {
        color: '#B5104A',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'calibri',
        justifyContent: 'center',
        marginTop: 35,
    
      },
      textSucesso: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 0,
        marginTop: 0,
        height: 50,
        bottom: 15,
      },
      foto: {
        alignItems: 'center',
        marginTop: 30,
      },
      fotoBotao: {
        marginTop: 20,
        width: '40%',
      },
      fotoFoto: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        width: 100,
        height: 100,
      },
    
      btnsalvar: {
        backgroundColor: '#B5104A',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        bottom: 10,
        borderRadius: 5
      },
    
      btnText: {
        color: 'white',
      }
    
    })