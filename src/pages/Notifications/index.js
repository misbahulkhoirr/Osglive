import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { configureNotification } from '../ConfigureNotification'

const Notifications = () => {

    const ClickTombol = () => {
        configureNotification.configure();
        configureNotification.buatChannel("1");
        configureNotification.kirimNotifikasi("1","Judul Pesan", "Isi Pesan")
    }

    return (
        <View style={section.container}> 
            <TouchableOpacity style={section.containerbtn} onPress={ClickTombol} >
                <Text>
                    Button Push Notifications
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const section = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    containerbtn: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:'black',
    }
})

export default Notifications