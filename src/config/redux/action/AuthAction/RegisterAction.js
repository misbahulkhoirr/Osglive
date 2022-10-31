import axios from 'axios'

export function isLoading(bool)
{
    return {
        type: 'REGISTER_ATTEMPT',
        isLoading: bool,
        error,
    }
}

export function registerSuccess(userData)
{
    return {
        type: 'REGISTER_SUCCESS',
        userData,
    }
}

export function registerFailed(error)
{
    return {
        type: 'REGISTER_FAILED',
        error,
    }
}

const RegisterAction = (data, navigation) => {
    console.log('action',data)
    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://52.76.213.248/osgolive/v1/api/auth/register',
                data: {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    gender: data.gender,
                    password: data.password,
                    password_confirmation: data.password_confirmation
                }
            })
            console.log(response, 'response')
            if (response.status < 300) {
                console.log(response, 'response')
                dispatch(registerSuccess(response.data))
                navigation.navigate('VerifyAccount', { itemEmail: data.email })
            }

            else if(response.status > 300) {
                dispatch(registerFailed(response.data))
                console.log(response, 'gagal lebih 300')
                navigation.navigate('VerifyAccount')
            }
        } catch (error_1) {
            console.log('error', error_1)

            dispatch(registerFailed(error_1.response))
            navigation.navigate('SignUp')
        }
   }
}

export default RegisterAction