import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'
import LinearGradient from 'react-native-linear-gradient'

const Button = ({ title, outlined, onPress }) =>
{
    if(outlined === true)
    {
        return (
            <TouchableOpacity
                style={outlinedButton}
                onPress={onPress}
            >
                <Text style={outlinedButton.title}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                style={[filledButton]}
                colors={[colors.primary, colors.secondary]}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            >
                <Text style={filledButton.title}>
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const filledButton =
{
    borderRadius: 15,
    paddingVertical: 16,

    title:
    {
        color: '#ffffff',
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        textTransform: 'uppercase',
        textAlign: 'center',
    }
}

const outlinedButton =
{
    borderWidth: 1,
    borderColor: colors.border.secondary,
    borderRadius: 12,
    backgroundColor: 'transparent',
    paddingVertical: 14,

    title:
    {
        color: colors.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        textTransform: 'uppercase',
        textAlign: 'center',
    }
}

export default Button