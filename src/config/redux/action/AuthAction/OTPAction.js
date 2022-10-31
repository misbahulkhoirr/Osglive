import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


export function isLoading(bool)
{
    return {
        type: 'OTP_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function OTPSuccess(OTPData)
{
    return {
        type: 'OTP_SUCCESS',
        OTPData,
    }
}

export function OTPFailed(error)
{
    return {
        type: 'OTP_FAILED',
        error,
    }
}

export function OTPAction(data,navigation)
{
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/auth/verify-otp'
            // const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                data: {
                    otp: data.otp
                },
            })
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    console.log(response);
                    dispatch(OTPSuccess(response.data))
                    // storeData('code', response.data.code)
                    navigation.navigate('ResetPassword', {code: response.data.code})
                }
        }
        catch (error) 
        {
            console.log('OTPFailed', error.response)

            dispatch(OTPFailed(error.response))
            
            AsyncStorage.removeItem('code')
            // setTimeout(() => {
                
            //     navigation.reset({
            //         index: 0,
            //         routes: [{name: 'ForgotPassword'}],
            //     })
                
            //     navigation.navigate('ForgotPassword') 
            // }, 1000)
        }
    }
}