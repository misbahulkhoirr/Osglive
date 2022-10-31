import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import io from 'socket.io-client'
import { LivingThings } from '../../assets'
import { MessageList, PageHeader } from '../../components'
import { MessagesListAction } from '../../config'
import { useDispatch, useSelector } from 'react-redux'

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})
const Messages = ({ navigation }) =>
{
    const dispatch = useDispatch()
    const messageList = useSelector(state => state.MessagesListReducer)

    useEffect(() => {
        socket.on('New_Message', (data) => {
            dispatch(MessagesListAction())
        })
        dispatch(MessagesListAction())
    }, [socket])

    const dummy = [
        {
            photo: LivingThings,
            name: 'Nadya',
            desc: 'Main game lah ayo',
            userId: 12345678
        },
        {
            photo: LivingThings,
            name: 'Minami',
            desc: 'Diem diem aja, makan apa makan',
            userId: 23456781
        },
        {
            photo: LivingThings,
            name: 'Shinta',
            desc: 'Bosen game-nya itu-itu mulu',
            userId: 34567812
        },
        {
            photo: LivingThings,
            name: 'Uchida Maaya',
            desc: 'Gas teruuusss!',
            userId: 45678123
        },
        {
            photo: LivingThings,
            name: 'Nadin',
            desc: 'Makan mulu makan',
            userId: 56781234
        },
    ]
    // console.log('messageList',messageList)
    return (
        <View style={styles.container}>
            <PageHeader
                title="Messages"
                prevNav
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {messageList && messageList.data.map((item, index) =>
                    {
                        return (
                            <MessageList
                                photo={item.photo}
                                username={item.username}
                                message={item.message}
                                type="next"
                                onPress={() => navigation.navigate('Chatting',
                                {
                                    username: item.username,
                                    photo: item.photo,
                                    userId: item.userId,
                                    sessionId: item.session_id
                                })}
                                key={index}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    content:
    {
        flex: 1,
        backgroundColor: 'white'
    }
})