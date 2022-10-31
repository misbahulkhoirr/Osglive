const initialState =
{
    data: [],
    error: undefined,
}
  
export default function RoomsReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'ROOM_ATTEMPT':
            return {
                ...state,
                isLoading:true,
                data: [],
                error: undefined,
            }
            break
        case 'ROOMS_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        case 'ROOMS_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}