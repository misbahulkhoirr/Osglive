const initialState =
{
    data: [],
    error: undefined,
}
  
export default function RoomDetailReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'ROOM_DETAIL_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}