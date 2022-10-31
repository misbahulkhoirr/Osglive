const initialState =
{
    data: [],
    error: undefined
}
  
export default function TransactionTopUpReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'TRANSACTION_TOPUP_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        default:
            return state
    }
}