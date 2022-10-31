const initialState =
{
    data: [],
    isLoading: false,
    error: undefined,
}

export default function OTPRegisterReducer(state = initialState, action)
{    
    switch (action.type)
    {
        case 'OTP_SIGNUP_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: [],
                error: undefined,
            }
            break
        case 'OTP_SIGNUP_SUCCESS':
            return {
                ...state,
                data: action.data,
                isLoading: false,
                error: undefined,
            }
            break
        case 'OTP_SIGNUP_FAILED':
            return {
                ...state,
                error: action.error,
                isLoading: true,
                data: [],
            }
            break
        default:
            return state
    }
}