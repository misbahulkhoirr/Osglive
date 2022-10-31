const initialState =
{
    data: [],
    error: '',
}
  
export default function FollowRoomReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'FOLLOW_STREAMER_ATTEMPT':
            return {
                ...state,
                isLoading:true,
                data :[],
                error : undefined,
            }
        case 'FOLLOW_STREAMER_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'FOLLOW_STREAMER_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}