import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function isLoading(bool)
{
    return {
        type: 'POST_GIFT_ATTEMPT',
        isLoading: bool,
    }
}

export function PostGiftSuccess(data)
{
    return {
        type: 'POST_GIFT_SUCCESS',
        data,
    }
}

export function PostGiftFailed(error)
{
    return {
        type: 'POST_GIFT_FAILED',
        error,
    }
}

export function PostGiftAction(gift_id, room_id)
{
    // console.log('action',data)
    
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/gift'
            const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('action2', data)
            const response = await axios({
                method: 'POST',
                url: endpoint,
                params:{
                    gift_id: gift_id,
                    room_id: room_id
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    // console.log(response,'POstGift')
                    return dispatch(PostGiftSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('error', error.response)

            return dispatch(PostGiftFailed(error.response))
        }
    }
}