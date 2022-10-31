import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { colors, fonts, fontSizer } from '../../../utils'

const LiveListLayer = forwardRef(({ data }, ref) =>
{
    const [ isVisible, setIsVisible ] = useState(false)

    useImperativeHandle(ref, () =>
    {
        return {
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false),
            isVisible
        }
    })

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            hasBackdrop={false}
            style={{ margin: 0 }}
        >
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {
                    data.map((item, index) => (
                        <TouchableOpacity
                            style={{
                                height: 75,
                                backgroundColor: 'white',
                                borderRadius: 8,
                                marginBottom: data.length === index+1 ? 0 : 10
                            }}
                            key={index}
                        >
                            <Image source={item.roomCover} style={styles.image} />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.text}
                            >
                                {item.roomName}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </Modal>
    )
})

export default LiveListLayer

const styles = StyleSheet.create({
    container:
    {
        width: 100,
        height: '100%',
        position: 'absolute',
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8
    },
    image:
    {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8
    },
    text:
    {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        color: colors.dark,
        textAlign: 'center',
        fontSize: fontSizer(11),
        fontFamily: fonts.light,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 3
    }
})