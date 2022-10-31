import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function transactionredeemSuccess(transactionRedeemData)
{
    return {
        type: 'TRANSACTION_REDEEM_SUCCESS',
        transactionRedeemData
    }
}

export function transactionredeemFailed(error)
{
    return {
        type: 'TRANSACTION_REDEEM_FAILED',
        error
    }
}

export function TransactionRedeemAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/transactions_redeem'
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
            return dispatch(transactionredeemSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error transaction reedem')
            return dispatch(transactionredeemFailed(error));
        }
    }
}