import React, { Fragment } from 'react';
import PushController from '../components/PushController';
import auth,{ firebase }  from "@react-native-firebase/auth"
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity, ScrollView, FlatList, Dimensions, StatusBar, SafeAreaView, ImageBackground,
} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import moment from "moment";
import { Divider } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useState,useEffect} from 'react';
import {Title} from 'react-native-paper';
import {PageContext} from '../components/context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import ChooseDoctorScreen from './ChooseDoctorScreen';
import Modal from 'react-native-modal';
import MapView, {Marker} from 'react-native-maps';
const DoctorCheckAppointmentList = ({ navigation, route }) => {
    const db = firestore().collection('user').where('type','==','patient');
    // const db=firebase.firestore();
    const [utilisateur,setUtilisateur] = React.useContext(PageContext);

    const [ loading, setLoading ] = useState(true);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(false);
    const [viewVisible, setViewVisible] = useState(false);
    const [appointmentViewVisible, setAppointmentViewVisible] = useState(false);
    const [timeViewVisible, setTimeViewVisible] = useState(false);
    const [doctorVisible, setDoctorVisible] = useState(true);
    const [personalVisible, setPersonalVisible] = useState(false);
    const [addressVisible, setAddressVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(false);
    const [selectedTime, setSelectedTime] = useState(false);
    const [markedDates, setMarkedDates] = useState({})
    const [currentDate, setCurrentDate] = useState(new Date());
    const [workingTime, setWorkingTime] = useState([]);
    let pushData = [
        {
            title: "First push",
            message: "First push message"
        },
        {
            title: "Second push",
            message: "Second push message"
        }
    ]

   const _renderItem = ({ item }) => (
        <View key={item.title}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
        </View>
    );

    useEffect(
        ()=>
        {

            db.onSnapshot(
                querySnapshot=>{
                    const list = [];
                    const image_url='';
                    querySnapshot.forEach(
                        (doc)=>{


                            list.push({
                                id: doc.id,
                                firstname: doc.data()['name']['firstname'],
                                lastname : doc.data()['name']['lastname'],
                                mail : doc.data()['mail'],
                                phone : doc.data()['phone'],
                                picture_url: doc.data()['picture_url'],
                                flair_gt_url:doc.data()['irm']['flair_gtUrl'],
                                ce_gt_url:doc.data()['irm']['ce_gtUrl'],
                                all_url:doc.data()['irm']['allUrl'],
                                core_url:doc.data()['irm']['coreUrl'],
                                edema_url:doc.data()['irm']['edemaUrl'],
                                enhancing_url:doc.data()['irm']['enhancingUrl'],
                                coreRatio:doc.data()['irm']['coreRatio'],
                                edemaRatio:doc.data()['irm']['edemaRatio'],
                                enhancingRatio:doc.data()['irm']['enhancingRatio'],
                            })
                        console.log("all lr : ",doc.data()['irm']['allUrl']);



                        }
                    )

                    setItems(list);
                    if (loading) {
                        setLoading(false);
                    }

                    console.log(list)
                }
            )

        },[]
    );



    //console.log(route);
    return (
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
                        <Text style={{color:'#fff',fontSize:25}}>LIST</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{flex: 12}}>
                {items &&(
                    <FlatList
                        data={items}

                        renderItem={({ item }) => {
                            return (

                                <View style={styles.action2}>
                                    <TouchableOpacity   style={styles.action2}
                                                        onPress={() => {
                                                            setViewVisible(true);
                                                            setCurrentItem(item);
                                                        }}
                                    >



                                        {item.picture_url &&
                                        (<View style={{flex:1,alignSelf:'center'}}>
                                            <Image source={{ uri: item.picture_url }}
                                                   style={styles.image}
                                            />
                                        </View>)


                                        }
                                        {!item.picture_url &&
                                        ( <View style={{flex:1,alignSelf:'center'}}>
                                            <Image source={require('../assets/DoctorInfromation/avatar.png')}
                                                   style={styles.image}
                                            />
                                        </View>)
                                        }

                                        <View style={{flex:3,alignSelf:'center'}}>
                                            <View style={{flex:1}}>

                                            </View>
                                            <Text style={{alignSelf: 'flex-start',fontSize: 18,color: '#19769F', flex:2,}}> {item.firstname}{"\r"}{item.lastname}</Text>



                                        </View>
                                    </TouchableOpacity>

                                </View>
                            );
                        }}
                    />

                )
                }



            </View>
            { currentItem &&
            <Modal isVisible={viewVisible}
                   onBackdropPress={() => {
                       setViewVisible(false);
                       setDoctorVisible(true);
                       setPersonalVisible(false);
                       setAddressVisible(false);
                   }}
                   //propagateSwipe={false}
                   onSwipeComplete={() => setViewVisible(false)}
                   //swipeDirection={"left"}
                   deviceWidth={width}
                   deviceHeight={height}
                   style={{margin: 0}}
                   backdropTransitionOutTiming={0}
                   animationOutTiming={1300}
                   animationInTiming={1300}
                   animationIn={'slideInDown'}
                   animationOut={'slideOutUp'}
            >

                <View style={{
                    backgroundColor: '#fff',
                    bottom:"6%",
                    width: width,
                    height: height * 0.8,
                    alignItems: 'center',

                }}>

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
                            <View style={{flex:3,height:"100%",
                                alignContent: 'center',}}

                            >
                                <Icon.Button name="ios-arrow-back" size={40} backgroundColor="transparent" style={{marginLeft:50}}
                                             onPress={()=>{
                                                 setViewVisible(false);
                                                 setPersonalVisible(false);
                                                 setAddressVisible(false);
                                                 setDoctorVisible(true);
                                             }} ></Icon.Button>
                            </View>
                            <View style={{flex:3}}></View>
                            <View style={{flex:9,alignItems:'flex-start'}}>
                                <Text style={{color:'#fff',fontSize:30}}>Patient</Text>
                            </View>
                        </ImageBackground>
                    </View>


                    {
                        doctorVisible && (
                            <Animatable.View

                                style={{height: '66%'}}>
                                <View style={styles.header}>
                                    {currentItem.picture_url &&
                                    <Image source={{uri: currentItem.picture_url}}
                                           style={{
                                               height: '60%',
                                               borderRadius: 400 / 2,

                                               aspectRatio: 1,
                                           }}/>
                                    }
                                    {!currentItem.picture_url &&
                                    ( <View style={{flex:1,alignSelf:'center'}}>
                                        <Image source={require('../assets/DoctorInfromation/avatar.png')}
                                               style={styles.image}
                                        />
                                    </View>)
                                    }
                                    <Text style={styles.blueText}>{currentItem.firstname}{"\r"}{currentItem.lastname}</Text>


                                </View>
                                <View style={styles.action3}>
                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <TouchableOpacity style={{height:'40%'}}>
                                            <Image source={require('../assets/FindDoctor/photo-camera.png')}
                                                   style={styles.img}/>
                                        </TouchableOpacity>
                                        <Text style={styles.blueText}>photos</Text>

                                    </View>
                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <TouchableOpacity style={{height:'40%'}}>
                                            <Image source={require('../assets/FindDoctor/navigation.png')}
                                                   style={styles.img}   />
                                        </TouchableOpacity>
                                        <Text style={styles.blueText}>0.7 KM</Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <TouchableOpacity style={{height:'40%'}}>
                                            <Image source={require('../assets/FindDoctor/phone-call.png')}
                                                   style={styles.img}/>
                                        </TouchableOpacity>
                                        <Text style={styles.blueText}>call</Text>
                                    </View>


                                </View>

                            </Animatable.View>
                        )
                    }


                    <TouchableOpacity style={styles.action}
                                      onPress={() => {
                                          if (!personalVisible) {
                                              setAddressVisible(false);
                                              setPersonalVisible(true);
                                              setDoctorVisible(false);
                                          }
                                          if(personalVisible)
                                          {
                                              setPersonalVisible(false);
                                              setDoctorVisible(true);
                                          }

                                      }}
                    >
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image source={require('../assets/FindDoctor/user.png')}
                                   style={{height: '50%', resizeMode: 'stretch', aspectRatio: 1}}/>
                        </View>
                        <View style={{flex: 5}}>
                            <Text style={{fontSize: 20, color: 'grey'}}>Personal information</Text>
                        </View>

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image source={require('../assets/FindDoctor/left-arrow.png')}
                                   style={{height: '30%', resizeMode: 'stretch', aspectRatio: 0.8}}/>
                        </View>
                    </TouchableOpacity>
                    {
                        personalVisible && (
                            <Animatable.View


                                style={{backgroundColor: 'red', height: '66%'}}>
                                <Text> hello</Text>
                            </Animatable.View>
                        )
                    }


                    <TouchableOpacity style={styles.action}
                                      onPress={() => {
                                          if (!addressVisible) {
                                              setDoctorVisible(false);
                                              setPersonalVisible(false);
                                              setAddressVisible(true);
                                          }
                                          if(addressVisible)
                                          {
                                              setAddressVisible(false);
                                              setPersonalVisible(true);
                                          }

                                      }}
                    >
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image source={require('../assets/FindDoctor/placeholder.png')}
                                   style={{height: '50%', resizeMode: 'stretch', aspectRatio: 0.8}}/>
                        </View>
                        <View style={{flex: 5}}>
                            <Text style={{fontSize: 20, color: 'grey'}}>IRM </Text>
                        </View>

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image source={require('../assets/FindDoctor/left-arrow.png')}
                                   style={{height: '30%', resizeMode: 'stretch', aspectRatio: 0.8}}/>
                        </View>
                    </TouchableOpacity>
                    {
                        addressVisible && (

                            <View style={{ height: '65%',width:width,flex:1}}>
                            <ScrollView >
                                <View style={{height:450}}>
                                <View style={{flex:1,flexDirection: "row"}} >
                                    <View style={{flex:1,alignSelf:'center',borderColor: 'grey', borderLeftWidth: 1,borderTopWidth:1,alignItems:'center'}}>
                                        <Text> flair </Text>
                                        <Image source={{ uri: currentItem.flair_gt_url }}
                                               style={styles.image2}
                                        />
                                    </View>
                                    <View style={{flex:1,alignSelf:'center',borderColor: 'grey',borderLeftWidth: 1,borderTopWidth:1,alignItems:'center'}}>
                                        <Text> t1ce </Text>
                                        <Image source={{ uri: currentItem.ce_gt_url }}
                                               style={styles.image2}
                                        />
                                    </View>
                                </View>

                                <View style={{flex:1,flexDirection: "row",alignSelf:'center',borderColor: 'grey', borderLeftWidth: 1,borderTopWidth:1,alignItems:'center'}} >

                                <View style={{flex:1,alignSelf:'center',alignItems:'center'}}>
                                    <Text> All classes </Text>
                                    <Image source={{ uri: currentItem.all_url }}
                                           style={styles.image2}
                                    />
                                </View>
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={{height:10,width:10,borderWidth:1,backgroundColor:'red',margin:10}}></View>
                                            <Text>Necrotic { currentItem.coreRatio}%</Text>
                                        </View>
                                        <View style={{flexDirection: "row"}}>
                                        <View style={{height:10,width:10,borderWidth:1,backgroundColor:'blue',margin:10}}></View>
                                            <Text>Enhancing Tumour { currentItem.enhancingRatio}%</Text>
                                        </View>
                                            <View style={{flexDirection: "row"}}>
                                        <View style={{height:10,width:10,borderWidth:1,backgroundColor:'green',margin:10}}></View>
                                            <Text>Edema { currentItem.edemaRatio}%</Text>
                                        </View>
                                    </View>

                                </View>

                                </View>
                                <View style={{borderTopWidth:1,marginLeft:10}}>
                                    <Text> La région Necrotic ou morte décrit le noyeau nécrotique, ou nécrokyste, qui réside dans
                                        le rehaussant le bord des gliomes de haut grade , elle représente <Text style={{color:'red'}}>{ currentItem.coreRatio}% </Text> du cerveau </Text>
                                    <Text> L'œdème  ou Edema correspond à une accumulation anormale de liquide au niveau du cerveau ,elle représente<Text style={{color:'red'}}>{ currentItem.edemaRatio}%  </Text> du cerveau</Text>
                                    <Text> ENHANCING TUMOR (ET) les structures rehaussantes de la tumeur et représente<Text style={{color:'red'}}> { currentItem.enhancingRatio}%</Text>  du cerveau</Text>


                                </View>
                            </ScrollView>

                            </View>


                        )
                    }
                </View>




            </Modal>

            }
        </View>

    );
};

export default DoctorCheckAppointmentList;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image2:{
        height: "85%",alignSelf:'center',aspectRatio:1
    },
    image:{
        height: "75%",alignSelf:'center', borderRadius: 400/ 2,marginTop:'15%',borderWidth :2, borderColor: '#e2e2e2',aspectRatio: 1
    },
    action3: {
        alignItems:'center',
        alignContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        width:width,
        flex:1,
    },
    img:{

        height:'90%',
        resizeMode:'stretch',
        aspectRatio:1,


    },
    header: {
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height*0.001,
        paddingHorizontal: width*0.001,
        borderRadius: 400/ 2
    },

    map: {
        ...StyleSheet.absoluteFillObject,


    },
    action2: {
        flex : 1,
        flexDirection: 'row',
        width:width,
        height:height*0.13,
        borderWidth : 0.7,
        borderTopWidth:0,
        flexWrap: "wrap",
        borderColor: '#e2e2e2',


    },
    blueText:{

        color:'#19769F',
        fontSize:17,
        marginTop:'3%'
    },
    greyText:{
        color:'#B9B8B8',
        fontSize:15,
        marginTop:'1%'
    },
    action: {

        flexDirection: 'row',
        width:width,
        height:"12%",
        borderWidth : 0.7,

        flexWrap: "wrap",
        borderColor: '#e2e2e2',
        alignItems:'center',
        alignContent:'center',
        alignSelf: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});


