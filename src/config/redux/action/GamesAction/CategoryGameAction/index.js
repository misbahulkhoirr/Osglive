import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function categoryGamesSuccess(categoryGamesData)
{
    return {
        type: 'CATEGORY_GAMES_SUCCESS',
        categoryGamesData
    }
}

export function categoryGamesFailed(error)
{
    return {
        type: 'CATEGORY_GAMES_FAILED',
        error
    }
}

export function CategoryGameAction()
{
    return async function (dispatch) {
        
        // console.log(accessToken,'tokenrooms')

        try
        {
            const endpoint = 'http://52.76.213.248/osgolive/v1/api/game_categories'
            const accessToken = await AsyncStorage.getItem('access_token')
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(accessToken),
                }
            })
            console.log('GET SUCCESS ::: ',response.data)
            return dispatch(categoryGamesSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET ERRORS ::: ',error)
            return dispatch(categoryGamesFailed(error));
        }
    }
}