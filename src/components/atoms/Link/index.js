import React from 'react'
import { Text } from 'react-native'
import { colors, fonts } from '../../../utils'

const Link = ({ title, onPress }) => 
{
    return (
        <Text style={link} onPress={onPress}>
            {title}
        </Text>
    )
}

const link =
{
    color: colors.primary,
    fontFamily: fonts.regular
}

export default Link