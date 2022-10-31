import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { IconGift, IconSend, Input } from '../../../components'
import { bucketURL, colors, fonts, fontSizer, usePrevious } from '../../../utils'
import { chatAction } from '../../../config'
import AsyncStorage from '@react-native-community/async-storage'

const ViewerChatbox = ({ socket, giftButtonOnPress, getUserLive, userId }) =>
{
    const [ text, setText ] = useState('')
    const [ messages, setMessages ] = useState([])
    const isFocused  = useIsFocused()
    const dispatch   = useDispatch()
    const prevAmount = usePrevious(getUserLive)
    
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

            console.log('ANS:', ans)

            let temp = messages

            temp.push({
                id_socket: data.socket_id,
                username: data.username,
                text: data.text,
                room_user_id: data.room_user_id,
                giftImage: data.giftImage
            })

            setMessages([...temp])

            if(data && data.giftImage) dispatch({ type: "POST_GIFT_ATTEMPT" })

            AsyncStorage.getItem('contacts')
            .then((contacts) => {
                const c = contacts ? JSON.parse(contacts) : [];
                c.push({
                    id_socket: data.socket_id,
                    username: data.username,
                    text: data.text,
                    room_user_id: data.room_user_id,
                    giftImage: data.giftImage
                });
                AsyncStorage.setItem('contacts', JSON.stringify(c));
            
                // messages.map((Response) => {
                //     console.log('Data', data.room_user_id)
                //     console.log('Response', Response.room_user_id)
                //     if(data.room_user_id !== Response.room_user_id){
                //         AsyncStorage.removeItem('contacts')
                //     }else{
                        setMessages(c)
                //     }
                    
                // })
                
            });
        })
        // if(prevAmount !== getUserLive)
        // {
        //     messages.push({})
        //     setMessages([])
        // }

        if(!isFocused) setMessages([])

    }, [socket, getUserLive, messages, isFocused])
    // console.log('messages',messages)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.upperSection}>
                    {/* Chats */}
                    <ScrollView style={styles.chatsWrapper}>
                        {messages && messages.filter(message => message.room_user_id === userId).map((msg, idx) => (
                            <View style={styles.chat} key={idx}>
                                <Text style={styles.chatUsername}>{msg.username}:</Text>
                                <Text style={styles.chatMessage}>{`${msg.text} `}</Text>
                                <Image
                                    source={{ uri: `${bucketURL}/${msg.giftImage}` }}
                                    style={styles.chatImage}
                                />
                            </View>)
                        )}
                    </ScrollView>

                    {/* Gift Button */}
                    <TouchableOpacity
                        style={styles.transparentButton}
                        onPress={giftButtonOnPress}
                    >
                        <IconGift color="#ffffff" />
                    </TouchableOpacity>
                </View>

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
            </View>
        </>
    )
}

export default ViewerChatbox

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
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        marginBottom: 7
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
    chatImage: { width: 25, height: 25 },
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