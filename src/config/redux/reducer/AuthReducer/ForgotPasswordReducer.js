const initialState =
{
    data: {},
    error: undefined,
}

export default function ForgotPasswordReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'FORGOT_PASSWORD_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: {},
                error : undefined,
            }
            break
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'FORGOT_PASSWORD_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}