import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function transactionallSuccess(transactionAllData)
{
    return {
        type: 'TRANSACTION_ALL_SUCCESS',
        transactionAllData
    }
}

export function transactionallFailed(error)
{
    return {
        type: 'TRANSACTION_ALL_FAILED',
        error
    }
}

export function TransactionAllAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/transactions'
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
            return dispatch(transactionallSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error transaction all')
            return dispatch(transactionallFailed(error));
        }
    }
}