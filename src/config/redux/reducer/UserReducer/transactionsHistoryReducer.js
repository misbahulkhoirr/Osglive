const initialState =
{
    data: [],
    error: undefined
}
  
const transactionsHistoryReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case 'TRANSACTIONS_HISTORY_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        case 'TRANSACTIONS_HISTORY_TOPUP_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        case 'TRANSACTIONS_HISTORY_REDEEM_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        case 'TRANSACTIONS_HISTORY_WITHDRAW_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        default:
            return state
    }
}

export default transactionsHistoryReducer