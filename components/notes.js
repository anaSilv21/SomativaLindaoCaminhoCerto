import React, { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, DateTimePicker } from 'react-native'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default function Note({ navigation, route }) {

    const [page, setPage] = useState([])

    useEffect(() => {
        db.collection("notas").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            });
            setPage(list)
        });
    }, [])



    function deleteItem(id) {
        db.collection("notas").doc(id).delete()
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={page}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.pageDelete}>

                            <Text style={styles.textDelete} onPress={() => {
                                navigation.navigate("UpdateNote", {
                                    id: item.id,
                                    text: item.text
                                })
                            }}>
                                {item.text}

                            </Text>
                            <TouchableOpacity
                                style={styles.deleteItemX}
                                onPress={() => { deleteItem(item.id) }}
                            >
                                <FontAwesome
                                    name='trash'
                                    size={25}
                                    color='#8a8a8a'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteItemX}
                                onPress={() => {
                                    navigation.navigate("UpdateNote", {
                                        id: item.id,
                                        text: item.text
                                    })
                                }}
                            >
                                <FontAwesome
                                    name='pencil'
                                    size={25}
                                    color='#8a8a8a' />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.buttonNewNote}
                onPress={() => {
                    navigation.navigate("addNote")
                }}>
                <Text style={styles.iconButton}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: "auto"
    },
    titleText: {
        color: '#f20a4f',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'calibri'
    },
    buttonNewNote: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "#e34400",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    textDelete: {
        backgroundColor: "#ed9d98",
        borderRadius: 5,
        width: 300,
        height: "auto",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
        // justifyContent: "space-between"

    },
    pageDelete: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    deleteItemX: {
        marginTop: 20,
        marginLeft: 15
    }


})