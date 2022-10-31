import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'

const ValidationTextError = ({ message }) =>
{
    return (
        <Text style={styles.textError}>
            {message}
        </Text>
    )
}

export default ValidationTextError

const styles = StyleSheet.create({
    textError:
    {
        color: colors.error,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        backgroundColor: '#FFEBEE',
        padding: 10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        marginTop: 5
    }
})