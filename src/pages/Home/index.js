import React, { useState, useEffect, useCallback } from 'react'
import { Text, TouchableOpacity, View, RefreshControl, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import io from 'socket.io-client'
import { Gap, Grid, Link, LiveGrid } from '../../components'
import { style } from '../../assets'
import { bucketURL, colors, fonts, fontSizer, tokenValidation } from '../../utils'
import { getGamesAction, getRoomsAction } from '../../config'
import AsyncStorage from '@react-native-community/async-storage'

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})

socket.connect()
socket.on('connect', () =>
{
    console.log('Connected to socket server.');
})

const Home = ({ navigation }) =>
{
    const dispatch = useDispatch()
    const liveList = useSelector(state => state.RoomsReducer)
    const gameList = useSelector(state => state.GameReducer)

    const { data: roomsData } = liveList
    const { data: gamesData } = gameList

    const wait = (timeout) =>
    {
        return new Promise(resolve => setTimeout(resolve, timeout))
    }

    const [ refreshing, setRefreshing ] = useState(false)

    const onRefresh = useCallback(() =>
    {
        dispatch(getRoomsAction())
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false))
    }, [])

    useEffect(() =>
    {
        tokenValidation(liveList.error, navigation)
        dispatch(getRoomsAction())
        dispatch(getGamesAction())

        socket.on('broadcast', (data) =>
        {
            dispatch(getRoomsAction())
            console.log(data.text)
        })
    }, [socket, liveList.error])

    // AsyncStorage.getItem('contacts').then((res) => {
    //     console.log('ResponseHome:',res)
    // })

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={style.scrollView} 
            showsVerticalScrollIndicator={false}
        >
            <View style={style.content}>

                {/* Game Section */}
                <View style={section}>
                    <View 
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View style={section.headerWrapper}>
                            <Text style={section.headerTitle}>Games</Text>
                            <Text style={section.headerDesc}>Latest games</Text>
                        </View>
                        <Text style={{ fontFamily: fonts.regular, color: colors.text.secondary }}>
                            <Link title="More &rarr;" onPress={() => navigation.navigate('Game')} />
                        </Text>
                    </View>

                    <Grid
                        data={gamesData}
                        columns={5}
                        columnSpacing={15}
                        gridItems={(item, index, defaultStyle) => (
                            <TouchableOpacity
                                style={defaultStyle.columnItem}
                                onPress={() => navigation.navigate('InGame', {apps: item.api})}
                            >
                                <Image
                                    source={{ uri: `${bucketURL}/${item.cover}` }}
                                    style={section.image}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <Gap height={25} />

                {/* Live Section */}
                <View style={[section, { borderBottomWidth: 0 }]}>
                    <View 
                        style={[section.headerWrapper, { borderColor: colors.secondary }]}
                    >
                        <Text style={section.headerTitle}>Live</Text>
                        <Text style={section.headerDesc}>Latest live broadcasts</Text>
                    </View>

                    <LiveGrid data={roomsData} />
                    <Gap height={50} />
                </View>
            </View>
        </ScrollView>
    )
}

const section =
{
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    paddingBottom: 10,

    headerWrapper:
    {
        borderLeftWidth: 3,
        paddingVertical: 5,
        paddingLeft: 12,
        borderColor: colors.primary,
        marginBottom: 15,
    },
    headerTitle:
    {
        fontFamily: fonts.medium,
        fontSize: fontSizer(16),
        lineHeight: fontSizer(23),
        color: colors.text.primary,
    },
    headerSubTitle:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        paddingLeft: 7,
        marginBottom: 10
    },
    headerDesc:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
    },
    image:
    {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8
    },
}

export default Home