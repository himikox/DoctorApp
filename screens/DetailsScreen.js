import React, {useEffect} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer'
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DetailsScreen = ({navigation}) => {
    let newWidth = 480;
    let newHeight =480;
    let compressFormat = 'JPEG';
    let quality = 100;
    let rotation = 0;
    let outputPath = null;
   const url = "http://962d-41-62-235-141.ngrok.io";
    const [userId, setUserId] = React.useState(auth().currentUser.uid);
   const getAxios=()=>{
        axios.post(`${url}`,{
            userid: userId
        }).then((response)=>{
            console.log("succes axios :",response);
        }).catch((error)=>{
            console.log("fail axios :", error);
        });
    };

   const getFetch=async()=>{
        fetch(url).then((response)=>{
            console.log("succes fetch :",response)
        }).catch((error)=>{
            console.log("fail fetch :",error)
        })
    }
    const getFetch2=async()=>{
        try {
            let response = await fetch(
                url
            );
            console.log("aaa")
            let json = await response.json();
            return json;
            console.log("succes fetch :",json.movies);
        } catch (error) {
            console.log(error);
        }

    }
    const [photo, setPhoto] = React.useState(null);
    const [fileflair, setFileflair] = React.useState(null);
    const [filece, setFilece] = React.useState(null);
    const [imageflair, setImageflair] = React.useState(null);
    const [imagece, setImagece] = React.useState(null);
    useEffect(
        ()=>{
            if(fileflair)
            {


                ImageResizer.createResizedImage(
                    fileflair.fileUri,
                    newWidth,
                    newHeight,
                    compressFormat,
                    quality,
                    rotation,
                    outputPath,
                )
                    .then((response) => {
                        // response.uri is the URI of the new image that can now be displayed, uploaded...
                        //resized image uri
                        let uri = response.uri;
                        console.log("file,,",response.uri);
                        //generating image name
                        let imageName = 'flair_IRM/' + userId;
                        //to resolve file path issue on different platforms
                        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                        //setting the image name and image uri in the state
                        setImageflair({
                            uploadUri,
                            imageName,
                        });

                        console.log("image resizing ==",imageflair)
                    })
                    .catch((err) => {
                        console.log('image resizing error => ', err);
                    });

            }
        },[fileflair]
    )
    useEffect(
        ()=>{
            if(filece)
            {


                ImageResizer.createResizedImage(
                    filece.fileUri,
                    newWidth,
                    newHeight,
                    compressFormat,
                    quality,
                    rotation,
                    outputPath,
                )
                    .then((response) => {
                        // response.uri is the URI of the new image that can now be displayed, uploaded...
                        //resized image uri
                        let uri = response.uri;
                        console.log("file,,",response.uri);
                        //generating image name
                        let imageName = 'ce_IRM/' + userId;
                        //to resolve file path issue on different platforms
                        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                        //setting the image name and image uri in the state
                        setImagece({
                            uploadUri,
                            imageName,
                        });

                        console.log("image resizing ==",imagece)
                    })
                    .catch((err) => {
                        console.log('image resizing error => ', err);
                    });

            }
        },[filece]
    )
    const __addPicflair =()=>
    { console.log("picking image")
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                setFileflair({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });
    }
    const __addPicce =()=>
    { console.log("picking image")
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                setFilece({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });
    }
    const [done1, setdone1] = React.useState(false);
    const [done2, setdone2] = React.useState(false);

    const __doAdd = async() => {

        if(imageflair && imagece) {
            const refflair = firebase.storage().ref(imageflair.imageName);
            const refce = firebase.storage().ref(imagece.imageName);
            await
                refflair.putFile(imageflair.uploadUri)
                    .then((snapshot) => {
                        //You can check the image is now uploaded in the storage bucket
                        console.log(imageflair.imageName, " has been successfully uploaded.");
                        setdone1(true)
                    })
                    .catch((e) => console.log('uploading image error => ', e));
            await
                refce.putFile(imagece.uploadUri)
                    .then((snapshot) => {
                        //You can check the image is now uploaded in the storage bucket
                        setdone2(true)
                        console.log(imagece.imageName, " has been successfully uploaded.");
                    })
                    .catch((e) => console.log('uploading image error => ', e));

            await refflair.getDownloadURL() .then(
               async (url)=>{
                   await   firestore()
                       .collection('user')
                       .doc(userId)
                       .update({
                           irm : {
                               flairUrl: url ,
                           },
                       })
                       .then(() => {
                           console.log('flair added!');
                       });
                }
            )
            await refce.getDownloadURL() .then(
                async (url)=>{
                    await   firestore()
                        .collection('user')
                        .doc(userId)
                        .update({
                            irm : {
                                ceUrl: url ,
                            },
                        })
                        .then(() => {
                            console.log('ce added!');
                        });
                }
            )


        }

        getAxios()
        Alert.alert("Success ✅", "you can check the results in patient's profile")
    }
    React.useEffect(()=>{

    },[done1,done2])
    return (

        <View style={styles.container}>


            <Image
                style={{ flex:0.5, justifyContent: 'flex-end',width:width*1.2}}
                source={require("../assets/header.png")}
            />
              <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                      image flair
                  </Text>
              </View>
              <TouchableOpacity
              style={{resizeMode: 'stretch',width: width*0.5,alignSelf: 'center',height: width*0.5,flex:1}}
              onPress={() =>{__addPicflair()}}
          >
              {!imageflair && <Image source={require('../assets/irm.png')}
                                style={{width: width*0.5, height: width*0.5,alignSelf:'center', borderRadius: 400/ 2}}
              />

              }

              {imageflair &&
              <Image source={{ uri: imageflair.uploadUri }}
                     style={{width: width*0.5, height: width*0.5,alignSelf:'center', borderRadius: 400/ 2}}
              />
              }
          </TouchableOpacity>
            <View style={{flex:0.5}}></View>
              <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                      Image Ce
                  </Text>
              </View>
             <TouchableOpacity
                  style={{resizeMode: 'stretch',width: width*0.5,alignSelf: 'center',height: width*0.5,flex:1}}
                  onPress={() =>{__addPicce()}}
              >
                  {!imagece && <Image source={require('../assets/irm.png')}
                                    style={{width: width*0.5, height: width*0.5,alignSelf:'center', borderRadius: 400/ 2}}
                  />

                  }

                  {imagece &&
                  <Image source={{ uri: imagece.uploadUri }}
                         style={{width: width*0.5, height: width*0.5,alignSelf:'center', borderRadius: 400/ 2}}
                  />
                  }
              </TouchableOpacity>
            <View style={{flex:0.5}}></View>
              <TouchableOpacity
                  style={{resizeMode: 'stretch',width : width*0.9,alignItems: 'center',height : height*0.12,flex:1}}
                  onPress={() => {__doAdd()}}
              >
                  <Image source={require('../assets/apply.png')}    style={{resizeMode: 'stretch',width : width*0.98,alignItems: 'center',height : height*0.12}}/>

              </TouchableOpacity>



      </View>
    );
};

export default DetailsScreen;

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
