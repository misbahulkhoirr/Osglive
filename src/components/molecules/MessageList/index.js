import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, fonts, bucketURL } from '../../../utils'
import { IconNext } from '../../atoms'
import { DefaultAvatar } from '../../../assets'

const MessageList = ({ photo, username, message, type, onPress }) =>
{  
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={photo ? { uri: `${bucketURL}/${photo}` } : DefaultAvatar} style={styles.avatar} />
            <View style={styles.content}>
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.desc}>{message}</Text>
            </View>
            {type === 'next' && <IconNext />}
        </TouchableOpacity>
    )
}

export default MessageList

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: { flex: 1, marginLeft: 16 },
    avatar:
    {
        width: 45,
        height: 45,
        borderRadius: 45 / 2
    },
    name:
    {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: colors.text.primary,
    },
    desc:
    {
        fontSize: 12,
        fontFamily: fonts.light,
        color: colors.text.secondary
    }
})