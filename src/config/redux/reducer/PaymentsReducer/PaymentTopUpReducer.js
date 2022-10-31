const initialState =
{
    data: [],
    error: ''
}

export default function PaymentTopUpReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'TOPUP_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        case 'TOPUP_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}