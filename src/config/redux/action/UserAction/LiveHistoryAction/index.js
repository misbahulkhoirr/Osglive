import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function LiveHistorySuccess(LiveHistoryData)
{
    return {
        type: 'LIVE_HISTORY_SUCCESS',
        LiveHistoryData
    }
}

export function LiveHistoryFailed(error)
{
    return {
        type: 'LIVE_HISTORY_FAILED',
        error
    }
}

export function LiveHistoryAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/live_histories'
        const accessToken = await AsyncStorage.getItem('access_token')
        // console.log(accessToken,'tokenUser')
        try
        {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log(response.data,'data')
            return dispatch(LiveHistorySuccess(response.data));
        }
        catch (error)
        {
            console.log(error.response,'error LiveHistory')
            return dispatch(LiveHistoryFailed(error));
        }
    }
}