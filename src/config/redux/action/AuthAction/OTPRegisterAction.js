import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


export function isLoading(bool)
{
    return {
        type: 'OTPREGISTER_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function OTPRegisterSuccess(OTPRegisterData)
{
    return {
        type: 'OTPREGISTER_SUCCESS',
        OTPRegisterData,
    }
}

export function OTPRegisterFailed(error)
{
    return {
        type: 'OTPREGISTER_FAILED',
        error,
    }
}

export function OTPRegisterAction(data,navigation)
{
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/auth/verify-account'
            // const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                data: {
                    otp: data.otp,
                    email: data.email
                },
            })
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    console.log(response);
                    dispatch(OTPRegisterSuccess(response.data))
                    // storeData('code', response.data.code)
                    navigation.navigate('Login')
                }
        }
        catch (error)
        {
            console.log('OTPRegisterFailed', error.response)

            dispatch(OTPRegisterFailed(error.response))
            
            AsyncStorage.removeItem('code')
        }
    }
}