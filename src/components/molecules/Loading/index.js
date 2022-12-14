import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const Loading = () =>
{
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size="large" color={colors.primaryLight} />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    wrapper:
    {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.loadingBackground,
        width: '100%',
        height: '100%'
    },
    text:
    {
        fontSize: 16,
        color: colors.primaryLight,
        fontFamily: fonts.regular,
        marginTop: 10
    }
})