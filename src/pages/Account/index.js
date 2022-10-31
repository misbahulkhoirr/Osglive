import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import { GoogleSignin } from '@react-native-community/google-signin'
import { useIsFocused } from '@react-navigation/native'
import io from 'socket.io-client'
import { Gap, Button, MenuListSection, IconDiamond, IconNotification } from '../../components'
import { BeansImage, DefaultAvatar, SwitchImageIcon, TopUpImageIcon, WithdrawImageIcon } from '../../assets'
import { bucketURL, colors, fonts, fontSizer, tokenValidation } from '../../utils'
import { getUserBalanceAction, getUserDetailAction, logoutAction, unreadMessageAction } from '../../config'

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})
const Account = ({ navigation }) =>
{
    const dispatch = useDispatch()
    const userList = useSelector(state => state.GetUserReducer)
    const balanceList = useSelector(state => state.GetBalanceReducer)
    const unreadMessageList = useSelector(state => state.unreadMessageReducer)
    const isFocused = useIsFocused()

    const { data: userData }    = userList
    const { data: balanceData } = balanceList
    const { data: unreadMessageData } = unreadMessageList

    const accountManagement = [ 
        { icon: 'account', name: 'Edit Profile', onPress: () => navigation.navigate('EditProfAccount'), notificationTick: false },
        { icon: 'document', name: 'Transactions History', onPress: () => navigation.navigate('TrxHistory'), notificationTick: false },
        { icon: 'history', name: 'Live Stream History', onPress: () => navigation.navigate('LiveStreamHistory'), notificationTick: false },
        { icon: 'chat', name: 'Messages', onPress: () => navigation.navigate('Messages'), notificationTick: true, unMessage: unreadMessageData  },
    ]

    const others = [ 
        { icon: 'help', name: 'Help Center', onPress: () => navigation.navigate('HelpCenter'), notificationTick: false },
        { icon: 'setting', name: 'Application Setting', onPress: () => navigation.navigate('AppSetting'), notificationTick: false }
    ]

    const onLogout = async () =>
    {
        await dispatch(logoutAction({ navigation }))
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
    }
    
    useEffect(() =>
    {
        socket.on('New_Message', (data) => {
            // console.log('dataNewMessage',data)
            dispatch(unreadMessageAction())
        })
        tokenValidation(null, navigation)
        dispatch(getUserBalanceAction())
        dispatch(getUserDetailAction())
        dispatch(unreadMessageAction())
    }, [userData.name, userData.photo, isFocused, socket])
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Account Header */}
            <View style={styles.header}>
                <Image
                    source={
                        userData.photo
                        ? { uri: `${bucketURL}/${userData.photo}` }
                        : DefaultAvatar
                    }
                    style={styles.image}
                />
                <Text style={styles.headerText}>{userData.name}</Text>
                <Text style={styles.userIdText}>ID: {userData.id}</Text>
                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={() => navigation.navigate('NotificationList')}
                >
                    <View>
                        <IconNotification
                            filled={true}
                            color={colors.text.secondary}
                            size={18}
                        />
                        <View style={styles.notificationTick} />
                    </View>
                </TouchableOpacity>
            </View>

            <Gap height={30} />

            {/* Amount of Assets */}
            <View style={styles.assetsContainer}>
                <Text style={styles.assetsTitle}>Assets</Text>
                <Gap height={5} />
                <View style={styles.assetsWrapper}>
                    <View style={styles.beansWrapper}>
                        {
                            balanceData
                            ?
                            <CurrencyFormat
                                value={balanceData.beans}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                renderText={value => <Text style={styles.assetsValue}>{value}</Text>}
                            />
                            : 0
                        }
                        <Gap width={5} />
                        <Image source={BeansImage} style={styles.beansImage} />
                    </View>

                    <View style={styles.diamondsWrapper}>
                        {
                            balanceData
                            ?
                            <CurrencyFormat
                                value={balanceData.diamonds}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                renderText={value => <Text style={styles.assetsValue}>{value}</Text>}
                            />
                            : 0
                        }
                        <Gap width={5} />
                        <IconDiamond color="#03A9F4" size={18}/>
                    </View>
                </View>
            </View>

            {/* Assets Management */}
            <View style={styles.assetsManagementContainer}>
                <View style={styles.assetsManagementWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate('TopUpBalance') }>
                        <View style={styles.assetsManagementIcon}>
                            <TopUpImageIcon width={45} height={45} />
                        </View>
                        <Text style={styles.assetsManagementLabel}>Top Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.assetsManagementWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate('RedeemDiamonds') }>
                        <View style={styles.assetsManagementIcon}>
                            <SwitchImageIcon width={45} height={45} />
                        </View>
                        <Text style={styles.assetsManagementLabel}>Redeem</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.assetsManagementWrapper, { borderRightWidth: 0 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('WithdrawBalance') }>
                        <View style={styles.assetsManagementIcon}>
                            <WithdrawImageIcon width={45} height={45} />
                        </View>
                        <Text style={styles.assetsManagementLabel}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Gap height={30} />

            {/* Section: Account Management */}
            <MenuListSection
                title="Account Management"
                dataList={accountManagement}
            />
            <Gap height={15} />

            {/* Section: Others */}
            <MenuListSection
                title="Others"
                dataList={others}
            />
            <Gap height={50} />

            <View style={styles.buttonWrapper}>
                <Button title="Logout" onPress={onLogout} outlined={true} />
            </View>
            <Gap height={100} />
        </ScrollView>
    )
}

export default Account

const styles = StyleSheet.create({
    container: { backgroundColor: '#f9f9f9' },
    header:
    {
        padding: 15,
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#ffffff',
        elevation: 10
    },
    notificationButton:
    {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35 / 2,
        backgroundColor: '#eaeaea'
    },
    image:
    {
        width: 65,
        height: 65,
        borderRadius: 100
    },
    headerText:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(15),
        lineHeight: fontSizer(22),
        paddingTop: 10,
        paddingBottom: 5
    },
    userIdText:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        paddingBottom: 10
    },
    assetsContainer:
    {
        marginHorizontal: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    assetsTitle:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        marginBottom: 5
    },
    assetsWrapper: { flexDirection: 'row' },
    assetsValue:
    {
        color: colors.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(16)
    },
    beansWrapper:
    {
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: colors.border.secondary,
        paddingVertical: 5,
        paddingRight: 15,
        marginRight: 15,
        alignItems: 'center'
    },
    beansImage: { width: 20, height: 20 },
    diamondsWrapper:
    {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center'
    },
    assetsManagementContainer:
    {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: colors.border.primary,
        flexDirection: 'row'
    },
    assetsManagementWrapper:
    {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: colors.border.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    assetsManagementIcon:
    {
        alignItems: 'center',
        paddingTop: 5
    },
    assetsManagementLabel:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        padding: 10
    },
    buttonWrapper: { paddingHorizontal: 10 },
    notificationTick:
    {
        width: 11,
        height: 11,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11 / 2,
        borderWidth: 2,
        borderColor: '#eaeaea',
        position: 'absolute',
        top: -5,
        right: -2,
        zIndex: 1
    }
})