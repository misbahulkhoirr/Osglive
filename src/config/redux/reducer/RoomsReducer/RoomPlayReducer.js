const initialState =
{
    playroomData: [],
    error: '',
}
  
export default function RoomPlayReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'POST_ROOM_SUCCESS':
            return {
                ...state,
                playroomData: action.playroomData,
                error: undefined,
            }
            break
        case 'POST_ROOM_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}