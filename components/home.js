import {View, Text, Button, StyleSheet, Image} from 'react-native'
import TabBar from '../App'
export default function Home({navigation,route}) {
  async function redirecionar() {
    const id = route.params.idUser
    console.log('id', id)
    setTimeout(() => {
      navigation.navigate('EditProfile', {idUser: id})
    }, 2000);
  }

  redirecionar();

    return (
      <View style={styles.login}>
        <Text style={styles.agenda}>Agenda</Text>

      </View>
    );
  }


const styles=StyleSheet.create({
    login: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      height: 30,
      backgroundColor: '#a3053c',
    },

    agenda:{
      fontFamily: 'Courier',
      fontSize: 70,
      paddingBottom: 30,
      color: 'white',

    },



  })