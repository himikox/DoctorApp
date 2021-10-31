import React,{useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
//import Geolocation from '@react-native-community/geolocation';
import Alert from 'react-native/Libraries/Alert/Alert';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import MapView,{Marker}  from 'react-native-maps';



const SettingsScreen = () => {

    let state = {
        location: null
    };
    let Long;
    let Lat;

   const findCoordinates1 = async() => {
       try {
           const granted = await PermissionsAndroid.request(
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
               console.log("You can use the gps");
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
           } else {
               console.log("Camera permission denied");
           }
       } catch (err) {
           console.log("problem");
           console.warn(err);
       }
    };

    const [longitude, setLongitude] = React.useState(false);
    const [latitude, setLatitude] = React.useState(false);
    interface IGeolocation {
        latitude: number;
        longitude: number;
    }
    const [location, setLocation] = React.useState(null);

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
            {location && (
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

            )}

        </View>
    );
};

export default SettingsScreen;

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
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
