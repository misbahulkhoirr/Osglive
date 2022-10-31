import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function roomfollowSuccess(roomfollowData)
{
    return {
        type: 'ROOM_FOLLOW_SUCCESS',
        roomfollowData
    }
}

export function roomfollowFailed(error)
{
    return {
        type: 'ROOM_FOLLOW__FAILED',
        error
    }
}

export function RoomFollowAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/rooms_follow'
        const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
            return res
        })

        try
        {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log('GET SUCCESS ::: ',response.data)
            return dispatch(roomfollowSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET ERRORS ::: ',error)
            return dispatch(roomfollowFailed(error));
        }
    }
}