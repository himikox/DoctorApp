import React, {Component, useEffect} from 'react';
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");

const PushController=()=>{
    useEffect(()=>{
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification here

            },
            // Android only
            senderID: "1060583277364",
            // iOS only
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
        });
    },[])

    return null;
};
export default PushController;
