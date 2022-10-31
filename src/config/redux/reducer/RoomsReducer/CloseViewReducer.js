const initialState =
{
    data: [],
    error: '',
}
  
export default function CloseViewReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'STOP_WATCHING_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'STOP_WATCHING_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}