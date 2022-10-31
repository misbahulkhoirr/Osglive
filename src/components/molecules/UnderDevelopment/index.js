import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Gap } from '../../atoms'
import { style, UnderDevelopmentImage } from '../../../assets'
import { colors, fonts, fontSizer } from '../../../utils'

const UnderDevelopment = ({ onPress }) =>
{
    return (
        <ScrollView style={style.scrollView} showsVerticalScrollIndicator={false}>
            <View style={underDevelopment}>
                <UnderDevelopmentImage width={200} height={200} />

                <Text style={underDevelopment.text}>
                    This page/feature is under development process
                </Text>

                <Gap height={150} />

                <View style={underDevelopment.button}>
                    <Button title="Go Back" outlined={true} onPress={onPress} />
                </View>
            </View>
        </ScrollView>
    )
}

const underDevelopment =
{
    alignItems: 'center',
    padding: 15,
    paddingTop: 80,

    text:
    {
        color: '#999999',
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21),
        padding: 15,
        textAlign: 'center',
        paddingHorizontal: 50,
        borderRadius: 8,
        backgroundColor: colors.primaryLight
    },
    button:
    {
        width: 100,
    }
}

export default UnderDevelopment