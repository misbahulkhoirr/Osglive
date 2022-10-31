import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconBack } from '../../atoms'
import { bucketURL, colors, fonts, fontSizer } from '../../../utils'
import { DefaultAvatar } from '../../../assets'

const PageHeader = ({ title, prevNav, photo, onPress }) =>
{
    const capitalizeFirstEachWord = (text) =>
    {
        const finalSentence = text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
        return finalSentence
    }

    if(prevNav)
    {
        return (
            <View style={[styles.container, styles.withPrevNav]}>
                <TouchableOpacity onPress={onPress}>
                    <IconBack size={24} />
                </TouchableOpacity>
                <Text style={[styles.title, { paddingLeft: 5 }]}>
                    {title}
                </Text>
            </View>
        )
    }

    if(photo)
    {
        return (
            <View style={styles.containerWithPhoto}>
                <TouchableOpacity onPress={onPress}>
                    <IconBack size={24} />
                </TouchableOpacity>
                <Text style={[styles.title, { paddingLeft: 5 }]}>
                    {capitalizeFirstEachWord(title)}
                </Text>
                <Image
                    source={photo}
                    style={styles.photo}
                />
            </View>
        )
    }

    return (
        <View style={[styles.container, styles.regularType]}>
            <Text style={[styles.title, { paddingLeft: 10 }]}>
                {title}
            </Text>
        </View>
    )
}

export default PageHeader

const styles = StyleSheet.create({
    container:
    {
        height: 50,
        paddingLeft: 5,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary
    },
    containerWithPhoto:
    {
        height: 50,
        paddingLeft: 5,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    photo:
    {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginRight: 10
    },
    regularType:
    {
        justifyContent: 'center'
    },
    withPrevNav:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(15),
    },
})