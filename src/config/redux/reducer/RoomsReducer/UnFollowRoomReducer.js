const initialState =
{
    data: [],
    error: ''
}
  
export default function UnFollowRoomReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'UNFOLLOW_STREAMER_ATTEMPT':
            return {
                ...state,
                isLoading:true,
                data :[],
                error : undefined,
            }
        case 'UNFOLLOW_STREAMER_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'UNFOLLOW_STREAMER_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}