import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function withdrawSuccess(withdrawData)
{
    return {
        type: 'WITHDRAW_RATE_SUCCESS',
        withdrawData
    }
}

export function withdrawFailed(error)
{
    return {
        type: 'WITHDRAW_RATE_FAILED',
        error
    }
}

export function WithdrawRateAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/withdraw_rate'
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
            return dispatch(withdrawSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error getuser')
            return dispatch(withdrawFailed(error));
        }
    }
}