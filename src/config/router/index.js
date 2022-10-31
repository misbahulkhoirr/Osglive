import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {
    Account,
    AppSetting,
    Chatting,
    CreatorStudio,
    EditProfAccount,
    ForgotPassword,
    Games,
    HelpCenter,
    Home,
    InGame,
    InvitationStatistics,
    LiveStream,
    LiveStreamHistory,
    Login,
    LoginGoogle,
    Messages,
    NotificationList,
    RedeemDiamonds,
    ResetPassword,
    SignUp,
    Slot1,
    Splash,
    TopUpBalance,
    TopUpBalanceConfirmation,
    TrxHistory,
    VerifyAccount,
    WatchLiveVideo,
    Welcome,
    WithdrawBalance,
    Notifications
} from '../../pages'
import { BottomNavigator, Loading } from '../../components'
import { store } from '../../config/redux'
import { getGameCategoriesAction } from '../../config'

const Tab   = createBottomTabNavigator()
const Stack = createStackNavigator()

const Tabs = () =>
{
    const dispatch = useDispatch()

    useEffect(() =>
    {
        dispatch(getGameCategoriesAction())
    }, [])

    return (
        <Tab.Navigator
            tabBar={props => <BottomNavigator {...props} />}
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Live" component={LiveStream} />
            <Tab.Screen name="Studio" component={CreatorStudio} />
            <Tab.Screen name="Game" component={Games} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

const AllTabs = () =>
{
    const { loading } = useSelector(state => state.globalReducer)

    return (
        <>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ 
                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' }
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="MainApp" component={Tabs} />
                <Stack.Screen name="WatchLiveVideo" component={WatchLiveVideo} />
                <Stack.Screen name="InGame" component={InGame} />
                <Stack.Screen name="LoginGoogle" component={LoginGoogle} />
                <Stack.Screen name="Slot1" component={Slot1} />
                <Stack.Screen name="TrxHistory" component={TrxHistory} />
                <Stack.Screen name="AppSetting" component={AppSetting} />
                <Stack.Screen name="EditProfAccount" component={EditProfAccount} />
                <Stack.Screen name="HelpCenter" component={HelpCenter} />
                <Stack.Screen name="InvitationStatistics" component={InvitationStatistics} />
                <Stack.Screen name="LiveStreamHistory" component={LiveStreamHistory} />
                <Stack.Screen name="RedeemDiamonds" component={RedeemDiamonds} />
                <Stack.Screen name="TopUpBalance" component={TopUpBalance} />
                <Stack.Screen name="TopUpBalanceConfirmation" component={TopUpBalanceConfirmation} />
                <Stack.Screen name="WithdrawBalance" component={WithdrawBalance} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Chatting" component={Chatting} />
                <Stack.Screen name="Messages" component={Messages} />
                <Stack.Screen name="NotificationList" component={NotificationList} />
                <Stack.Screen name="Notifications" component={Notifications} />
            </Stack.Navigator>
            {loading && <Loading />}
        </>
    )
}

const Router = () =>
{
    return (
        <Provider store={store}>
            <AllTabs />
        </Provider>
    )
}

export default Router