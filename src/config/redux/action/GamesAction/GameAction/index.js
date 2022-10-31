import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export function gamesSuccess(gamesData)
{
    return {
        type: 'GAMES_SUCCESS',
        gamesData
    }
}

export function gamesFailed(error)
{
    return {
        type: 'GAMES_FAILED',
        error
    }
}

export function GameAction()
{
    return async function (dispatch) {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/games'
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
            return dispatch(gamesSuccess(response.data));
        }
        catch (error)
        {
            console.log('GET ERRORS ::: ',error)
            return dispatch(gamesFailed(error));
        }
    }
}