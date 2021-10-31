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
    Platform, PermissionsAndroid,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {  Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreScreen from './ExploreScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from './ProfileScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';


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
import validator from 'validator';
import Geolocation from 'react-native-geolocation-service';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const GOOGLE_PLACES_API_KEY = 'AIzaSyCr7GbsKQ2p9oL6F43YqbyxqT7QbV79b5g'; // never save your real api key in a snack!
const DoctorInformationScreen = ({navigation}) => {
    const {colors} = useTheme();
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

    const [longitude, setLongitude] = React.useState(false);
    const [latitude, setLatitude] = React.useState(false);
    interface IGeolocation {
        latitude: number;
        longitude: number;
    }
    const [location, setLocation] = React.useState(null);
    const [markerPosition, setMarkerLocation] = React.useState(null);

    const [granted, setGranted] = React.useState(null);
    useEffect(
        () => {
            (() => findCoordinates())();
        }
    );

    useEffect(
        () => {
            if(granted===PermissionsAndroid.RESULTS.GRANTED){
                console.log("You can use the gps2");
                Geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        setLocation({
                            latitude,
                            longitude,
                        });
                        setMarkerLocation({
                            latitude,
                            longitude,
                        });
                        console.log("position",position);

                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                )
            }
        }, [granted]
    );

    const findCoordinates = async() => {
        try {
            let granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the gps1");
                setGranted(PermissionsAndroid.RESULTS.GRANTED)
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.log("problem");
            console.warn(err);
        }


    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffff' barStyle="dark-content"/>



            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <View style={{flex:1}}>
                    <Text style={styles.text_header}>Work Address</Text>

                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Please choose your work address and submit it
                        </Text>
                    </View>

                </View>
                {location && (
                    <View style={{flex:3}}>
                        <GooglePlacesAutocomplete
                            placeholder='Enter Location'
                            minLength={2}
                            autoFocus={false}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            listViewDisplayed="auto"
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI="GooglePlacesSearch"
                            renderDescription={row => row.description}
                            styles={{
                                flex:1,
                                textInputContainer: {
                                    backgroundColor: 'grey',
                                },
                                textInput: {
                                    height: 38,
                                    color: '#5d5d5d',
                                    fontSize: 16,
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb',
                                },
                            }}
                            onPress={(data, details = null) => console.log(data)}
                            onFail={(error) => console.error(error)}
                            query={{
                                key: GOOGLE_PLACES_API_KEY,
                                language: 'en', // language of the results
                            }}
                            currentLocation={true}
                            currentLocationLabel='Current location'
                        />
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>

                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                            />
                        </MapView>
                    </View>

                )}


            </Animatable.View>
        </View>
    );
}

export default DoctorInformationScreen;
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
