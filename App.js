/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React, { useState,useEffect } from 'react';
import {View, ActivityIndicator, Alert, TouchableOpacity, Image, Dimensions} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth,{ firebase }  from "@react-native-firebase/auth"
import PushController from './components/PushController';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import Header from 'react-native-elements'
import { DrawerContent } from './screens/DrawerContent';
import DetailsScreen from './screens/DetailsScreen';
import firestore from '@react-native-firebase/firestore';
import ChooseDoctorScreen from './screens/ChooseDoctorScreen';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { PageContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';
import DoctorInformationScreen from './screens/DoctorInformationScreen';

import DoctorProfileScreen from './screens/DoctorProfileScreen'
import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import {LinearGradient} from 'react-native-svg';
import FindDoctorScreen from './screens/FindDoctorScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DoctorScheduleInputScreen from './screens/DoctorScheduleInputScreen';
import DoctorCheckAppointmentList from './screens/DoctorCheckAppointmentList';

const HomeStack = createStackNavigator();
const DoctorCheckAppointmentListStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const FindDoctorStack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App ({route}) {
   const [doctorDone, setDoctorDone] = useState(false);
   const changeDoctorState=()=>{
       setDoctorDone(false);
   }
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const Stack = createStackNavigator()
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };


  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }



  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
    const [utilisateur, setUtilisateur] = useState(false);
    const userSettings = {
        user:user,
        doctorDone:doctorDone,
    };


      const toggleTheme= () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }

    useEffect(()=>{

        if(utilisateur)
        {
            if(utilisateur.type==='doctor')
            {
                firestore()
                    .collection('user')
                    .doc(auth().currentUser.uid).get()
                    .then(documentSnapshot => {
                        if( documentSnapshot.data()['professional_info']['location'])
                        {
                            setUtilisateur({
                                ...utilisateur,
                                doctorDone:true,
                            });
                        }
                    });
            }
        }

    },[utilisateur])

    useEffect(() => {


        if(user)
        {
            firestore()
                .collection('user')
                .doc(auth().currentUser.uid).get()
                .then(documentSnapshot => {
                    setUtilisateur({
                        ...utilisateur,
                        id:auth().currentUser.uid,
                        firstname : documentSnapshot.data()['name']['firstname'],
                        lastname : documentSnapshot.data()['name']['lastname'],
                        mail : documentSnapshot.data()['mail'],
                        type : documentSnapshot.data()['type'],

                    });

                    //  user['firstname'] = documentSnapshot.data()['firstname'];
                    // console.log('data',user)
                });


        }



        // unsubscribe on unmount
    }, [user]);


  function onAuthStateChanged(user) {

              setUser(user);



    if (initializing) setInitializing(false);
  }
    useEffect(() => {

          const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

          return subscriber;




        // unsubscribe on unmount
    }, [user]);





  if (initializing) return null;
  if (!user ) {

    return (
        <PaperProvider theme={theme}>

            <NavigationContainer theme={theme}>
              <RootStackScreen/>
            </NavigationContainer>

        </PaperProvider>
    );
  }

    console.log("user is ",utilisateur.type);

      console.log("user connected");





          return (

              <PageContext.Provider value={[utilisateur, setUtilisateur]}>

                  <NavigationContainer theme={theme}>
                      {utilisateur.type === 'patient' &&


                      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>


                          <Drawer.Screen name="HomeDrawer" component={HomeStackScreen}/>



                          <Drawer.Screen name="ProfileScreen" component={ProfileStackScreen}/>
                          <Drawer.Screen name="DetailsScreen" component={DetailsStackScreen}/>


                      </Drawer.Navigator>
                      }
                      {utilisateur.type === 'doctor' && !utilisateur.doctorDone &&
                          <Stack.Navigator headerMode='none'>
                              <Stack.Screen name="Form" component={DoctorInformationScreen} />
                              <Stack.Screen name="DoctorScheduleInputScreen" component={DoctorScheduleInputScreen} />

                          </Stack.Navigator>

                      }
                      {utilisateur.type === 'doctor' && utilisateur.doctorDone &&
                      <Stack.Navigator headerMode='none' >
                          <Stack.Screen name="LIST" component={DoctorCheckAppointmentList} />


                      </Stack.Navigator>
                      }
                  </NavigationContainer>

              </PageContext.Provider>
          );




}

export default App;
const GradientHeader = props => (
    <View style={{ backgroundColor: '#eee' }}>
        <LinearGradient
            colors={['red', 'blue']}
            style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
        >
            <Header {...props} />
        </LinearGradient>
    </View>
)
const   DrawerStackScreen = ({navigation}) => (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}  />} initialRouteName="Form">

        <Drawer.Screen name="MainTab" component={MainTabScreen}/>

        <Drawer.Screen name="HomeDrawer" component={HomeStackScreen}/>



        <Drawer.Screen name="ProfileScreen" component={ProfileStackScreen}/>
        <Drawer.Screen name="DetailsScreen" component={DetailsStackScreen}/>


    </Drawer.Navigator>
);


const   ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#3b8abd',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
          fontSize:25,
      }
    }}>
      <DetailsStack.Screen name="Account" component={ProfileScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </ProfileStack.Navigator>
);
const ImageHeader = props => (
    <View style={{ backgroundColor: '#eee' }}>
        <Image source={require('./assets/header.png')} />
        <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
);
const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{

        headerTransparent: true,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
          fontSize:25,
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',

        headerLeft: () => (
            <Icon.Button name="ios-menu" size={40} backgroundColor="transparent" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />

        <HomeStack.Screen name="FindDoctorScreen" component={FindDoctorScreen} options={{
            title:'Doctor',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={40} backgroundColor="transparent" onPress={() => navigation.goBack()} ></Icon.Button>
            )
        }} />
        <HomeStack.Screen name="ChooseDoctorScreen" component={ChooseDoctorScreen} options={{
            title:'Doctor',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={40} backgroundColor="transparent" onPress={() => navigation.goBack()} ></Icon.Button>
            )
        }} />
        <HomeStack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} options={{
            title:'Doctor',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={40} backgroundColor="transparent" onPress={() => navigation.goBack()} ></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);
const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerTransparent: true,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
          fontSize:25,
      }
    }}>
      <DetailsStack.Screen name="IRM" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={40} backgroundColor="transparent" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </DetailsStack.Navigator>
);
const DoctorCheckAppointmentListStackScreen = ({navigation}) => (
    <DoctorCheckAppointmentListStack.Navigator screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25,
        }
    }}>
        <DoctorCheckAppointmentListStack.Screen name="LIST" component={DoctorCheckAppointmentList} options={{

        }} />
    </DoctorCheckAppointmentListStack.Navigator>
);

const SettingsStackScreen = ({navigation}) => (
    <SettingsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#3b8abd',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
          fontSize:25,
      }
    }}>
      <DetailsStack.Screen name="Settings" component={SettingsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </SettingsStack.Navigator>
);
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
