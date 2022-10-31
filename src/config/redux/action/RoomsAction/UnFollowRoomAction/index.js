import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function UnFollowRoomSuccess(UnFollowRoomData)
{
    return {
        type: 'UNFOLLOW_ROOM_SUCCESS',
        UnFollowRoomData,
    }
}

export function UnFollowRoomFailed(error)
{
    return {
        type: 'UNFOLLOW_ROOM_FAILED',
        error,
    }
}

export function UnFollowRoomAction(data)
{
    console.log('action',data)
    
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/unfollow'
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
            }).then((response) => {
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    return dispatch(UnFollowRoomSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('error', error)

            return dispatch(UnFollowRoomFailed(error))
        }
    }
}