const initialState =
{
    liveCategory: [],
    error: undefined
}

const LiveCategoryReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case 'GET_LIVE_CATEGORY_SUCCESS':
            return {
                ...state,
                liveCategory: action.data
            }
            break
        default:
            return state
    }
}

export default LiveCategoryReducer