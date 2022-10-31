const initialState =
{
    data: [],
    error: undefined
}
  
export default function LiveHistoryReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'LIVESTREAM_HISTORY_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}