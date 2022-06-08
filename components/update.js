import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import firebaseApp from './firebaseConfig'

export default function Update({navigation, route}) {
  const [nomeEdit, setNomeEdit] = useState('')
  const [enderecoEdit, setEnderecoEdit] = useState('')
  const [telefoneEdit, setTelefoneEdit] = useState('')
  const [dataNascimentoEdit, setDataNascimentoEdit] = useState('')
  const [image, setImage] = useState('');
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();
  const item = route.params.id

  function editar(dataNascimentoEdit, enderecoEdit, nomeEdit, telefoneEdit, id) {
    
    const upload = () => {
      if (image == null)
        return;
      storage.ref(`/images/${nomeEdit.replace(/ +/g, "") + "_" + image.name}`).put(image);
    }
      db.collection("agenda").doc(id).update({
        "dataNascimento": dataNascimentoEdit,
        "endereco": enderecoEdit,
        "nome": nomeEdit,
        "telefone": telefoneEdit,
        "image": nomeEdit.replace(/ +/g, "") + "_" + image.name,
        "uid": item
        }, { merge: true })
      setNomeEdit('');
      setTelefoneEdit('');
      setDataNascimentoEdit('');
      setEnderecoEdit('');
      upload();

      navigation.navigate('TabBar')
  }
  


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Editar contato</Text>
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
      <p>
      <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
      </p>

      <View style={styles.botaoSalvar}>
        <Button
          title='Salvar'
          onPress={() => {editar(dataNascimentoEdit, enderecoEdit, nomeEdit, telefoneEdit, item)}}
        />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fae3eb',
    alignItems: 'center',
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#B5104A',
    marginTop: 10,
    padding: 10,
    height: 40,
    width: '60%',
  },
  botaoSalvar: {
    position: 'absolute',
    marginTop: 300,
  },
  salvar: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'arial',
  },
  titleText: {
    color: '#f20a4f',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  },
  textSucesso: {
    flex: 1,
    color: '#555',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 10,
    marginTop: '95%',
  }
})