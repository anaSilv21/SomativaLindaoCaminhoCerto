import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default function Create({ navigation, route }) {
  const [texto, setTexto] = useState()
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [image, setImage] = useState('');
  const param = route.params.iddocara;

  const upload = () => {
    if (image == null)
      return;
    storage.ref(`/images/${nome.replace(/ +/g, "") + "_" + image.name}`).put(image);
  }

  function intervalo() {
    setInterval(function () {
      setTexto('')
    }, 2000);
    setTexto('Cadastrado com sucesso')
  }

  function adicionarItem() {
    const img = nome.replace(/ +/g, "") + "_" + image.name
    db.collection("agenda").add({
      nome: nome,
      dataNascimento: dataNascimento,
      endereco: endereco,
      telefone: telefone,
      status: false,
      image: img,
      uid: param
    })
    upload()
    setNome("")
    setDataNascimento("")
    setEndereco("")
    setTelefone("")
    intervalo()
  }

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.titleText}>Adicionar contato</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Nome"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Endereço"
          onChangeText={setEndereco}
          value={endereco}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Telefone"
          onChangeText={setTelefone}
          value={telefone}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Data Nascimento"
          onChangeText={setDataNascimento}
          value={dataNascimento}
        />

        <View style={styles.foto}>
          <View style={styles.fotoFoto}>
            <Text style={{ color: '#aaa' }}>
              FOTO
            </Text>
          </View>
          <View style={styles.foto}>
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
          </View>
        </View>

        <View style={styles.textSucesso}>
          <Text style={{ color: '#0c0', fontSize: 20 }}>{texto}</Text>
        </View>
        <View style={styles.botaoSalvar}>
          <TouchableOpacity style={styles.btnsalvar}
            onPress={() => { adicionarItem() }}
          ><Text style={styles.btnText}>Salvar</Text></TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fae3eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#B5104A',
    marginTop: 35,
    padding: 10,
    height: 40,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    placeholderTextColor: '#fff'

  },
  botaoSalvar: {
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