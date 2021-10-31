import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar, Alert, Image, Picker,
} from 'react-native';
import validator from 'validator';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Users from '../model/users';
import auth from "@react-native-firebase/auth"
import {AuthContext} from '../components/context';

import firestore from '@react-native-firebase/firestore';
import SignInScreen from './SignInScreen';
import {useTheme} from 'react-native-paper';
import PhoneInput from "react-native-phone-number-input";


const SettingsScreen = ({navigation}) => {
    const [selectedSpeciality, setSelectedSpeciality] = React.useState("Speciality");
    const [selectedLocation, setSelectedLocation] = React.useState("Location");
    const [selectedGendre, setSelectedGendre] = React.useState("Location");
    const { width, height } = Dimensions.get('screen');
    const [value, setValue] = React.useState("");
    const [formattedValue, setFormattedValue] = React.useState("");
    const [valid, setValid] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("Patient");
    const phoneInput = React.forwardRef<PhoneInput>(null);
    const usersCollection = firestore().collection('patient');
    const [data, setData] = React.useState({
        specialist_doctor: '',
        current_location: '',
        Date : '',
        Gender : '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,

    });
    //const { signUp } = React.useContext(AuthContext);



    const __doFilter=()=>
    {

        navigation.navigate('ChooseDoctorScreen',{ spec:selectedSpeciality,loc:selectedLocation })
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffff' barStyle="dark-content"/>
            <Image
                style={{ flex:1, justifyContent: 'flex-end',width:width*1.2}}
                source={require("../assets/header.png")}
            />




            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_header}>Find Doctor</Text>

                <View style={styles.action2}>
                    <Picker
                        mode = 'dropdown'
                        selectedValue={selectedSpeciality}
                        style={{flex: 1,
                            marginTop: Platform.OS === 'ios' ? 0 : 4,
                            height:height*0.065,
                            marginLeft: 18,
                            color: 'grey',

                            fontSize : height*0.03}}

                        onValueChange={(itemValue, itemIndex) => setSelectedSpeciality(itemValue.toLowerCase())}

                    >

                        <Picker.Item label="Speciality" value="Speciality" />
                        <Picker.Item label="ALLERGY AND IMMUNOLOGY" value="ALLERGY AND IMMUNOLOGY" />
                        <Picker.Item label="ANESTHESIOLOGY" value="ANESTHESIOLOGY" />
                        <Picker.Item label="DERMATOLOGY" value="DERMATOLOGY" />
                        <Picker.Item label="DIAGNOSTIC RADIOLOGY" value="DIAGNOSTIC RADIOLOGY" />
                        <Picker.Item label="EMERGENCY MEDICINE" value="EMERGENCY MEDICINE" />
                        <Picker.Item label="FAMILY MEDICINE" value="FAMILY MEDICINE" />
                        <Picker.Item label="INTERNAL MEDICINE" value="INTERNAL MEDICINE" />
                        <Picker.Item label="NEUROLOGY" value="NEUROLOGY" />
                        <Picker.Item label="OBSTETRICS AND GYNECOLOGY" value="OBSTETRICS AND GYNECOLOGY" />
                        <Picker.Item label="PATHOLOGY" value="PATHOLOGY" />
                        <Picker.Item label="PEDIATRICS" value="PEDIATRICS" />
                        <Picker.Item label="PHYSICAL MEDICINE AND REHABILITATION" value="PHYSICAL MEDICINE AND REHABILITATION" />
                        <Picker.Item label="PSYCHIATRY" value="PSYCHIATRY" />
                    </Picker>

                </View>

                <View style={styles.action2} >
                    <Picker
                        mode = 'dropdown'
                        selectedValue={selectedLocation}
                        style={{flex: 1,
                            marginTop: Platform.OS === 'ios' ? 0 : 4,
                            height:height*0.065,
                            marginLeft: 18,
                            color: 'grey',

                            fontSize : height*0.03}}

                        onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue.toLowerCase())}

                    >
                        <Picker.Item label="current location" value="current location" />
                        <Picker.Item label="Ariana" value="Ariana" />
                        <Picker.Item label="Béja" value="Béja" />
                        <Picker.Item label="Ben Arous" value="Ben Arous" />
                        <Picker.Item label="Bizerte" value="Bizerte" />
                        <Picker.Item label="Gabès" value="Gabès" />
                        <Picker.Item label="Gafsa" value="Gafsa" />
                        <Picker.Item label="Jendouba" value="Jendouba" />
                        <Picker.Item label="Kairouan" value="Kairouan" />
                        <Picker.Item label="Kasserine" value="Kasserine" />
                        <Picker.Item label="Kébili" value="Kébili" />
                        <Picker.Item label="Le Kef" value="Le Kef" />
                        <Picker.Item label="Mahdia" value="Mahdia" />
                        <Picker.Item label="La Manouba" value="La Manouba" />
                        <Picker.Item label="Médenine" value="Médenine" />
                        <Picker.Item label="Monastir" value="Monastir" />
                        <Picker.Item label="Nabeul" value="Nabeul" />
                        <Picker.Item label="Sfax" value="Sfax" />
                        <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
                        <Picker.Item label="Siliana" value="Siliana" />
                        <Picker.Item label="Sousse" value="Sousse" />
                        <Picker.Item label="Tataouine" value="Tataouine" />
                        <Picker.Item label="Tozeur" value="Tozeur" />
                        <Picker.Item label="Tunis" value="Tunis" />
                        <Picker.Item label="Zaghouan" value="Zaghouan" />



                    </Picker>
                </View>

                <View style={styles.action2} >
                    <Picker
                        mode = 'dropdown'
                        selectedValue={selectedValue}
                        style={{flex: 1,
                            marginTop: Platform.OS === 'ios' ? 0 : 4,
                            height:height*0.065,
                            marginLeft: 18,
                            color: 'grey',

                            fontSize : height*0.1}}

                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                    >
                        <Picker.Item label="Date" value="Date" />

                    </Picker>
                </View>

                <View style={styles.action2} >
                    <Picker
                        mode = 'dropdown'
                        selectedValue={selectedGendre}
                        style={{flex: 1,
                            marginTop: Platform.OS === 'ios' ? 0 : 4,
                            height:height*0.65,
                            marginLeft: 18,
                            color: 'grey',

                            fontSize : height*0.12}}

                        onValueChange={(itemValue, itemIndex) => setSelectedGendre(itemValue)}

                    >
                        <Picker.Item label="Gender" value="Gender" />
                        <Picker.Item label="Homme" value="Homme" />
                        <Picker.Item label="Femme" value="Femme" />

                    </Picker>

                </View>






                <TouchableOpacity
                    style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.12,flex:1}}

                    onPress={() => {__doFilter (  )}}
                >
                    <Image source={require('../assets/SignUp/Button.png')}
                           style={{resizeMode: 'stretch',width : width*0.98,alignItems: 'center',height : height*0.12}}/>

                </TouchableOpacity>



            </Animatable.View>
        </View>
    );
};

export default SettingsScreen;
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
    },
    header: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,


    },
    action2: {
        height:height*0.08,
        width:width*0.9,
        marginBottom: 20,
        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',
        paddingBottom: 1.5,


    },
    footer: {
        flex: 12,
        backgroundColor: '#ffffff',

        paddingHorizontal: width*0.05
    },
    text_header: {
        color: '#2d7ba7',
        fontSize: 30,
        paddingVertical:20,


    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop : 10,
    },

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 4,
        height:height*0.065,
        paddingLeft: 20,
        color: '#b1b1b1',
        fontSize : height*0.025
    },
    search: {
        alignItems: 'center',
        marginTop: 50,
    },



});
