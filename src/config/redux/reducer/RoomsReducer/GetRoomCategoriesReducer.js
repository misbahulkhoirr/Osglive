const initialState =
{
    data: [],
    error: undefined,
}
  
export default function GetRoomCategoriesReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'GET_LIVE_CATEGORIES_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}