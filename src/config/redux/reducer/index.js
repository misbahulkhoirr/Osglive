import { combineReducers } from 'redux'
import { RegisterReducer, LoginReducer, LogoutReducer, ForgotPasswordReducer, OTPReducer, OTPRegisterReducer, ResetPasswordReducer, LoginGoogleReducer, LoginFacebookReducer } from './AuthReducer'
import { RoomsReducer, RoomPlayReducer, SettingRoomReducer, ViewRoomReducer, StopRoomReducer, RoomFollowReducer, FollowRoomReducer, UnFollowRoomReducer, RoomDetailReducer, GetGiftsReducer, PostGiftReducer, CloseViewReducer, GetRoomCategoriesReducer, LiveCategoryReducer, GetRoomsByCategoryReducer, ForceStopReducer } from './RoomsReducer'
import { GetUserReducer, GetBalanceReducer, EditUserReducer, WithdrawRateReducer, ConvertReedemReducer, ReedemNominalReducer, TransactionAllReducer, TransactionTopUpReducer, TransactionRedeemReducer, TransactionWithdrawReducer, LiveHistoryReducer, transactionsHistoryReducer } from './UserReducer'
import { NominalTopUpReducer, BanksReducer, PaymentTopUpReducer } from './PaymentsReducer'
import { GameReducer, CategoryGameReducer, getGamesByCategoryReducer } from './GamesReducer'
import { ProcessReducer } from './ChatReducer'
import { MessagesListReducer, getMessageReducer, sendMessageReducer, unreadMessageReducer } from './MessagesReducer'
import globalReducer from './globalReducer'

const rootReducer = combineReducers({
    globalReducer,
    RegisterReducer,
    LoginReducer,
    LogoutReducer,
    ForgotPasswordReducer,
    OTPReducer,
    OTPRegisterReducer,
    ResetPasswordReducer,
    LoginGoogleReducer,
    LoginFacebookReducer,

    RoomsReducer,
    RoomFollowReducer,
    RoomPlayReducer,
    SettingRoomReducer,
    ViewRoomReducer, 
    StopRoomReducer,
    FollowRoomReducer,
    UnFollowRoomReducer,
    RoomDetailReducer,
    GetGiftsReducer,
    PostGiftReducer,
    CloseViewReducer,
    GetRoomCategoriesReducer,
    LiveCategoryReducer,
    GetRoomsByCategoryReducer,
    ForceStopReducer,

    GetUserReducer,
    GetBalanceReducer,
    EditUserReducer,
    WithdrawRateReducer,
    ConvertReedemReducer,
    ReedemNominalReducer,
    TransactionAllReducer,
    TransactionTopUpReducer,
    TransactionRedeemReducer,
    TransactionWithdrawReducer,
    LiveHistoryReducer,
    transactionsHistoryReducer,

    NominalTopUpReducer,
    BanksReducer,
    PaymentTopUpReducer,

    GameReducer,
    CategoryGameReducer,
    getGamesByCategoryReducer,

    ProcessReducer,

    MessagesListReducer,
    getMessageReducer,
    sendMessageReducer,
    unreadMessageReducer
})

export default rootReducer