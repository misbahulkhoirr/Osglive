export default function ProcessReducer(state = {}, action)
{
    switch(action.type)
    {
        case "CHAT_PROCESS":
            return { 
              ...action.payload 
            }
        default:
            return state
    }
}