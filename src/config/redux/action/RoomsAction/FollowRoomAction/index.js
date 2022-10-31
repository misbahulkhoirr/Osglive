import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function FollowRoomSuccess(FollowRoomData)
{
    return {
        type: 'FOLLOW_ROOM_SUCCESS',
        FollowRoomData,
    }
}

export function FollowRoomFailed(error)
{
    return {
        type: 'FOLLOW_ROOM_FAILED',
        error,
    }
}

export function FollowRoomAction(data)
{
    console.log('action',data)
    
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/follow'
            const accessToken = await AsyncStorage.getItem('access_token')
            console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                data:{
                    id: data.id
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            })
            .then((response) =>
            {
                if (response.status < 300)
                {
                    return dispatch(FollowRoomSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('error', error)

            return dispatch(FollowRoomFailed(error))
        }
    }
}