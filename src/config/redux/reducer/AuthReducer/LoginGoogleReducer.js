const initialState =
{
    data: [],
    error: undefined,
}
  
export default function LoginGoogleReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'LOGIN_GOOGLE_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: {},
                error : undefined,
            }
        case 'LOGIN_GOOGLE_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
        case 'LOGIN_GOOGLE_FAILED':
            return {
                ...state,
                error: action.error
            }
            break
        default:
            return state
    }
}