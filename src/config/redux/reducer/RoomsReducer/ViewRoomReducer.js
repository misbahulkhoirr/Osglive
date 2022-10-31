const initialState =
{
    viewroomData: [],
    error: undefined
}
  
export default function ViewRoomReducer(state = initialState, action)
{
    console.log(action.type)
    
    switch(action.type)
    {
        case 'VIEW_ROOMS_SUCCESS':
            return {
                ...state,
                viewroomData: action.viewroomData,
            }
            break
        default:
            return state
    }
}