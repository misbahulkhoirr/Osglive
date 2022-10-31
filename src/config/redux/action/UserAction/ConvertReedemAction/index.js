import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function ConvertSuccess(convertDiamondData)
{
    return {
        type: 'CONVERT_REEDEM_SUCCESS',
        convertDiamondData,
    }
}

export function ConvertFailed(error)
{
    return {
        type: 'CONVERT_REEDEM_FAILED',
        error,
    }
}

export function ConvertReedemAction(redeem_id)
{
    console.log('action',redeem_id)
    
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/redeem'
            const accessToken = await AsyncStorage.getItem('access_token')
            console.log('action2',redeem_id)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                params:{
                    redeem_id:redeem_id
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    return dispatch(ConvertSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('error', error.response.data)

            return dispatch(ConvertFailed(error))
        }
    }
}