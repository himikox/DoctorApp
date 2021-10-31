import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase }  from "@react-native-firebase/auth"
import{ AuthContext } from '../components/context';
import auth from '@react-native-firebase/auth';
import {useState,useEffect} from 'react';
import HomeScreen from './HomeScreen';
import FindDoctorScreen from './FindDoctorScreen';
import {createStackNavigator} from '@react-navigation/stack';
const HomeStack = createStackNavigator();
export function DrawerContent({props,navigation}) {
    const [user, setUser] = React.useState({

        firstname :'',
        lastname : '',
        mail : '',
    });

    firestore()
        .collection('user')
        .doc(firebase.auth().currentUser.uid).get()
        .then(documentSnapshot => {
            setUser({
                ...user,
                firstname : documentSnapshot.data()['name']['firstname'],
                lastname : documentSnapshot.data()['name']['lastname'],
                mail : documentSnapshot.data()['mail'],

            });
            //  user['firstname'] = documentSnapshot.data()['firstname'];
            // console.log('data',user)
        });
    const paperTheme = useTheme();

   // const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'
                                }}
                                size={60}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>
                                    {user['firstname'] }
                                    {user['lastname'] }
                                </Title>
                                <Caption style={styles.caption}>
                                    {user['mail']}
                                </Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="ios-home"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="ios-aperture"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="DOCTORSINA"
                            onPress={() => {navigation.navigate('DetailsScreen')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="ios-person"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Account"
                            onPress={() => {
                                navigation.navigate('ProfileScreen')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="ios-settings"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {navigation.navigate('SettingsScreen')}}
                        />

                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                        name="ios-add"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {  auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));}}
                />
            </Drawer.Section>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,

    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
        marginTop : 10,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 50,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#529ecf',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  })
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
