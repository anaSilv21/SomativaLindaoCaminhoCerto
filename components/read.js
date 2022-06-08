import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();

export default function Read({navigation,route}){
  const id = route.params.iddocara
  function deleteItem(id){
    db.collection("agenda").doc(id).delete()
  }

  const URL = "https://firebasestorage.googleapis.com/v0/b/somativalindao.appspot.com/o/images%2F"
  const media = "?alt=media"
  const [page, setPage] = useState([])
  
  useEffect(()=>{
    db.collection("agenda").onSnapshot((query)=>{
      const list=[]
      query.forEach((doc)=>{
        list.push({...doc.data(), id: doc.id})
      })
      
      setPage(list)
    })
  },[])

  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>Contatos</Text>
      <FlatList
        data={page}
          renderItem={({item})=>{
            return(
              <View style={styles.pageDelete}>
                <TouchableOpacity
                  style={styles.deleteItemX}
                  onPress={()=>{deleteItem(item.id)}}
                >
                <FontAwesome 
                  name='trash'
                  size={25}
                  color='black'
                />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteItemX}
                  onPress={()=>{navigation.navigate('Uptade',  {id: item.id})}}
                >
                <FontAwesome 
                  name='pencil'
                  size={25}
                  color='black'
                />
                </TouchableOpacity>


                <View style={styles.textDelete}>
                  <Text>{item.nome}</Text>
                  <Text>{item.telefone}</Text>
                  <Text>{item.endereco}</Text>
                  <Text>{item.dataNascimento}</Text>
                  <Image src={{uri: `${URL + item.image + media}`}} style={{ height: 80, width: 80, position: 'absolute', marginLeft:100, borderRadius:5 }} />
                </View>
              </View>
            )
          }}
      />
    </View>
  )
}

const styles=StyleSheet.create({
  titleText:{
    color:'#b5104a',
    fontSize:40, 
    fontFamily:'Courier',
    marginTop:30,
  },
  container:{
    flex:1,
    backgroundColor:'#fae3eb',
    alignItems:'center',
    justifyContent:'center',
    
  },
  pageDelete:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
    color:'white',
  },
  deleteItemX:{
    justifyContent:'center',
    paddingLeft:15,
  },
  textDelete:{
    width:200,
    height:80,
    alignContent:'flex-start',
    backgroundColor:'#b5104a',
    padding:2,
    paddingHorizontal:20,
    borderRadius:5,
    color:'#b5104a',
    marginLeft:5,
    fontSize:16,
  },
 

})