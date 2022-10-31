import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data';

export function isLoading(bool)
{
    return {
        type: 'EDIT_USER_ATTEMPT',
        isLoading: bool,
    }
}
export function EditUserSucess(edituserData)
{
    return {
        type: 'EDIT_USER_SUCCESS',
        edituserData,
    }
}

export function EditUserFailed(error)
{
    return {
        type: 'EDIT_USER_FAILED',
        error,
    }
}

export function EditUserAction(data_form, navigation) {
    // console.log('data yang masuk kesini apa aja', data_form);
    return async (dispatch) => {
        const endpoint = 'http://52.76.213.248/osgolive/v1/api/user'
        const accessToken = await AsyncStorage.getItem('access_token').then((res) => {
            return res
        })
          
        const data = new FormData();
        data.append('name', data_form.name);
        data.append('email', data_form.email);
        data.append('bio', data_form.bio);
        data.append('phone', data_form.phone);
        if(data_form.password){
            data.append('old_password', data_form.old_password);
            data.append('password', data_form.password);
            data.append('password_confirmation', data_form.password_confirmation);
        }

        if(data_form.photo){
            data.append('photo',{
                    uri: Platform.OS === 'android' ? data_form.photo : 'file://' + data_form.photo,
                    name: data_form.photo,
                    type: 'image/jpeg' // or your mime type what you want
            });
        }

    try {
        const response = await axios({
            method: 'post',
            url: endpoint,
            headers: { 
                'Authorization': "Bearer " + JSON.parse(accessToken), 
                // ...data.getHeaders()
            },
            data : data
        })

        if (response.status < 300) {
            // console.log('masuk kesini kalo responsenya berhasil');
            dispatch(EditUserSucess(response.data))
            // console.log('ActionSuccess',JSON.stringify(response.data));
            
            // setTimeout(() => {

                // navigation.navigate('Account')
                // navigation.reset({
                //     index: 0,
                //     routes: [{name: 'Account'}],
                // })
                navigation.navigate('Account')
            // }, 2000)
        }

        else {
            console.log(response, 'failed')
            dispatch(EditUserFailed(error.response.data))
            // console.log(error.response.data,'erroractionFailedEdit');
            navigation.navigate('EditProfAccount')
        }
    } catch (error) {
        console.log('error', error.response)
        dispatch(EditUserFailed(error.response.data))
        // console.log(error.response.data,'erroractionCatchEdit');
        navigation.navigate('EditProfAccount')
    }


    // .then(function (response) {
    //     dispatch(EditUserSucess(response.data))
    //     console.log('ActionSuccess',JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //     dispatch(EditUserFailed(error.response.data))
    //     console.log(error.response.data,'erroraction');
    // });

   }
}
