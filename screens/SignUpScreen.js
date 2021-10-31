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
    StatusBar, Alert, Image,KeyboardAvoidingView,
    Picker,
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
import PhoneInput from "react-native-phone-number-input";
import SignInScreen from './SignInScreen';
import Realm from "realm";
import {useTheme} from 'react-native-paper';

//const { MongoClient } = require("mongodb");
class patient {
    static schema = {
        name: "patient",
        properties: {
            FirstName: "string",
            LastName: "string",

        },
    };
    get patientName() {
        return `${this.FirstName} ${this.LastName}`;
    }
}
const SignUpScreen = ({navigation}) => {
    const id = "doctorsina-ubkdy";
    const config = {
        id,
    };

    const app = new Realm.App(config);
  // const mongodb = app.currentUser.mongoClient("mongodb-atlas");
   // const users = mongodb.db("user").collection("patient");
    const uri = "mongodb+srv://test:test@cluster0.yzjjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 //   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const [value, setValue] = React.useState("");
    const [formattedValue, setFormattedValue] = React.useState("");
    const [valid, setValid] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("Patient");
    const phoneInput = React.forwardRef<PhoneInput>(null);
    const usersCollection = firestore().collection('patient');
    const [data, setData] = React.useState({
        firstname:'',
        lastname:'',
        mail: '',
        password: '',
        phone:'',
        type:'',
        confirm_password: '',
        check_textInputChange: true,
        check_passwordInputChange: true,
        check_ConfirmPasswordInputChange: true,
        check_FirstNameChange: true,
        check_LastNameChange: true,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser : false,
    });
    const appId = 'doctorsina-ubkdy'; // Set Realm app ID here.
    const appConfig = {
        id: appId,
        timeout: 10000,
    };
    const { colors } = useTheme();
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

    const LastNameChange = (val) => {
        if( val.trim().length >= 1 ) {
            setData({
                ...data,
                lastname: val,
                check_LastNameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_LastNameChange: false,
                isValidUser: false

            });
        }
    }
    const FirstNameChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                firstname: val,
                check_FirstNameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                firstname: val,
                check_FirstNameChange: false,
                isValidUser: false

            });
        }
    }
    const PhoneNumberChange = (val) => {
        if( val.trim().length == 8 ) {
            setData({
                ...data,
                phone: val,
         //       check_FirstNameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                phone: val,
             //   check_FirstNameChange: false,
                isValidUser: false

            });
        }
    }
    const handleConfirmPasswordChange = (val) => {
        if(val == data.password)
        {
            setData({
                ...data,
               // password: val,
                check_ConfirmPasswordInputChange : true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
              //  password: val,
                check_ConfirmPasswordInputChange : false,
                isValidUser: false

            });
        }

    }

    const handlePasswordChange = (val) => {
        if(val >4) {
            setData({
                ...data,
                password: val,
                isValidUser: true,
                check_passwordInputChange : true
            });
        }
     else {
        setData({
            ...data,
              password: val,
            check_passwordInputChange : false,
            isValidUser: false

        });
    }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
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

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
    const SignUpHandle = (userName, password) => {
    console.log("signup");

    }
    const __doSignUp = async(data) => {
        if(data.isValidUser) {
            console.log("signup");
            try {
            //   const validatorInstance = EmailValidator("ev-d6eee678ad5edfd7954126bb2941ee21")
            //   const responseObject = await validatorInstance(data.mail)
            //   const x = responseObject.statusCode.toString() ;
            //    console.log(x);
            //    if ( x === '200' || x === '207' || x=== '215'  ) {
               // let user;
              //  const app = new Realm.App(appConfig);
              //  const credentials = Realm.Credentials.emailPassword(
              //      data.mail, data.password
             //   );
                    let response = await auth().createUserWithEmailAndPassword(data.mail, data.password)
                const us = auth().currentUser;
                //   let r = await us.sendEmailVerification();


                if (response && response.user) {
                    await  firestore()
                        .collection('user')
                        .doc(us.uid)
                        .set({
                            type: selectedValue.toLowerCase(),
                            mail : data.mail,
                            name : {
                            firstname: data.firstname ,
                            lastname : data.lastname
                            },
                            phone: data.phone
                        })
                        .then(() => {
                            console.log('User added!');
                        });
                    // signUp(data.mail,'aa');
                    Alert.alert("Success ✅", "Email Sent.")
                }
                //    const us = auth().currentUser;
              //      let r = await us.sendEmailVerification();
            //    let response =  await app.emailPasswordAuth.registerUser(data.mail, data.password);


               //         const realm = await Realm.open({
                 //           path: "user",
                   //         schema: [patient],
                    //    });
               // console.log('mongodb_NOTdone');
                 //       let patient1;
                   //     realm.write(() => {
                     //       patient1 = realm.create("patient", {
                       //         FirstName: data.firstname,
                         //       LastName : data.LastName,
                           // });
                       // });

                       // console.log('mongodb_done');
                        //console.log(patient1.FirstName);


             //   }
     //   else {
            //        Alert.alert("Error", "Please Enter a Valid mail")

           //    }
                }
            catch
                (e)
                {
                     Alert.alert("Error✅", e.message);
                }
                console.log("done");
                // __doCreateUser(data.mail,data.password);

            }



    }
    const __doCreateUser = async (email, password) => {
        try {
            let response = await auth().createUserWithEmailAndPassword(email, password)
            signUp();
        } catch (e) {
            console.error(e.message)
        }
    }


    return (
      <View style={styles.container}>
{}
              <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
          <ScrollView >



              <Animatable.View
                  animation="fadeInUpBig"
                  style={styles.footer}
              >


                  <Text style={{color: '#2d7ba7',
                      marginBottom: height*0.03,
                      fontSize: width*0.09,
                      }}>Sign Up</Text>
                <View style={styles.action2}>

                    <TextInput
                        placeholder="First Name"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => FirstNameChange(val)}
                        onEndEditing={(e)=> FirstNameChange(e.nativeEvent.text)}
                    />
                    {data.check_FirstNameChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >

                        </Animatable.View>
                        : null
                       }
                </View>
                { data.check_FirstNameChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>please enter your first name</Text>
                    </Animatable.View>
                }


                <View style={styles.action2}>

                    <TextInput
                        placeholder="Last Name"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => LastNameChange(val)}
                       onEndEditing={(e)=>LastNameChange(e.nativeEvent.text)}
                    />
                    {data.check_LastNameChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >

                        </Animatable.View>
                        : null
                        }
                </View>
                { data.check_LastNameChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Please enter your last name</Text>
                    </Animatable.View>
                }


            <View style={styles.action2}>

                <TextInput
                    placeholder="E-Mail"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidMail(e.nativeEvent.text)}
                />
                {data.check_textInputChange ?
                <Animatable.View
                    animation="bounceIn"
                >

                </Animatable.View>
                : null}
            </View>
                { data.check_textInputChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Please enter a valid mail</Text>
                    </Animatable.View>
                }

                  <View style={styles.action2}>

                      <PhoneInput


                          defaultCode="TN"

                          onChangeText={(val) => PhoneNumberChange(val)}
                          onEndEditing={(e)=> PhoneNumberChange(e.nativeEvent.text)}

                          textContainerStyle={{paddingVertical: 0,height:height*0.07,backgroundColor:'#fff'}}
                      />
                  </View>

            <View style={styles.action2}>

                <TextInput
                    placeholder="Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                    onEndEditing={(e)=>handlePasswordChange(e.nativeEvent.text)}
                />

                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                    style={{marginTop:15}}
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



            <View style={styles.action2}>

                <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    onEndEditing={(e)=>handleConfirmPasswordChange(e.nativeEvent.text)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                    style={{marginTop:15}}
                >
                    {data.confirm_secureTextEntry ?
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
                { data.check_ConfirmPasswordInputChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>password must be the same</Text>
                    </Animatable.View>
                }

            </View>
                  <View style={styles.action2}>
                  <Picker
                      mode = 'dropdown'
                      selectedValue={selectedValue}
                      style={{flex: 1,
                          marginTop: Platform.OS === 'ios' ? 0 : 4,
                          height:height*0.065,
                          marginLeft: 18,
                          color: 'grey',

                          fontSize : height*0.03}}

                      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                  >
                      <Picker.Item label="Patient" value="Patient" />
                      <Picker.Item label="Doctor" value="Doctor" />
                      <Picker.Item label="health professional" value="health_professional" />
                  </Picker>
                  </View>




                    <TouchableOpacity
                        style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.12,flex:1}}
                        onPress={() => {__doSignUp ( data )}}
                    >
                        <Image source={require('../assets/SignUp/Button.png')}    style={{resizeMode: 'stretch',width : width*0.98,alignItems: 'center',height : height*0.12}}/>

                    </TouchableOpacity>







        </Animatable.View>

          </ScrollView>
      </View>
    );
};

export default SignUpScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    header: {

        flex: 2,
        paddingVertical: height*0.03,


    },
    action2: {
        flex : 1,
        flexDirection: 'row',
        width:width*0.9,
        marginBottom: height*0.02,
        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',

    },
    footer: {


        backgroundColor: '#ffffff',

        paddingHorizontal: width*0.05

    },
    text_header: {
        color: '#2d7ba7',
        paddingVertical: 10,
        fontSize: width*0.09,
        flex:1
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
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
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
