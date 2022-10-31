import axios from 'axios'
import {storeData} from '../../../../../utils'
import AsyncStorage from '@react-native-community/async-storage';

export function stopRoomSuccess(stoproomData)
{
    return {
        type: 'STOP_ROOM_SUCCESS',
        stoproomData
    }
}

export function stopRoomFailed(error)
{
    return {
        type: 'STOP_ROOM_FAILED',
        error
    }
}

export function StopRoomAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/stop'
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
                    console.log('responseStatusStop:', response)
                    return dispatch(stopRoomSuccess(response.data))
                }
                else
                {
                    alert('Terjadi kesalahan')
                    return dispatch(stopRoomFailed(error))
                }
            })
        }
        catch (error)
        {
            console.log('error', error.response.data)
            
            return dispatch(stopRoomFailed(error))
        }
    }
}