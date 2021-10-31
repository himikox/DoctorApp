import React,{useEffect,useState,useLayoutEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, ScrollView} from 'react-native';
//import Geolocation from '@react-native-community/geolocation';
import Alert from 'react-native/Libraries/Alert/Alert';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import MapView,{Marker}  from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';

const DoctorProfileScreen = ({ navigation, route }) => {



    return (
        <View style={styles.container}>
            <View  style={{ flex:1, justifyContent: 'flex-end',width:width*1.3}}>
                <Image
                    style={{ flex:1, justifyContent: 'flex-end',width:width*1.3}}
                    source={require("../assets/header.png")}
                />
            </View>

            <View style={styles.footer}>
                <Text> view2</Text>
            </View>
            <View style={styles.header}>


            <Text> view1 </Text>


            </View>

        </View>
    );
};

export default DoctorProfileScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: 0.5,
    },
    image:{
        width: "75%", height: "70%",alignSelf:'center', borderRadius: 400/ 2,marginTop:'15%',borderWidth :2, borderColor: '#e2e2e2',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    header: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        elevation: 20,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        flex:4


    },
    action2: {
        flex : 1,
        flexDirection: 'row',
        width:width,
        height:height*0.13,
        borderWidth : 0.7,
        borderTopWidth:0,
        flexWrap: "wrap",
        borderColor: '#e2e2e2',

    },
});
