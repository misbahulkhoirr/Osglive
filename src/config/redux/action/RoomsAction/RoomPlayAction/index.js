import axios from 'axios'
import {storeData} from '../../../../../utils'
import AsyncStorage from '@react-native-community/async-storage';

export function postRoomSuccess(playroomData)
{
    return {
        type: 'POST_ROOM_SUCCESS',
        playroomData
    }
}

export function postRoomFailed(error)
{
    return {
        type: 'POST_ROOM_FAILED',
        error
    }
}

export function RoomPlayAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/live'
        const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
            // console.log('logoutaction',res)
            return res
        })

        try
        {
            const response = await axios({
                method: 'post',
                url: endpoint,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    console.log('responseStatusPlay:', response)
                    return dispatch(postRoomSuccess(response.data))
                }
                else
                {
                    alert('Terjadi kesalahan')
                    return dispatch(postRoomFailed(error))
                }
            })
        }
        catch (error)
        {
            console.log('error', error.response.data)
            
            return dispatch(postRoomFailed(error))
        }
    }
}