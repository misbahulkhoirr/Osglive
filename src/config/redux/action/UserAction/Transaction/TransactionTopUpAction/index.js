import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function transactiontopupSuccess(transactionTopUpData)
{
    return {
        type: 'TRANSACTION_TOPUP_SUCCESS',
        transactionTopUpData
    }
}

export function transactiontopupFailed(error)
{
    return {
        type: 'TRANSACTION_TOPUP_FAILED',
        error
    }
}

export function TransactionTopUpAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/transactions_deposit'
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
            return dispatch(transactiontopupSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error transaction all')
            return dispatch(transactiontopupFailed(error));
        }
    }
}