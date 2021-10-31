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
    StatusBar, Alert, Image,
} from 'react-native';
import validator from 'validator';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Users from '../model/users';
import auth from "@react-native-firebase/auth"
import {AuthContext} from '../components/context';
import EmailValidator from 'email-validator-net'
import firestore from '@react-native-firebase/firestore';
import SignInScreen from './SignInScreen';
import {useTheme} from 'react-native-paper';

const ForgotPasswordScreen = ({navigation}) => {
    const { colors } = useTheme();
    const usersCollection = firestore().collection('patient');
    const [email, setEmail] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(false);
    const [data, setData] = React.useState({
        mail: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    //const { signUp } = React.useContext(AuthContext);
    const textInputChange = (val) => {
        if( val.trim().length >= 0 ) {
            setData({
                ...data,
                mail: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                mail: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handleValidUser = (val) => {
        if( validator.isEmail(val)) {
            console.log("email valide");
            setData({

                ...data,
                isValidUser: true
            });
        } else {
            console.log("emailpas valide");


            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const handleValidMail = (val) => {
        if( validator.isEmail(val)) {

            console.log("email valide");
            setData({
                check_textInputChange: true,
                ...data,
                isValidUser: true
            });



        } else {
            console.log("email pas valide");


            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }



    const __doReset = async(data) => {
        if(data.isValidUser) {

            setShowLoading(true);

                let response = await auth().sendPasswordResetEmail(data.mail).then(() => Alert.alert('', 'Your password resset mail has been sent'))
                    .catch(error => Alert.alert('Error', error.message));


        }

    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffff' barStyle="dark-content"/>



            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_header}>Forgot Password</Text>

                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        We just need your register e-mail ID to send reset
                        link
                    </Text>
                </View>

                <View style={styles.action2} >

                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />

                </View>
                { data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Mail invalide.</Text>
                    </Animatable.View>
                }



                        <TouchableOpacity
                            style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.13}}
                            onPress={() => {__doReset(data)}}

                        >
                            <Image source={require('../assets/ForgotPassword/resetpassword.png')}
                                   style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.13}}/>

                        </TouchableOpacity>



            </Animatable.View>
        </View>
    );
};

export default ForgotPasswordScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flex: 1,
        paddingVertical: height*0.05,
        paddingHorizontal: width*0.05,
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
        paddingBottom: 1.5
    },
    footer: {
        flex: 15,
        backgroundColor: '#ffffff',

        paddingHorizontal: width*0.05
    },
    text_header: {
        color: '#2d7ba7',

        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop : 10,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 4,
        height:height*0.065,
        paddingLeft: 20,
        color: '#b1b1b1',
        fontSize : height*0.025
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: height*0.04,




    },
    color_textPrivate: {
        color: 'grey',
        fontSize:height*0.02
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
