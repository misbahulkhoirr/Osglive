import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { GiftPopupImage, IconFlash, IconPlay, IconSend, IconStop, IconSwitchCamera, Input, Gap } from '../../../components'
import { colors, fonts, fontSizer } from '../../../utils'
import { chatAction } from '../../../config'

const StreamerChatbox = ({ socket, cameraButtonOnPress, flashButtonOnPress, liveButtonOnPress, stopButtonOnPress, testButton, isLive }) =>
{
    const [ text, setText ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ gift, setGift ] = useState('')

    const isFocused   = useIsFocused();
    const sendGiftRef = useRef(null)
    const dispatch    = useDispatch()
    
    const dispatchProcess = (encrypt, msg, cipher) =>
    {
        dispatch(chatAction(encrypt, msg, cipher))
    }

    const sendData = () =>
    {
        if(text !== '')
        {
            const ans = text
            socket.emit('chat', ans)
            setText('')
        }
    }

    useEffect(() =>
    {
        socket.on('message', (data) =>
        {
            const ans = data.text
            dispatchProcess(false, ans, data.text)

            console.log(ans)

            let temp = messages

            temp.push({
                id_socket: data.socket_id,
                username: data.username,
                text: ans,
                room_user_id: data.room_user_id,
                giftImage: data.giftImage
            })
            
            setMessages([...temp])
            setGift(data.giftImage)

            if(data.giftImage ? data.giftImage : null)
            {
                sendGiftRef.current.show()
                setTimeout(() =>
                {
                    sendGiftRef.current.hide()
                }, 2000)
            }
        })

        if(!isFocused) setMessages([])
    }, [socket, isFocused])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.upperSection}>
                    {/* Chats */}
                    <ScrollView style={styles.chatsWrapper}>
                        {messages.map((msg, idx) => (
                            <View style={styles.chat} key={idx}>
                                <Text style={styles.chatUsername}>{msg.username}:</Text>
                                <Text style={styles.chatMessage}>{msg.text}</Text>
                            </View>)
                        )}
                    </ScrollView>

                    <View style={styles.buttonGroup}>
                        {/* Live Button */}
                        <TouchableOpacity
                            style={styles.transparentButton}
                            onPress={isLive === true ? stopButtonOnPress : liveButtonOnPress}
                        >
                            {isLive === true ? <IconStop color="#ffffff" /> : <IconPlay color="#ffffff" /> }
                        </TouchableOpacity>
                        <Gap height={10} />

                        {/* Switch Camera Button */}
                        <TouchableOpacity
                            style={styles.transparentButton}
                            onPress={cameraButtonOnPress}
                        >
                            <IconSwitchCamera color="#ffffff" />
                        </TouchableOpacity>
                        <Gap height={10} />

                        {/* Flash Button */}
                        <TouchableOpacity
                            style={styles.transparentButton}
                            onPress={flashButtonOnPress}
                        >
                            <IconFlash color="#ffffff" />
                        </TouchableOpacity>
                        <Gap height={10} />

                        {/* Test Button */}
                        {/* <TouchableOpacity
                            style={styles.transparentButton}
                            onPress={testButton}
                        >
                            <IconFlash color="#ffffff" />
                        </TouchableOpacity> */}
                    </View>
                </View>

            {isLive === true ? 
                <View style={styles.lowerSection}>
                    {/* Input Message */}
                    <View style={styles.inputChat}>
                        <Input
                            useIcon={true} 
                            iconName="chat" 
                            value={text} 
                            onChangeText={(text) => setText(text)} 
                            onKeyPress={(text) =>
                            {
                                if(text.key === "Enter") sendData()
                            }}
                            placeholder="Type your message here ..."
                        />
                    </View>

                    {/* Send Button */}
                    <TouchableOpacity
                        onPress={sendData}
                    >
                        <LinearGradient
                            style={styles.sendButton}
                            colors={[colors.primary, colors.secondary]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                            <IconSend filled={true} color="#ffffff" size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            : null}
            </View>

            <GiftPopupImage
                ref={sendGiftRef}
                imagePopUp={gift ? gift : null}
            />
        </>
    )
}

export default StreamerChatbox

const styles = StyleSheet.create({
    container:
    {
        width: '100%',
        padding: 15,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
    },
    upperSection:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    chatsWrapper: { maxHeight: 200 },
    chat:
    {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        marginBottom: 10
    },
    chatUsername:
    {
        color: '#dedede',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19)
    },
    chatMessage:
    {
        color: '#ffffff',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
        marginLeft: 5
    },
    buttonGroup: { flexDirection: 'column' },
    transparentButton:
    {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginLeft: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    lowerSection:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    inputChat:
    {
        flex: 1,
        borderRadius: 5
    },
    sendButton:
    {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginLeft: 10,
    }
})