import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function categoriesSuccess(categoriesData)
{
    return {
        type: 'CATEGORIES_SUCCESS',
        categoriesData
    }
}

export function categoriesFailed(error)
{
    return {
        type: 'CATEGORIES_FAILED',
        error
    }
}

export function GetRoomCategoriesAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/room_categories'
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
            console.log('GET CATEGORIES SUCCESS ::: ',response.data)
            return dispatch(categoriesSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET CATEGORIES ERRORS ::: ',error)
            return dispatch(categoriesFailed(error));
        }
    }
}