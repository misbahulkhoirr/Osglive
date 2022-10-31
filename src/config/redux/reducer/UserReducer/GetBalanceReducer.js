const initialState =
{
    data: [],
    error: undefined,
}
  
export default function GetBalanceReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'BALANCE_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        case 'BALANCES_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}