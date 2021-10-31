import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import SplashScreen_Medicine from './SplashScreen_Medicine';
const SplashScreen_Doctor = ({navigation}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
            <View style={styles.header}>



                <Animatable.Image
                    animation="bounceIn"
                    duration="1500"
                    source={require('../assets/Doctors.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="bounceInUp"
            >
                <Text style={[styles.title, {
                    color: colors.text
                }]}>DOCTORS</Text>
                <Text style={styles.text}>
                    Find expert doctors for particular problem
                    on one tap</Text>
               <View style={{flex:3}}>

               </View>
                <View style={styles.row}>
                    <Image source={require('../assets/felsadoctors.png')} style={{alignSelf: 'center',marginBottom:'5%',
                        resizeMode: 'stretch',width : width*0.2,height : height*0.015,left:width*0.4}}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Medicine')}
                                      style={{
                                          resizeMode: 'stretch',width : 80,height : 70,left:width*0.63}}>
                        <Image source={require('../assets/fleshymin.png')} style={{
                            resizeMode: 'stretch',width : width*0.2,height : height*0.1}} />
                    </TouchableOpacity>

                </View>

            </Animatable.View>

        </View>
    );
};

export default SplashScreen_Doctor;

const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const height_logo = height * 0.5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flex:3,
        marginBottom:height*0.2,
        marginTop: height*0.1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    footer: {

        elevation: 20,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        flex:2,



    },
    logo: {
        marginTop : height*0.37,
        width: width * 0.65,
        height: height * 0.7
    },
    title: {
        paddingVertical :height*0.05,
        color: '#05375a',
        fontSize: 30,
        textAlign: "center"
    },
    text: {
        color: 'grey',
        marginTop:5,
        textAlign: "center",
        fontSize: width*0.045,
        paddingHorizontal:width*0.06
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

