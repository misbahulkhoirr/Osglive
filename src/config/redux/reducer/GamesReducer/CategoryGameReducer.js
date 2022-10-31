const initialState =
{
    data: [],
    error: undefined,
}
  
export default function CategoryGameReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'CATEGORY_GAMES_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}