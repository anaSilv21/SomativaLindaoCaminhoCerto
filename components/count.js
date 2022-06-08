//Arrumar a pagina de perfil e fazer com que cada user seja único
// https://firebase.google.com/docs/auth/admin/manage-users?hl=pt-br
//https://firebase.google.com/docs/auth/admin/manage-sessions?hl=pt-br
//https://firebase.google.com/docs/auth/admin/custom-claims?hl=pt-br


import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();


export default function Count({ navigation, route }) {
  var param = route.params?.iddocara

  const URL = "https://firebasestorage.googleapis.com/v0/b/somativalindao.appspot.com/o/images%2F"
  const media = "?alt=media"
  const [page, setPage] = useState([])

  useEffect(() => {
    db.collection("users").onSnapshot((query) => {
      query.forEach((doc) => {
        setPage({ ...doc.data(), id: doc.id })
        return;
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Meu perfil</Text>
      <View style={{position:'absolute', marginTop:-500,marginRight: 190}}>{
          page.image != "" ?
            <Image source={{ uri: `${URL + page.image + media}` }} style={{ height: 200, width: 200, position: 'absolute', borderRadius: 5 }} />
            :
            <></>
        }</View>
      
      <View style={styles.pageDelete}>
        <View style={styles.alterarPerfil}>
        <TouchableOpacity
          style={styles.deleteItemX}
          onPress={() => { navigation.navigate('EditProfile', { idUser: param}) }}
        >
          <FontAwesome
            name='pencil'
            size={25}
            color='#f00'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteItemX}
          onPress={() => {localStorage.clear(),  navigation.navigate('Login')}}
        >
          <FontAwesome
            name='close'
            size={25}
            color='#f00'
          />
        </TouchableOpacity>
        </View>

        <View style={styles.textDelete}>
          <Text style={{marginLeft:20, marginTop:10}}>{page.nome}</Text>
          <Text style={{marginLeft:20}}>{page.telefone}</Text>
          <Text style={{marginLeft:20}}>{page.endereco}</Text>
          <Text style={{marginLeft:20}}>{page.dataNascimento}</Text>
          <Text style={{marginLeft:20, marginBottom:10}}>{page.bio}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fae3eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    position:  'absolute',
    color: '#f20a4f',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri',
    marginTop: 100,
  },
  alterarPerfil:{
    position:'absolute',
    marginTop: 10,
    marginLeft:300,

  },
  pageDelete: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  deleteItemX: {
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  textDelete: {
    position:'absolute',
    width: 250,
    height: 'auto',
    alignContent: 'flex-start',
    backgroundColor: '#eee',
    marginTop: 10,
    borderRadius: 5,
    color: '#444',
    fontSize: 16,
    marginLeft: 60,
  },
  titleText: {
    color: '#f20a4f',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  }

})