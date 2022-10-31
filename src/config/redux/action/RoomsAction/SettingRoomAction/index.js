import axios from 'axios'
import {storeData} from '../../../../../utils'
import AsyncStorage from '@react-native-community/async-storage';
import { loginFailed } from '../../AuthAction/LoginAction';

export function isLoading(bool)
{
    return {
        type: 'SETTING_ROOM_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function settingRoomSuccess(settingroomData)
{
    return {
        type: 'SETTING_ROOM_SUCCESS',
        settingroomData,
    }
}

export function settingRoomFailed(error)
{
    return {
        type: 'SETTING_ROOM_FAILED',
        error,
    }
}

// export const SettingRoomAction =  (data) => {
//     console.log('action',data)
//     return async (dispatch) => {
//         const endpoint = await 'http://52.76.213.248/osgolive/v1/api/start'
//         const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
//             return res
//         })
//         console.log(accessToken,'token')
//         return axios({
//             method:'POST',
//             url: endpoint,
//             data: {
//                 room_name: data.room_name,
//                 room_cover: data.room_cover, 
//             },
//             headers: {
//                 Authorization: "Bearer " + JSON.parse(accessToken),
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 // "Content-Type": "multipart/form-data",
//             },
//         }).then(response => {
//             console.log(response,'response');
//             if(response.status < 300)
//             {
//                 console.log(response,'response')
//                 dispatch(settingRoomSuccess(response.data))
//             }
//             else 
//             {
//                 dispatch(settingRoomFailed(response.data))
//             }
//         })
//         .catch((error) => {
//             console.log('error', error)

//             dispatch(settingRoomFailed(error))
//             })
//    }
// }

// export const SettingRoomAction =  (data) => {
//     console.log('action',data)
//     return async (dispatch) => {
//         const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
//         const endpoint = await 'http://52.76.213.248/osgolive/v1/api/start'
//         const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
//             return res
//         })
//         console.log(accessToken,'token')
//         var formdata = new FormData()
//         formdata.append('room_name', data.room_name)
//         formdata.append('room_cover',{
//             uri: Platform.OS === 'android' ? data.room_cover : 'file://' + data.room_cover,
//             name: data.room_cover,
//             type: 'image/jpeg' // or your mime type what you want
//         });

//         axios({
//             method:'POST',
//             url: endpoint,
//             data: formdata,
//             headers: {
//                 Authorization: "Bearer " + JSON.parse(accessToken),
//                 "Accept": "application/json",
//                 "Content-Type": "multipart/form-data",
//             },
//         }).then(response => {
//             if(response.status < 300)
//             {
//                 console.log('ROOM SUCCESS--->', response.data)
//             }
//             else 
//             {
//                 dispatch(settingRoomFailed(response.data))
//             }
//         })
//         .catch((error) => {
//             console.log('error', error)

//             dispatch(settingRoomFailed(error))
//         })

//         await sleep(1000)
//         return axios({
//             method:'POST',
//             url: 'http://52.76.213.248/osgolive/v1/api/live',
//             headers: {
//                 Authorization: "Bearer " + JSON.parse(accessToken),
//                 "Accept": "application/json",
//                 "Content-Type": "multipart/form-data",
//             },
//         }).then(response2 => {
//             if(response2.status < 300)
//             {
//                 console.log('LIVE SUCCESS--->', response2.data)
//                 dispatch(settingRoomSuccess(response2.data))
//             }
//             else 
//             {
//                 dispatch(settingRoomFailed(response2.data))
//             }
//         })
//         .catch((error) => {
//             console.log('error', error)

//             dispatch(settingRoomFailed(error))
//         })
//    }
// }

// export const SettingRoomAction =  (data) => {
//     console.log('actionSetting',data)
//     return async (dispatch) => {
//         const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
//         const endpoint = await 'http://52.76.213.248/osgolive/v1/api/live'
//         const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
//             return res
//         })
//         console.log(accessToken,'token')
//         var formdata = new FormData()
//         formdata.append('room_name', data.room_name)
//         formdata.append('room_category_id', data.room_category_id)
//         formdata.append('room_cover',{
//             uri: Platform.OS === 'android' ? data.room_cover : 'file://' + data.room_cover,
//             name: data.room_cover,
//             type: 'image/jpeg' // or your mime type what you want
//         });

//         axios({
//             method:'POST',
//             url: endpoint,
//             data: formdata,
//             headers: {
//                 Authorization: "Bearer " + JSON.parse(accessToken),
//                 "Accept": "application/json",
//                 "Content-Type": "multipart/form-data",
//             },
//         }).then(response => {
//             if(response.status < 300)
//             {
//                 console.log('ROOM SUCCESS--->', response.data)
//             }
//             else 
//             {
//                 console.log('ROOM FAILED', response.data)
//                 dispatch(settingRoomFailed(response.data))
//             }
//         })
//         catch((error) => {
//             console.log('ROOM FAILED--->', error.response)

//             dispatch(settingRoomFailed(error.response))
//         })
//    }
// }

export function SettingRoomAction(data)
{
    return async (dispatch) => {

        try
        {
            const endpoint = 'http://52.76.213.248/osgolive/v1/api/live'
            const accessToken = await AsyncStorage.getItem('access_token')
            var formdata = new FormData()
            formdata.append('room_name', data.room_name)
            formdata.append('room_category_id', data.room_category_id)

            if (data.room_cover) {
                formdata.append('room_cover',{
                    uri: Platform.OS === 'android' ? data.room_cover : 'file://' + data.room_cover,
                    name: data.room_cover,
                    type: 'image/jpeg' // or your mime type what you want
                });
            }

            console.log('accessToken', accessToken)
            const response = await axios({
                method:'POST',
                url: endpoint,
                data: formdata,
                headers: {
                    Authorization: "Bearer " + JSON.parse(accessToken),
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log('response API', response);
            console.log('isi data', formdata);
                if (response.status < 300)
                {
                    console.log('RESPONSE ACTION', response);
                    dispatch(settingRoomSuccess(response.data))
                    
                }
                console.log('response API', response);
        }
        
        catch (error)
        {
           
            console.log('RESPONSE error', error.response);
            dispatch(settingRoomFailed(error.response)) 
        }
        // console.log('TokenLogout',accessToken)
    }
}
