import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { colors } from '../../../utils'
import { IconHome, IconLive, IconStudio, IconGame, IconAccount } from '../../atoms'
import { unreadMessageAction } from '../../../config'

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})

const TabItem = ({title, active, onLongPress, onPress}) =>
{
    const Icon = () =>
    {
        const dispatch = useDispatch()
        const unreadMessageList = useSelector(state => state.unreadMessageReducer)
        
        useEffect(() =>
        {
            socket.on('New_Message', (data) =>
            {
                dispatch(unreadMessageAction())
            })

            dispatch(unreadMessageAction())
        }, [socket])

        if(title === 'Home')
        {
            return active ? <IconHome filled={true} /> : <IconHome />
        }

        if(title === 'Live')
        {
            return active ? <IconLive filled={true} /> : <IconLive />
        }

        if(title === 'Studio')
        {
            return active ? <IconStudio filled={true} color="white" /> : <IconStudio color="white" />
        }

        if(title === 'Game')
        {
            return active ? <IconGame filled={true} /> : <IconGame />
        }

        if(title === 'Account')
        {
            return (
                active
                ?
                <View styles={styles.iconWrapper}>
                    {unreadMessageList && unreadMessageList.data != "0" ? 
                    <View style={styles.notificationTick} />
                    : 
                    null}
                    <IconAccount filled={true} />
                </View>
                :
                <View styles={styles.iconWrapper}>
                    {unreadMessageList && unreadMessageList.data != "0" ? 
                    <View style={styles.notificationTick} />
                    : 
                    null}
                    <IconAccount />
                </View>
            )
        }

        return <IconHome />
    }

    /* Primary Menu on Center */
    if(title === 'Studio')
    {
        return (
            <TouchableOpacity 
                style={tabItemPrimary}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <LinearGradient
                    style={{ padding: 18, borderRadius: 50 }}
                    colors={[colors.primary, colors.secondary]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                >
                    <Icon />
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    /* Menu Item */
    return (
        <TouchableOpacity
            style={tabItem}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Icon />
        </TouchableOpacity>
    )
}

const tabItem =
{
    padding: 15,
    flex: 1,
    alignItems: 'center'
}

const tabItemPrimary =
{
    top: -20
}

const styles = StyleSheet.create({
    iconWrapper:
    {
        borderWidth: 1
    },
    notificationTick:
    {
        width: 11,
        height: 11,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11 / 2,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        top: -5,
        right: -0.5,
        zIndex: 1
    }
})

export default TabItem