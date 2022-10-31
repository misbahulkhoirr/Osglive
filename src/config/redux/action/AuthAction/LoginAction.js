import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {storeData} from '../../../../utils'

export function isLoading(bool)
{
    return {
        type: 'LOGIN_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function loginSuccess(userData)
{
    return {
        type: 'LOGIN_SUCCESS',
        userData,
    }
}

export function loginFailed(error)
{
    return {
        type: 'LOGIN_FAILED',
        error,
    }
}

const LoginAction = (data, navigation) => 
{
    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://52.76.213.248/osgolive/v1/api/auth/login',
                data: {
                    email: data.email,
                    password: data.password,
                },
            })
            // console.log(response,'1response')
            if (response.status < 300) {
                dispatch(loginSuccess(response.data))
                storeData('user', response.data.user)
                storeData('access_token', response.data.access_token)
                console.log(response.data.access_token, 'responseaction')
                navigation.replace('MainApp')
            }

            else {
                console.log(response, 'failed')
                dispatch(loginFailed(response.data))
                AsyncStorage.removeItem('access_token')
                navigation.navigate('Login')
            }
        } catch (error_1) {
            console.log('error', error_1)
            dispatch(loginFailed(error_1.response))
            AsyncStorage.removeItem('access_token')
            navigation.navigate('Login')
        }
    }

}

export default LoginAction
