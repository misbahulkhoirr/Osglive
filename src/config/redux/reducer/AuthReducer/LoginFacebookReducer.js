const initialState =
{
    data: {},
    error: undefined,
}
  
export default function LoginFacebookReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'LOGIN_FACEBOOK_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: {},
                error : undefined,
            }
        case 'LOGIN_FACEBOOK_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
        case 'LOGIN_FACEBOOK_FAILED':
            return {
                ...state,
                error: action.error
            }
            break
        default:
            return state
    }
}