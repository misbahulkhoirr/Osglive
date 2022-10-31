const initialState =
{
    data: [],
    error: undefined
}
  
export default function WithdrawRateReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'WITHDRAW_RATE_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        default:
            return state
    }
}