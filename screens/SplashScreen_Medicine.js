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
import SplashScreen_Doctor from './SplashScreen_Doctor';
import SplashScreen_Appointments from './SplashScreen_Appointments';
import Icon from 'react-native-vector-icons/Ionicons';

const SplashScreen_Medicine = ({navigation}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
            <View style={styles.header}>



                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/Medicine.png')}
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
                }]}>Medicine</Text>
                <Text style={styles.text}>
                    Alopathic, Ayurvedic and all type of medicines
                    can bought from here </Text>
                <View style={{flex:3}}>



                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Doctor')}
                                      style={{
                                          resizeMode: 'stretch',width : width*0.2,height : height*0.1}}>
                        <Image source={require('../assets/fleshysar.png')} style={{
                            alignSelf: "flex-start",
                            resizeMode: 'stretch',width : width*0.16,height : height*0.09
                            }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Appointments')}
                                      style={{
                                          resizeMode: 'stretch',width : width*0.2,height : height*0.1,left:width*0.62}}>
                        <Image source={require('../assets/fleshymin.png')} style={{
                            resizeMode: 'stretch',width : width*0.2,height : height*0.1}} />
                    </TouchableOpacity>
                    <Image source={require('../assets/felsamedicine.png')} style={{alignSelf: 'center',marginBottom:'5%',
                        resizeMode: 'stretch',width : width*0.2,height : height*0.015}}/>
                </View>


            </Animatable.View>


        </View>

    );
};

export default SplashScreen_Medicine;

const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const height_logo = height * 0.5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    row: {
        marginBottom:height*0.1,
        flex:1,
        width:width,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: width*0.09,
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

