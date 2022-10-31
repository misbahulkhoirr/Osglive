const initialState =
{
    data: [],
    error: undefined,
}
  
export default function GetGiftsReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'GIFTS_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}