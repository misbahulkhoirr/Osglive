const initialState =
{
    roomFollowData: [],
    error: undefined,
}
  
export default function RoomFollowReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'ROOM_FOLLOW_SUCCESS':
            return {
                ...state,
                roomFollowData: action.roomfollowData,
            }
            break
        default:
            return state
    }
}