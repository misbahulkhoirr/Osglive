const initialState =
{
    data: [],
    error: undefined,
}
  
export default function GameReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'GAMES_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}