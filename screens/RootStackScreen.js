import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
        View,
        Text,
        Button,

        TextInput,
        Platform,
        StyleSheet,
        ScrollView,
        StatusBar, Alert,KeyboardAvoidingView,
} from 'react-native';
import SplashScreen from './SplashScreen';
import SplashScreen_Doctor from './SplashScreen_Doctor';
import SplashScreen_Medicine from './SplashScreen_Medicine';
import SplashScreen_Appointments from './SplashScreen_Appointments';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
const SignUpStack = createStackNavigator();
const SignInStack = createStackNavigator();
const ForgotPasswordStack = createStackNavigator();
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen_Doctor" component={SplashScreen_Doctor}/>
        <RootStack.Screen name="SplashScreen_Medicine" component={SplashScreen_Medicine}/>
        <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordStackScreen}/>
        <RootStack.Screen name="SplashScreen_Appointments" component={SplashScreen_Appointments}/>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInStackScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpStackScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;


const   ForgotPasswordStackScreen = ({navigation}) => (
    <ForgotPasswordStack.Navigator screenOptions={{
        headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            height:height*0.12
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25,

        }
    }}>
        <ForgotPasswordStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{
            headerLeft: () => (
                <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')} style={{flex:1,width:width*0.04,height:height*0.04,paddingVertical: height*0.05,
                    paddingHorizontal: width*0.05,}}>
                    <Image source={require("../assets/SignIn/back-arrow.png")} style={{resizeMode: 'stretch',width:width*0.04,height:height*0.04}}/>
                </TouchableOpacity>

            ),

        }} />

    </ForgotPasswordStack.Navigator>
);

const   SignUpStackScreen = ({navigation}) => (
    <SignUpStack.Navigator screenOptions={{
            headerStyle: {
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height:height*0.12
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize:25,

            }
    }}>
            <SignUpStack.Screen name="SignUp" component={SignUpScreen} options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')} style={{flex:1,width:width*0.04,height:height*0.04,paddingVertical: height*0.05,
                                paddingHorizontal: width*0.05,}}>
                                <Image source={require("../assets/SignIn/back-arrow.png")} style={{resizeMode: 'stretch',width:width*0.04,height:height*0.04}}/>
                        </TouchableOpacity>

                    ),

            }} />

    </SignUpStack.Navigator>
);
const   SignInStackScreen = ({navigation}) => (
    <SignInStack.Navigator screenOptions={{
            headerStyle: {
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height:height*0.12
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize:25,

            }
    }}>
            <SignInStack.Screen name="SignIn" component={SignInScreen} options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Appointments')} style={{flex:1,width:width*0.04,height:height*0.04,paddingVertical: height*0.05,
                                paddingHorizontal: width*0.05,}}>
                                <Image source={require("../assets/SignIn/back-arrow.png")} style={{resizeMode: 'stretch',width:width*0.04,height:height*0.04}}/>
                        </TouchableOpacity>

                    ),

            }} />

    </SignInStack.Navigator>
);

const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
