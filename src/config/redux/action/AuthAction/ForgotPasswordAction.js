import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function ForgotPasswordSuccess(ForgotPasswordData)
{
    return {
        type: 'FORGOT_PASSWORD_SUCCESS',
        ForgotPasswordData,
    }
}

export function ForgotPasswordFailed(error)
{
    return {
        type: 'FORGOT_PASSWORD_FAILED',
        error,
    }
}

export function ForgotPasswordAction(data, navigation)
{
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/auth/forgot-password'
            // const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                data: {
                    email: data.email
                },
                // headers: {
                //     Authorization: 'Bearer ' + JSON.parse(accessToken),
                //     "Accept": "application/json",
                // },
            })
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    dispatch(ForgotPasswordSuccess(response.data))
                    navigation.navigate('VerifyAccount', { itemEmail: data.email })
                    
                }
            
        }
        catch (error)
        {
            console.log('ForgotError', error.response)

            return dispatch(ForgotPasswordFailed(error.response))
        }
    }
}