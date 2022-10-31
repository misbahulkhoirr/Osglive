import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const Other = ({ content, time }) =>
{
    return (
        <View style={styles.container}>
            <View style={styles.chatContent}>
                <Text style={styles.text}>{content}</Text>
                <Text style={styles.date}>{time}</Text>
            </View>
        </View>
    )
}

export default Other

const styles = StyleSheet.create({
    container:
    {
        marginBottom: 20,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    chatContent:
    {
        padding: 12,
        paddingRight: 18,
        backgroundColor: colors.primaryLight,
        maxWidth: '70%',
        borderRadius: 10,
        borderBottomLeftRadius: 0
    },
    text:
    {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.text.primary
    },
    date:
    {
        fontSize: 11,
        fontFamily: fonts.regular,
        color: colors.text.secondary,
        marginTop: 8
    }
})