import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function isLoading(bool)
{
    return {
        type: 'ROOM_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function roomsSuccess(roomsData)
{
    return {
        type: 'ROOMS_SUCCESS',
        roomsData
    }
}

export function roomsFailed(error)
{
    return {
        type: 'ROOMS_FAILED',
        error
    }
}

export function RoomAction(room_category_id)
{
    // console.log('room_category_id',room_category_id)
    if(room_category_id){
        return async function (dispatch) {
            try
            {
            const endpoint = `http://52.76.213.248/osgolive/v1/api/rooms?room_category_id=${room_category_id}`
            const accessToken = await AsyncStorage.getItem('access_token')
            const response = await axios({
                method: 'GET',
                url: endpoint,
                params:{
                    room_category_id:room_category_id
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    console.log('ActionRooms', response)
                    return dispatch(roomsSuccess(response.data))
                }
            })
            }
            catch (error)
            {
                console.log('GET ERRORS ::: ',error)
                return dispatch(roomsFailed(error));
            }
        }
    }else{
        return async function (dispatch) {
            try
            {
            const endpoint = `http://52.76.213.248/osgolive/v1/api/rooms`
            const accessToken = await AsyncStorage.getItem('access_token')
            const response = await axios({
                method: 'GET',
                url: endpoint,
                params:{
                    room_category_id:room_category_id
                },
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken),
                    "Accept": "application/json",
                },
            }).then((response) => {
                if (response.status < 300)
                {
                    console.log('ActionRooms', response)
                    return dispatch(roomsSuccess(response.data))
                }
            })
            }
            catch (error)
            {
                console.log('GET ERRORS ::: ',error)
                return dispatch(roomsFailed(error));
            }
        }
    }
    
}