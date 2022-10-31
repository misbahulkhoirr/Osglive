const initialState =
{
    data: [],
    error: undefined
}
  
export default function TransactionAllReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'TRANSACTION_ALL_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        default:
            return state
    }
}