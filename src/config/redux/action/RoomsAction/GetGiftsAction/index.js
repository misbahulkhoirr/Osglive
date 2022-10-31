import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function giftsSuccess(giftsData)
{
    return {
        type: 'GIFTS_SUCCESS',
        giftsData
    }
}

export function giftsFailed(error)
{
    return {
        type: 'GIFTS_FAILED',
        error
    }
}

export function GetGiftsAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/gifts'
        const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
            return res
        })
        console.log(accessToken,'tokenrooms')

        try
        {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log('GET SUCCESS ::: ',response.data)
            return dispatch(giftsSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET ERRORS ::: ',error)
            return dispatch(GiftsAction(error));
        }
    }
}