import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


export function isLoading(bool)
{
    return {
        type: 'RESET_PASSWORD_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function ResetPasswordSuccess(ResetPasswordData)
{
    return {
        type: 'RESET_PASSWORD_SUCCESS',
        ResetPasswordData,
    }
}

export function ResetPasswordFailed(error)
{
    return {
        type: 'RESET_PASSWORD_FAILED',
        error,
    }
}

export function ResetPasswordAction(data, navigation)
{
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/auth/reset-password'
            // const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                data: {
                    code: data.code,
                    new_password: data.new_password,
                    password_confirmation: data.password_confirmation
                },
                // headers: {
                //     Authorization: 'Bearer ' + JSON.parse(accessToken),
                //     "Accept": "application/json",
                // },
            })
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    dispatch(ResetPasswordSuccess(response.data))
                    setTimeout(() => {
                        navigation.navigate('Login')
                    }, 1000)
                }
        }
        catch (error)
        {
            console.log('ResetError', error.response)

            dispatch(ResetPasswordFailed(error.response))
        }
    }
}