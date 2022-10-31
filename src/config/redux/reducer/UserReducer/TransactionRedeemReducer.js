const initialState =
{
    data: [],
    error: undefined
}
  
export default function TransactionRedeemReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'TRANSACTION_REDEEM_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        default:
            return state
    }
}