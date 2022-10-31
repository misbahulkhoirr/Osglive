const initialState =
{
    data: [],
    error: undefined,
}
  
export default function BanksReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'PAYMENT_CHANNEL_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}