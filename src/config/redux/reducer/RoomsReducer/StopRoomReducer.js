const initialState =
{
    data: [],
    error: '',
}
  
export default function StopRoomReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'STOP_ROOM_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'STOP_ROOM_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}