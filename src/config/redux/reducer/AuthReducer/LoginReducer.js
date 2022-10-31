const initialState =
{
    userData: [],
    error: undefined,
}
  
export default function LoginReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'LOGIN_ATTEMPT':
            return {
                ...state,
                isLoading:true,
                userData :[],
                error : undefined,
            }
            break
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                userData : action.userData,
                isLoading:false,
                error: undefined
            }
            break
        case 'LOGIN_FAILED':
            return {
                ...state,
                userData :[],
                isLoading: true,
                error: action.error
            }
        default:
            return state
    }
}