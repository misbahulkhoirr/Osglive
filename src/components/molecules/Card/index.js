import React from 'react'
import { Text, View } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'

const Card = (props) =>
{
    const { title, content } = props

    return (
        <View style={card}>
            <Text style={card.title}>{title}</Text>
            <Text style={card.content}>{content}</Text>
        </View>
    )
}

const card =
{
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 10,
    backgroundColor: '#fff',

    title:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(16),
        marginBottom: 10
    },
    content:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12)
    }
}

export default Card