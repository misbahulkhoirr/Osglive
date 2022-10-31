import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { ViewerCount } from '../../atoms'
import { bucketURL, colors, fonts, fontSizer } from '../../../utils'
import { Grid } from '../../molecules'

const LiveGrid = ({ data }) =>
{
    const navigation = useNavigation()
    
    if(data)
    {
        return (
            <Grid
                data={data}
                aspectRatio={1/1.1}
                columnSpacing={15}
                gridItems={(item) => (
                    <TouchableOpacity
                        style={live.container}
                        onPress={() => navigation.navigate('WatchLiveVideo', {id: item.id, userid: item.user_id, name: item.name, bio: item.bio, listRoom: data, status: item.status, photo: item.photo})}
                    >
                        <View style={live.imageCoverWrapper}>
                            <Image
                                source={{ uri: `${bucketURL}/${item.room_cover}` }}
                                style={live.imageCover}
                            />
                            <View style={live.viewerCountPositionWrapper}>
                                <ViewerCount data="25.7K" />
                            </View>
                        </View>

                        <View style={live.textWrapper}>
                            <Text style={live.roomName}>
                                {item.name.length > 25 ? `${item.name.substring(0, 22)}...` : item.name}
                            </Text>
                            <Text style={live.hostName}>{item.room_name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <Text style={live.notFollowingYet}>You're not following anyone else yet.</Text>
    )
}

const live = 
{
    container: { flex: 1 },
    imageCoverWrapper:
    {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: 5,
        backgroundColor: '#f5f5f5'
    },
    imageCover:
    {
        width: '100%',
        height: '100%'
    },
    viewerCountPositionWrapper:
    {
        position: 'absolute',
        top: 5,
        right: 5
    },
    textWrapper:
    {
        width: '100%',
        paddingVertical: 5
    },
    roomName:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12)
    },
    hostName:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12)
    },
    notFollowingYet:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14)
    }
}

export default LiveGrid