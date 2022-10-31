import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function viewroomSuccess(viewroomData)
{
    return {
        type: 'VIEW_ROOMS_SUCCESS',
        viewroomData
    }
}

export function viewroomFailed(error)
{
    return {
        type: 'VIEW_ROOMS_FAILED',
        error
    }
}

export function ViewRoomAction(id)
{
    return async function (dispatch) {
        const endpoint = `http://52.76.213.248/osgolive/v1/api/view/${id}`
        const accessToken = await AsyncStorage.getItem('access_token')
        console.log(accessToken,'tokenroomsview')

        try
        {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log(response.data,'data')
            return dispatch(viewroomSuccess(response.data));
        }
        catch (error)
        {
            console.log(error,'error getrooms')
            return dispatch(viewroomFailed(error));
        }
    }
}