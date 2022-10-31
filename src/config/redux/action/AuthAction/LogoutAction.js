import axios from 'axios'
import { getData } from '../../../../utils'
import AsyncStorage from '@react-native-community/async-storage';

export function logoutSuccess(userData)
{
    return {
        type: 'LOGOUT_SUCCESS',
        userData
    }
}

export function logoutFailed(error)
{
    return {
        type: "LOGOUT_FAILED",
        error
    }
}

function LogoutAction({navigation})
{
    return async function (dispatch) {

        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/auth/logout'
            const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('accessToken', accessToken)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    // console.log(response.data,'responsePayment')
                    AsyncStorage.removeItem('access_token')
                    navigation.replace('Login')
                    return dispatch(logoutSuccess(response.data))
                    
                }
            })
        }
        catch (error)
        {
            console.log('error', error)

            return dispatch(logoutFailed(error))
        }
        console.log('TokenLogout',accessToken)
    }
}

export default LogoutAction