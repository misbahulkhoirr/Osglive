import AsyncStorage from '@react-native-community/async-storage'
import { showError } from '../showMessage'

export const tokenValidation = (reducer, navigation) =>
{

    if(reducer !== null)
        {
            if(reducer && reducer.status === 401)
            {
                AsyncStorage.removeItem('access_token')
    
                showError('Please login again.')
    
                setTimeout(() =>
                {
                    navigation.navigate('Login')
                }, 2000)
            }
        }

    // When access_token key not found, redirect to login page
    // AsyncStorage.getItem('access_token').then((response) =>
    // {
    //     if(response === null || undefined)
    //     {
    //         showError('Please login again.')

    //         setTimeout(() =>
    //         {
    //             navigation.navigate('Login')
    //         }, 2000)
    //     }
    // })
}