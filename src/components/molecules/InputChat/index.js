import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { IconSend } from '../../../components'
import { colors, fonts } from '../../../utils'

const InputChat = ({ value, onChangeText, onButtonPress }) =>
{
    const Button = ({ disable }) =>
    {
        if(disable)
        {
            return (
                <View style={styles.button(disable)}>
                    <IconSend filled={true} color="#ffffff" size={20} />
                </View>
            )
        }
        
        return (
            <TouchableOpacity
                style={styles.button(disable)}
                onPress={onButtonPress}
            >
                <IconSend filled={true} color="#ffffff" size={20} />
            </TouchableOpacity>
        )
    }
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type your message here ..."
                value={value}
                onChangeText={onChangeText}
            />
            <Button disable={value.length < 1} />
        </View>
    )
}

export default InputChat

const styles = StyleSheet.create({
    container:
    {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    input:
    {
        backgroundColor: '#eaeaea',
        padding: 14,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        fontSize: 14,
        fontFamily: fonts.regular,
        maxHeight: 45
    },
    button: disable => ({
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45 / 2,
        backgroundColor: disable ? '#dedede' : colors.secondary,
        transform:[{ rotate: '-35deg' }]
    })
})