const initialState =
{
    data: [],
    error: undefined,
}
  
export default function getGamesByCategoryReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'GET_GAMES_BY_CATEGORY_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}