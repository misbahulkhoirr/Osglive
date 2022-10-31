const initialState =
{
    data: [],
    error: undefined,
}
  
export default function GetRoomsByCategoryReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'GET_ROOMS_BY_CATEGORY_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}