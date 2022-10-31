import axios from 'axios'
import {storeData} from '../../../../../utils'
import AsyncStorage from '@react-native-community/async-storage';

export function balanceSuccess(data)
{
    return {
        type: 'BALANCE_SUCCESS',
        data
    }
}

export function balanceFailed(error)
{
    return {
        type: 'BALANCES_FAILED',
        error
    }
}

export function GetBalanceAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/balance'
        const accessToken = await AsyncStorage.getItem('access_token')
        console.log('accessTOkenBalance:', accessToken)
        // console.log(accessToken,'tokenUser')
        try
        {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log(response.data,'data')
            return dispatch(balanceSuccess(response.data));
        }
        catch (error)
        {
            console.log(error.response,'error getbalance')
            return dispatch(balanceFailed(error.response));
        }
    }
}