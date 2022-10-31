const initialState =
{
    data: [],
    error: undefined
}
  
export default function NominalTopUpReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'TOPUP_NOMINAL_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}