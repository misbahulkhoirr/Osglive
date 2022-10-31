import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function NominalTopUpSuccess(NominalTopupData)
{
    return {
        type: 'NOMINAL_TOPUP_SUCCESS',
        NominalTopupData
    }
}

export function NominalTopUpFailed(error)
{
    return {
        type: 'NOMINAL_TOPUP_FAILED',
        error
    }
}

export function NominalTopUpAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/topup_nominal'
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
            console.log('GET NOMINAL TOP UP SUCCESS ::: ',response.data)
            return dispatch(NominalTopUpSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET NOMINAL TOP UP ERRORS ::: ',error)
            // console.log('error401', error.response.status == 401)
            return dispatch(NominalTopUpFailed(error));
        }
    }
}