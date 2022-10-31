import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function reedemnominalSuccess(DataNominalReedem)
{
    return {
        type: 'REEDEM_NOMINAL_SUCCESS',
        DataNominalReedem
    }
}

export function reedemnominalFailed(error)
{
    return {
        type: 'REEDEM_NOMINAL_FAILED',
        error
    }
}

export function ReedemNominalAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/redeem_nominal'
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
            return dispatch(reedemnominalSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error reedemnominal')
            return dispatch(reedemnominalFailed(error));
        }
    }
}