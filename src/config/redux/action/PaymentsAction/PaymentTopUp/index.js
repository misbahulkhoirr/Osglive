import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function PaymentSuccess(PaymentData)
{
    return {
        type: 'PAYMENT_SUCCESS',
        PaymentData,
    }
}

export function PaymentFailed(error)
{
    return {
        type: 'PAYMENT_FAILED',
        error,
    }
}

export function PaymentTopUpAction(data)
{
    console.log('action',data)
    
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/payment'
            const accessToken = await AsyncStorage.getItem('access_token')
            console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                data:{
                    code: data.code,
                    amount: data.amount,
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    return dispatch(PaymentSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('error', error)

            return dispatch(PaymentFailed(error))
        }
    }
}