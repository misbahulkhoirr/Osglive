const initialState =
{
    data: [],
    error: undefined,
}
  
export default function GetUserReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'USER_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}