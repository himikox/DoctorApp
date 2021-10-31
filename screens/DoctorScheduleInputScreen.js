import React, {useEffect} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput,
    Platform, PermissionsAndroid, Picker, ImageBackground, Switch,
} from 'react-native';
import moment from "moment";
import { useTheme } from '@react-navigation/native';
import {  Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreScreen from './ExploreScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from './ProfileScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';
import MainTabScreen from './MainTabScreen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HomeScreen from './HomeScreen';
//import Geolocation from '@react-native-community/geolocation';
import Alert from 'react-native/Libraries/Alert/Alert';
import { SearchBar } from 'react-native-elements';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView,{Marker}  from 'react-native-maps';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FindDoctorScreen from './FindDoctorScreen';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import validator from 'validator';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer'
import auth, {firebase} from '@react-native-firebase/auth';
import ChooseDoctorScreen from './ChooseDoctorScreen';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

import * as ImagePicker from "react-native-image-picker"
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {PageContext} from '../components/context';
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const GOOGLE_PLACES_API_KEY = 'AIzaSyCr7GbsKQ2p9oL6F43YqbyxqT7QbV79b5g'; // never save your real api key in a snack!

const DoctorScheduleInputScreen = ({ navigation, route }) => {
    let newWidth = 480;
    let newHeight =480;
    let compressFormat = 'PNG';
    let quality = 100;
    let rotation = 0;
    let outputPath = null;
    const [time, setTime] = React.useState(new Date())
    const {colors} = useTheme();
    const usersCollection = firestore().collection('patient');
    const [email, setEmail] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(false);

    const [photo, setPhoto] = React.useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = React.useState("Speciality");
    const [selectedLocation, setSelectedLocation] = React.useState("Location");
    //const { signUp } = React.useContext(AuthContext);
    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [longitude, setLongitude] = React.useState(false);
    const [latitude, setLatitude] = React.useState(false);
    interface IGeolocation {
        latitude: number;
        longitude: number;
    }
    const [location, setLocation] = React.useState(null);
    const [markerPosition, setMarkerLocation] = React.useState(null);
    const [viewVisible, setViewVisible] = React.useState( 0);
    const [indexTimeInput, setIndexTimeInput] = React.useState( 1);
    const [numberTimeInput, setNumberTimeInput] = React.useState( 0);

    const [selectedTime, setSelectedTime] = React.useState(true);//open time if true , close time if false



    const [selectedDays, setSelectedDays] = React.useState([
        {   abbreviation:'M',
            name:'Monday',
            isOpen:true,//closed or open
            time:[   {
                openTime:'08:00',
                closeTime:'17:00'
            }],


        },
        {   abbreviation:'T',
            name:'Tuesday',
            isOpen:true,//closed or open
            time:[   {
                openTime:'08:00',
                closeTime:'17:00'
            }],


        },
        {abbreviation:'W',
            name:'Wednesday',
            isOpen:true,//closed or open
            time:[   {
                openTime:'08:00',
                closeTime:'17:00'
            }],
        },
        {abbreviation:'T',
            name:'Thursday',
            isOpen:true,//closed or open
            time:[   {
                openTime:'08:00',
                closeTime:'17:00'
            }],

        },
        {abbreviation:'F',
            name:'Friday',
            isOpen:true,//closed or open
            time:[   {
                openTime:'08:00',
                closeTime:'17:00'
            }],

        },
        {abbreviation:'S',
            name:'Saturday',
            isOpen:false,//closed or open
            time:[ ],

        },
        {abbreviation:'S',
            name:'Sunday',
            isOpen:false,//closed or open
            time:[ ],

        },

    ]);

    const [utilisateur,setUtilisateur]  = React.useContext(PageContext);
    const [granted, setGranted] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [userId, setUserId] = React.useState(auth().currentUser.uid);
    const listDays =['M','T','W','T','F','S','S'];

    let dayInput = [];
    for(let day in selectedDays)
    {
        dayInput.push(



        )
    }




        const showTimePicker = () => {
            setTimePickerVisibility(true);
        };

        const hideTimePicker = () => {
            setTimePickerVisibility(false);
        };

        const handleConfirm = (time) => {
            console.log("time is ",moment(moment(time).format('HH:mm'),'HH:mm',true).add(1,'hours').format('HH:mm'));

                    let newArr = [...selectedDays];
                    if(selectedTime )
                    {   newArr[viewVisible].time[indexTimeInput].openTime=moment(time).format('HH:mm');


                    }
                    if(!selectedTime )
                    {newArr[viewVisible].time[indexTimeInput].closeTime=moment(time).format('HH:mm');

                    }

                    setSelectedDays(newArr);
                    console.log(selectedDays[viewVisible].time[indexTimeInput].openTime);







            hideTimePicker();
        };




    const __doAdd = async() => {
        console.log("image resizing ==",image)
        if(route.params.image) {
            const ref = firebase.storage().ref(route.params.image.imageName);
            await
                ref.putFile(route.params.image.uploadUri)
                    .then((snapshot) => {
                        //You can check the image is now uploaded in the storage bucket
                        console.log(route.params.image.imageName, " has been successfully uploaded.");
                    })
                    .catch((e) => console.log('uploading image error => ', e));
            await ref.getDownloadURL()
                .then(async(url) => {
                  await   firestore()
                        .collection('user')
                        .doc(userId)
                        .update({
                            picture_url: url,
                            professional_info:
                                {
                                    location: route.params.selectedLocation.toLowerCase(),
                                    speciality: route.params.selectedSpeciality.toLowerCase(),
                                    workingTime:selectedDays,
                                }
                        })
                    setUtilisateur({
                        ...utilisateur,
                        doctorDone:true,
                    })
                })
                .catch(e=>{

                    console.log(e)
                })

        }








    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffff' barStyle="dark-content"/>



            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <View style={{flex:1,alignItems:'center'}}>
                    <View style={{

                        width:width*1.2,
                        height:"10%",
                        alignItems:'center',
                        alignContent: 'center',

                        borderColor: '#e2e2e2',
                    }
                    }

                    >
                        <ImageBackground
                            style={{  height:"100%",width:width*1.2, flexDirection: 'row',  flexWrap: "wrap",alignItems:'center',
                                alignContent: 'center',}}
                            source={require("../assets/header.png")}
                        >
                            <View style={{flex:3,height:"80%",
                                alignContent: 'center',}}

                            >
                                <Icon.Button name="ios-exit"  size={40} backgroundColor="transparent" style={{marginLeft:50}}
                                             onPress={()=>{
                                                 auth()

                                                     .signOut()
                                                     .then(() => console.log('User signed out!'));

                                             }}
                                ></Icon.Button>
                            </View>

                            <View style={{flex:9,alignItems:'flex-start'}}>
                                <Text style={{color:'#fff',fontSize:25}}>Working Infromation</Text>
                            </View>
                        </ImageBackground>
                    </View>


                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Select Working Days & Time
                        </Text>
                    </View>

                <View style={{  flexDirection: 'row',  flexWrap: "wrap" ,width:width*0.9,alignContent:'flex-start',flex:1}}>
                    {
                        selectedDays.map((item,key)=>
                            <View style={{flex:1}}>
                                <TouchableOpacity style={{
                                    borderRadius: 400 / 2,
                                    BorderColor:key==viewVisible?'#5FE5BC':'grey',
                                    borderWidth:1,
                                    aspectRatio: 1,
                                    alignItems:'center',
                                    alignContent:'center',
                                    alignSelf:'center'

                                }}
                                                  onPress={()=>{ console.log(item.name);
                                                  //let newArr = [...selectedDays];
                                                 // newArr[key].selected=!newArr[key].selected;
                                                 // setSelectedDays(newArr)
                                                  setViewVisible(
                                                      key
                                                  );
                                                  }}
                                                    >
                                    <Text style={{color:key==viewVisible?'#5FE5BC':'grey',fontSize:width*0.06}}>{item.abbreviation}</Text>
                                </TouchableOpacity>
                            </View>



                        )
                    }



                </View>
                    <View style={{flex:0.5,}}></View>

                    <View style={{flex:5 ,width:width*0.9,borderWidth:1,borderColor:'grey',borderRadius:20}}>

                        <View style={{flex:1,position: 'absolute',top: -30,backgroundColor: '#FFF',left: 20,
                            padding: 5,
                            }}>
                            <Text style={{fontSize:25,color:'grey'}}>{selectedDays[viewVisible].name}</Text>
                        </View>
                        <View style={{flex:0.5}}></View>
                        <View style={{flex:1,alignSelf:'center',width:width*0.8,
                            flexDirection: 'row',  flexWrap: "wrap",alignItems:'center'}}>

                            <View style={{flex:1}}>
                                <Switch
                                    style={{alignSelf:'flex-start'}}
                                    trackColor={{ false: "#767577", true: "#5FE5BC" }}
                                    thumbColor={selectedDays[viewVisible].isOpen ? "#45a486" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={()=> {
                                        let newArr = [...selectedDays];
                                        newArr[viewVisible].isOpen = !newArr[viewVisible].isOpen;
                                        setSelectedDays(newArr);
                                        if(newArr[viewVisible].isOpen){
                                            selectedDays[viewVisible].time[0]={
                                                openTime:{
                                                    hours:8,minutes:0
                                                },
                                                closeTime:{
                                                    hours:17,minutes:0
                                                }
                                            }
                                        }
                                        else{
                                            selectedDays[viewVisible].time=[];
                                        }

                                    }
                                    }
                                    value={selectedDays[viewVisible].isOpen}
                                />
                            </View>
                            {
                                selectedDays[viewVisible].isOpen && <Text style={{fontSize:24,flex:4,color:'grey'}}>Open</Text>
                            }
                            {
                                !selectedDays[viewVisible].isOpen && <Text style={{fontSize:24,flex:4,color:'grey'}}>Closed</Text>
                            }

                        </View>

                        <View style={{flex:5}}>
                            {
                                selectedDays[viewVisible].isOpen &&(

                                    selectedDays[viewVisible].time.map((prop, key) => {
                                            return (
                                                <View style={{flexDirection: 'row',  flexWrap: "wrap",width:width*0.8,alignSelf:'center'}}>
                                                    <TouchableOpacity style={styles.action2} onPress={()=>{
                                                        setIndexTimeInput(key);
                                                        setSelectedTime(true);
                                                        showTimePicker();
                                                    }}>
                                                        <View style={{flex:1,position: 'absolute',top: -14,backgroundColor: '#FFF',left: 10,
                                                            padding: 5,
                                                        }}>
                                                            <Text style={{fontSize:10,color:'grey'}}>Open Time</Text>
                                                        </View>

                                                        <Text style={{alignSelf:'center',fontSize:30,color:'grey'}}>
                                                            {selectedDays[viewVisible].time[key].openTime}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <View style={{flex:0.2}}></View>

                                                    <TouchableOpacity style={styles.action2} onPress={()=>{
                                                        setIndexTimeInput(key);
                                                        setSelectedTime(false);
                                                        showTimePicker();
                                                    }}>
                                                        <View style={{flex:1,position: 'absolute',top: -14,backgroundColor: '#FFF',left: 10,
                                                            padding: 5,
                                                        }}>
                                                            <Text style={{fontSize:10,color:'grey'}}>Close Time</Text>
                                                        </View>
                                                        <Text style={{alignSelf:'center',fontSize:30,color:'grey'}}>
                                                            {

                                                                selectedDays[viewVisible].time[key].closeTime
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <View style={{flex:0.5}}>
                                                        {key==(selectedDays[viewVisible].time.length-1) && !key==0 &&
                                                        <Icon.Button name="ios-close-circle-outline" size={40} backgroundColor='transparent'
                                                            color='grey'
                                                            onPress={
                                                            ()=>{
                                                                let newArr = [...selectedDays];
                                                                newArr[viewVisible].time.pop();
                                                                setSelectedDays(newArr);
                                                            }

                                                            }
                                                            ></Icon.Button>
                                                        }

                                                    </View>

                                                </View>
                                            );
                                        })



                                )

                            }
                            {selectedDays[viewVisible].isOpen && (
                                <View style={{width: width * 0.8, alignSelf: 'center'}}>
                                    <Icon.Button name="ios-add-circle-outline" size={40} backgroundColor='transparent'
                                                 color='grey'
                                    onPress={()=>{

                                        let newArr = [...selectedDays];
                                        newArr[viewVisible].time[newArr[viewVisible].time.length]={
                                            openTime:newArr[viewVisible].time[newArr[viewVisible].time.length-1].closeTime,
                                            closeTime:moment(newArr[viewVisible].time[newArr[viewVisible].time.length-1].closeTime,'HH:mm',true).add(1,'hours').format('HH:mm')
                                        }
                                        setSelectedDays(newArr);
                                    }}></Icon.Button>
                                </View>)}

                        </View>

                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirm}
                            onCancel={hideTimePicker}

                        />

                    </View>



                    <View style={{flex:0.5}}>
                    </View>
                    <TouchableOpacity
                        style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.12,flex:1}}
                        onPress={() => {__doAdd()}}
                    >
                        <Image source={require('../assets/SignUp/Button.png')}    style={{resizeMode: 'stretch',width : width*0.98,alignItems: 'center',height : height*0.12}}/>

                    </TouchableOpacity>
                    <View style={{flex:0.5}}></View>
                </View>




            </Animatable.View>
        </View>
    );
}

export default DoctorScheduleInputScreen;


const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: "center"
    },
    map: {
        flex:8,


    },
    header: {
        flex: 1,
        paddingVertical: height*0.05,
        paddingHorizontal: width*0.05,
    },
    action2: {

        alignContent:'center',
        alignItems:'center',

        flex:1,
        height:height*0.05,

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
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
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
