import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { DefaultAvatar } from '../../assets'
import { ChatItem, Gap, InputChat, PageHeader } from '../../components'
import { bucketURL, useForm } from '../../utils'
import { getMessageAction, sendMessageAction, getUserDetailAction } from '../../config'

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})
const Chatting = ({ navigation, route }) =>
{
    const dataStreamer = route.params
    const [form, setForm] = useForm({
        receiver: dataStreamer.username,
        message: '',
    })

    const dispatch = useDispatch()

    const getmessageList = useSelector(state => state.getMessageReducer)
    const sendMessageList = useSelector(state => state.sendMessageReducer)

    const chatSend = () =>
    {
        dispatch(sendMessageAction(form))
        socket.emit('PushMessage', form.message)
        setForm('reset')
    }

    const currFullName = (username) =>
    {
        return username.length > 25 ? `${username.substring(0, 22)}...` : username
    }

    useEffect(() => {
        dispatch(getUserDetailAction()).then((res) =>
        {
            socket.emit("PushRoomMessage",
            {
                username: res.data.name,
                sessionId: dataStreamer.sessionId,
            })
        })
        socket.on('New_Message', (data) => {
            // console.log('dataNewMessage',data)
            dispatch(getMessageAction(dataStreamer.username))
        })
        dispatch(getMessageAction(dataStreamer.username))
    },[socket])

    return (
        <View style={styles.container}>
            <PageHeader
                title={currFullName(dataStreamer.username)}
                photo={dataStreamer.photo ? { uri: `${bucketURL}/${dataStreamer.photo}` } : DefaultAvatar}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    {getmessageList && getmessageList.data.map((item, index) => (
                        item.receiver === dataStreamer.username
                        ?
                        <ChatItem
                            key={index}
                            content={item.message}
                            time={item.created_at}
                            isMe
                        />
                        :
                        <ChatItem
                            key={index}
                            content={item.message}
                            time={item.created_at}
                        />
                    ))}
                    
                    <Gap height={25} />
                </ScrollView>
            </View>
            <InputChat
                value={form.message}
                onChangeText={value => setForm('message',value)}
                onButtonPress={chatSend}
            />
        </View>
    )
}

export default Chatting

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    content:
    {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: '#f8f8f8'
    }
})