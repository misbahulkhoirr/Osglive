import React from 'react'
import { Text, View } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'

const HeaderText = ({ title, desc }) =>
{
    return (
        <View style={headerText}>
            <Text style={headerText.title}>{title}</Text>
            <Text style={headerText.desc}>{desc}</Text>
        </View>
    )
}

const headerText =
{
    paddingLeft: 15,

    title:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(25),
        lineHeight: fontSizer(32)
    },
    desc:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21)
    }
}

export default HeaderText