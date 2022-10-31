import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const IsMe = ({ content, time }) =>
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

export default IsMe

const styles = StyleSheet.create({
    container:
    {
        marginBottom: 20,
        alignItems: 'flex-end'
    },
    chatContent:
    {
        padding: 12,
        paddingRight: 18,
        backgroundColor: colors.primary,
        maxWidth: '70%',
        borderRadius: 10,
        borderBottomRightRadius: 0
    },
    text:
    {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: 'white'
    },
    date:
    {
        fontSize: 11,
        fontFamily: fonts.regular,
        color: '#f2f2f2',
        marginTop: 8,
        textAlign: 'right'
    }
})