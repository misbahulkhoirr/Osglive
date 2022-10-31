const initialState =
{
    data: [],
    error: undefined
}
  
export default function ReedemNominalReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'REEDEM_NOMINAL_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}