import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import {ImageBackground} from 'react-native';
import FindDoctorScreen from './FindDoctorScreen';
import SettingsScreen from './SettingsScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const FindDoctorStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="transparent"

    >

      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarColor: 'transparent',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />




      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'DOCTORSINA',
          tabBarColor: '#3b8abd',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#3b8abd',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#3b8abd',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="FindDoctor"
        component={FindDoctorScreen}
        options={{
          tabBarLabel: 'Find Doctor',
          tabBarColor: '#3b8abd',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

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
            title:'FindDoctor',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={40} backgroundColor="transparent" onPress={() => navigation.goBack()} ></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);
const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#3b8abd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="DOCTORSINA" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#529ecf" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);
const   ProfileStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3b8abd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Profile" component={ProfileScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#529ecf" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </DetailsStack.Navigator>

);
const   FindDoctorStackScreen = ({navigation}) => (
    <FindDoctorStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3b8abd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25,
        }
    }}>
        <DetailsStack.Screen name="Find Doctor" component={FindDoctorScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </FindDoctorStack.Navigator>
);
