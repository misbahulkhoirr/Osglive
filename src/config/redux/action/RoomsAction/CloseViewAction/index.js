import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function CloseViewSuccess(CloseViewData)
{
    return {
        type: 'CLOSE_VIEW_SUCCESS',
        CloseViewData,
    }
}

export function CloseViewFailed(error)
{
    return {
        type: 'CLOSE_VIEW_FAILED',
        error,
    }
}

export function CloseViewAction()
{
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = await 'http://52.76.213.248/osgolive/v1/api/close_view'
            const accessToken = await AsyncStorage.getItem('access_token')
            // console.log('action2', data)
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
                    return dispatch(CloseViewSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('errorView', error.response)

            return dispatch(CloseViewFailed(error.response))
        }
    }
}