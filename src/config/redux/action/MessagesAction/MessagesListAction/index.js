import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function MessageListSuccess(data)
{
    return {
        type: 'MESSAGES_LIST_SUCCESS',
        data
    }
}

export function MessageListFailed(error)
{
    return {
        type: 'MESSAGES_LIST_FAILED',
        error
    }
}

export function MessagesListAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/message_list'
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
            return dispatch(MessageListSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET ERRORS ::: ',error)
            return dispatch(MessageListFailed(error));
        }
    }
}