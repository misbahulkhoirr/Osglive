const initialState =
{
    data: [],
    isLoading:false,
    error: ''
}
  
export default function PostGiftReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'POST_GIFT_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: [],
                error: undefined,
            }
            break
        case 'POST_GIFT_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'POST_GIFT_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}