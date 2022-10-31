import axios from 'axios'
import {storeData} from '../../../../../utils'
import AsyncStorage from '@react-native-community/async-storage';

export function userSuccess(userData)
{
    return {
        type: 'USER_SUCCESS',
        userData
    }
}

export function userFailed(error)
{
    return {
        type: 'USER_FAILED',
        error
    }
}

export function GetUserAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/user'
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
            return dispatch(userSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error getuser')
            return dispatch(userFailed(error));
        }
    }
}