const initialState =
{
    data: [],
    error: undefined
}
  
export default function TransactionWithdrawReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'TRANSACTION_WITHDRAW_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        default:
            return state
    }
}