import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function roomdetailSuccess(roomdetailData)
{
    return {
        type: 'ROOM_DETAIL_SUCCESS',
        roomdetailData
    }
}

export function roomdetailFailed(error)
{
    return {
        type: 'ROOM_DETAIL_FAILED',
        error
    }
}

// export function RoomDetailAction(room_id)
// {
//     console.log(room_id,'room_ID')
//     return async function (dispatch) {
//         const endpoint = `http://52.76.213.248/osgolive/v1/api/live_detail/?room_id=${room_id}`
//         const accessToken = await AsyncStorage.getItem('access_token')
//         console.log(accessToken,'tokenroomsview')

//         try
//         {
//             const response = await axios.get(endpoint, {
//                 headers: {
//                     'Authorization': 'Bearer ' + JSON.parse(accessToken),
//                 }
//             })
//             console.log(response.data,'data')
//             return dispatch(roomdetailSuccess(response.data));
//         }
//         catch (error)
//         {
//             console.log(error,'error getroom detail')
//             return dispatch(roomdetailFailed(error));
//         }
//     }
// }

export function RoomDetailAction(room_id)
{
    console.log('action',room_id)
    
    return async function (dispatch) {
        
        // console.log('accessToken:',accessToken)
        try
        {
            const endpoint = `http://52.76.213.248/osgolive/v1/api/live_detail/?room_id=${room_id}`
            const accessToken = await AsyncStorage.getItem('access_token')
            console.log('action2',room_id)
            const response = await axios({
                method: 'GET',
                url: endpoint,
                params:{
                    room_id:room_id
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    // console.log('actionsDetail', response)
                    return dispatch(roomdetailSuccess(response.data))
                }
            })
        }
        catch (error)
        {
            console.log('error', error.response.data)

            return dispatch(roomdetailFailed(error))
        }
    }
}