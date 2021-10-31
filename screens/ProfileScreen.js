import React from 'react';

import auth,{ firebase }  from "@react-native-firebase/auth"
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity, ScrollView,
} from 'react-native';
import { Divider } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useState,useEffect} from 'react';
import {Title} from 'react-native-paper';
function ProfileScreen() {

    // const db=firebase.firestore();
    const [user, setUser] = React.useState({

        firstname :'',
        lastname : '',
        mail : '',
    });

    const fetchUser=async()=>{
        firestore()
            .collection('user')
            .doc(firebase.auth().currentUser.uid).get()
            .then(documentSnapshot => {
                setUser({
                    ...user,
                    firstname : documentSnapshot.data()['firstname'],
                    lastname : documentSnapshot.data()['lastname'],
                    mail : documentSnapshot.data()['mail'],

                });
                //  user['firstname'] = documentSnapshot.data()['firstname'];
                // console.log('data',user)
            });
    }
    useEffect(() => {
        fetchUser();
    }, [])




    //console.log(route);
    return (

        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>{user['firstname'] }
                        {user['lastname'] }
                    </Text>
                    <Text style={styles.info}></Text>




                </View>

                <Text style={ {fontSize:27,
                    color:"#05375a",
                    paddingLeft : 20
                     }}>Phone Number</Text>
                <Text style={styles.description}> 3 november 1997 </Text>
                <Divider style={{ backgroundColor: '#05375a' , width : 300 , marginLeft : 20} } />

                <Text style={ {fontSize:27,
                    color:"#05375a",
                    paddingLeft : 20,
                    marginTop : 20
                     }}>Birth Date</Text>
                <Text style={styles.description}> 3 november 1997 </Text>
                <Divider style={{ backgroundColor: '#05375a' , width : 300 , marginLeft : 20} } />

                <Text style={ {fontSize:27,
                    color:"#05375a",
                    paddingLeft : 20,
                    marginTop : 20
                     }}>Home Adress</Text>
                <Text style={styles.description}> 3 november 1997 </Text>
                <Divider style={{ backgroundColor: '#05375a' , width : 300 , marginLeft : 20} } />

                <Text style={ {fontSize:27,
                    color:"#05375a",
                    paddingLeft : 20,
                    marginTop : 20
                     }}>Height</Text>
                <Text style={styles.description}> 3 november 1997 </Text>
                <Divider style={{ backgroundColor: '#05375a' , width : 300 , marginLeft : 20} } />


                <Text style={ {fontSize:27,
                    color:"#05375a",
                    paddingLeft : 20,
                    marginTop : 20
                     }}>Weight</Text>
                <Text style={styles.description}> 3 november 1997 </Text>
                <Divider style={{ backgroundColor: '#05375a' , width : 300 , marginLeft : 20} } />

                <Text style={ {fontSize:27,
                    color:"#05375a",
                    paddingLeft : 20,
                    marginTop : 20
                     }}>Chronic Diseases</Text>
                <Text style={styles.description}> 3 november 1997 </Text>
                <Divider style={{ backgroundColor: '#05375a' , width : 300 , marginLeft : 20} } />


            </View>
        </View>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#529ecf",
        height:200,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:100
    },
    name:{
        fontSize:30,
        color:"#05375a",
        fontWeight: 'bold'
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'#05375a',
        margin:5,

    },
    body:{
        marginTop:70,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name1:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "#529ecf",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:5,
        marginLeft : 20
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
});


