import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function BanksSuccess(BanksData)
{
    return {
        type: 'BANKS_SUCCESS',
        BanksData
    }
}

export function BanksFailed(error)
{
    return {
        type: 'BANKS_FAILED',
        error
    }
}

export function BanksAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/banks'
        const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
            return res
        })
        // console.log(accessToken,'nominalTop')

        try
        {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log('GET BANKS SUCCESS ::: ',response.data)
            return dispatch(BanksSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET BANKS ERRORS ::: ',error)
            // console.log('error401', error.response.status == 401)
            return dispatch(BanksFailed(error));
        }
    }
}