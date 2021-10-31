import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    ScrollView,
    Alert, Image, Dimensions,CheckBox,
} from 'react-native';
//import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import SplashScreen_Appointments from './SplashScreen_Appointments';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth,{ firebase }  from "@react-native-firebase/auth"
import {RadioButton, useTheme} from 'react-native-paper';
import SignUpScreen from './SignUpScreen';
import { AuthContext } from '../components/context';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import Users from '../model/users';
import validator from 'validator';
import Realm from "realm";
import { LoginManager, AccessToken } from 'react-native-fbsdk';

//GoogleSignin.configure({
  //  webClientId:
    //    "1060583277364-quo1b67cbu3j8e9ds589s8ndp5338loq.apps.googleusercontent.com",
//});
const SignInScreen = ({navigation}) => {
    console.log("i'm here1");
    const [isSelected, setSelection] = React.useState(false);
    const [data, setData] = React.useState({
        mail: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const appId = 'doctorsina-ubkdy';
    const appConfig = {
        id: appId,
        timeout: 10000,
    };
    const { colors } = useTheme();

   // const { signIn } = React.useContext(AuthContext);

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

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 0 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
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
   // const __onGoogleButtonPress = async()=> {
  //      const { idToken } = await GoogleSignin.signIn();
  //      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
 //      let response= await auth().signInWithCredential(googleCredential);

  //  }
    const __onFacebookButtonPress = async()=>{
        LoginManager.logInWithPermissions(['public_profile', 'email'])
            .then((result) => {

                if (result.isCancelled) {
                    return Promise.reject(new Error('The user cancelled the request'));
                }
                // Retrieve the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then((data) => {
                // Create a new Firebase credential with the token
                const credential =auth.FacebookAuthProvider.credential(data.accessToken);
                // Login with the credential
                return auth().signInWithCredential(credential);
            })
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });

    }
    const __doSingIn = async (data) => {
        if(data.isValidUser)
        {

            console.log("done");
            // __doCreateUser(data.mail,data.password);
            try {

                let response = await auth().signInWithEmailAndPassword(data.mail, data.password).then(

                  function() {
                        if (auth().currentUser.emailVerified) {
                            console.log('Not verified');
                        } }



                )

                    if (response && response.user) {
                  //  signIn(data.mail,'aa');
                    Alert.alert("Success ✅", "Authenticated successfully")
                }
        else {

                    }
            } catch (e) { Alert.alert("ERROR ✅", "Mail or password doesn't exist")


            }
        }
    }
    const loginHandle = (userName, password) => {

        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    }
    const [checked, setChecked] = React.useState('first');
    return (
      <View style={styles.container}>

          <StatusBar backgroundColor='#fff' barStyle="dark-content"/>


          <ScrollView >
          <Animatable.View
              animation="fadeInUpBig"
              style={styles.footer}

          >
              <Text style={{color: '#2d7ba7',
                  paddingVertical: height*0.03,
                  fontSize: width*0.09,
                  }}>Sign In</Text>
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



            <View style={styles.action1}>

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry} style={{marginTop:15}}
                >
                    {data.secureTextEntry ?
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}

                    />
                    :
                    <Feather
                        name="eye"
                        color="grey"
                        size={20}

                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }

              <View style={styles.row}>

                      <CheckBox
                          value={isSelected}
                          onValueChange={setSelection}
                          style={styles.checkbox}
                      />


                      <Text style={{color: '#a7a7a7', fontSize:width*0.04,flex:1}}>Remember</Text>

                  <TouchableOpacity style={{flex:1,left:width*0.1}}>
                      <Text style={{color: '#a7a7a7', fontSize:width*0.04,alignSelf:'flex-end'}}
                            onPress={()=>navigation.navigate('ForgotPasswordScreen')}>Forgot password?</Text>
                  </TouchableOpacity>

              </View>


                <TouchableOpacity
                    style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.13,flex:1,paddingVertical:height*0.02}}
                    onPress={() => {__doSingIn( data)}}
                >
               <Image source={require('../assets/SignIn/SignInbutton.png')}
                      style={{resizeMode: 'stretch',width : width*0.98,alignItems: 'center',height : height*0.13}}/>

                </TouchableOpacity>

                <Text style={{color: '#a7a7a7', fontSize:width*0.04,alignSelf: 'center',flex:1}}>Or</Text>




              <View style={styles.row}>
                  <TouchableOpacity onPress={()=> {
                      __onFacebookButtonPress();
                  }}>
                      <Image source={require('../assets/SignIn/facebook_button.png')} style={{alignSelf: "flex-start",left:width*0.02,
                          resizeMode: 'stretch',width : width*0.4,height : height*0.068
                         }}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{}}
                                  >
                      <Image source={require('../assets/SignIn/google_button.png')} style={{
                          resizeMode: 'stretch',width : width*0.4,height : height*0.068,left:width*0.07}} />
                  </TouchableOpacity>
              </View>
              <View style={styles.textPrivate}>
                  <Text style={{color: 'grey'}}>
                      Don't Have Account ?
                  </Text>
                  <Text style={ {fontWeight: 'bold',color:"#2d7ba7"}}
                        onPress={()=>navigation.navigate('SignUpScreen')}>{" "} Create Account.</Text>

              </View>

          </Animatable.View>
      </ScrollView>



      </View>

    );
};

export default SignInScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    header: {

        flex: 2,
        paddingVertical: height*0.05,
        paddingHorizontal: width*0.05,

    },
    row: {
        flex:1,

        marginTop:0,
        width:width*0.8,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    textPrivate: {
        bottom:0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop:height*0.07,
        fontSize:height*0.023,
        left:width*0.03
    },
    color_textPrivate: {

        fontSize:height*0.023
    },
    footer: {

        flex: 8,
        backgroundColor: '#ffffff',

        paddingHorizontal: width*0.05

    },
    text_header: {
        color: '#2d7ba7',
        paddingVertical: 20,
        fontSize: width*0.09,
        flex:1
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action1: {
        height:height*0.08,
        flexDirection: 'row',
        width:width*0.9,
        marginBottom: 10,
        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',
        paddingBottom: 1.5
    },
    action2: {

        flex:1,
        width:width*0.9,
        marginBottom: 30,
        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',
        paddingBottom: 1.5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        flex:1,

        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height:height*0.035

    },
  });
