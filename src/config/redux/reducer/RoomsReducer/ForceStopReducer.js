const initialState =
{
    data: [],
    error: '',
}
  
export default function ForceStopReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'FORCE_STOP_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'FORCE_STOP_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}