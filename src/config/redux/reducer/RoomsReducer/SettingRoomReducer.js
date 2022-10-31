const initialState = 
{
    data: {},
    error: undefined
}

export default function SettingRoomReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'SETTING_ROOM_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: {},
                error: undefined,
            }
            break
        case 'SETTING_ROOM_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
        case 'SETTING_ROOM_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
        return state
    }
}