import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SplashImage } from '../../assets'

const Splash = ({ navigation }) =>
{
    useEffect(async () =>
    {
        const access_token = await AsyncStorage.getItem('access_token')

        if(access_token)
        {
            setTimeout(() =>
            {
                navigation.replace('MainApp')
            }, 1500)
        }
        else
        {
            setTimeout(() =>
            {
                navigation.replace('Welcome')
            }, 1500)
        }
    }, [])

    return (
        <View style={styles.wrapper}>
            <Image source={SplashImage} style={styles.image} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    wrapper: { flex: 1 },
    image:
    {
        width: '100%',
        height: '100%'
    }
})