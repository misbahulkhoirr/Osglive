const initialState =
{
    loading: false,
}
  
const globalReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.value
            }
        default:
            return state
    }
}

export default globalReducer