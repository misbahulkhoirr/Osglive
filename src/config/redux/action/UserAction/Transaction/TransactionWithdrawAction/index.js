import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function transactionwithdrawSuccess(transactionWithdrawData)
{
    return {
        type: 'TRANSACTION_WITHDRAW_SUCCESS',
        transactionWithdrawData
    }
}

export function transactionwithdrawFailed(error)
{
    return {
        type: 'TRANSACTION_WITHDRAW_FAILED',
        error
    }
}

export function TransactionWithdrawAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/transactions_withdraw'
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
            return dispatch(transactionwithdrawSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error transaction withdraw')
            return dispatch(transactionwithdrawFailed(error));
        }
    }
}