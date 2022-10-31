import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader, TopTabButton } from '../../../components'
import { RedeemImage, TopUpImage, WithdrawImage } from '../../../assets'
import { colors, fonts, fontSizer } from '../../../utils'
import { transactionsHistoryAction } from '../../../config'

const TrxHistory = ({ navigation }) =>
{
    const [ refreshing, setRefreshing ] = useState(false)

    const dispatch = useDispatch()

    const currTrxHistory = useSelector(state => state.transactionsHistoryReducer.data)

    const tabsData = [
        { id: 1, code: null, label: 'All' },
        { id: 2, code: 'deposit', label: 'Top Up' },
        { id: 3, code: 'redeem', label: 'Redeem' },
        { id: 4, code: 'withdraw', label: 'Withdraw' }
    ]

    const wait = (timeout) =>
    {
        return new Promise(resolve => setTimeout(resolve, timeout))
    }

    const onRefresh = useCallback(() =>
    {
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false))
    }, [])

    const getTrxData = (type) => dispatch(transactionsHistoryAction(type))

    useEffect(() =>
    {
        getTrxData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pageHeader}>
                <PageHeader
                    title="Transactions History"
                    prevNav={true}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={
                    <TopTabButton
                        topTabsTitle="Recent Transactions"
                        tabList={tabsData}
                        tabItemOnPress={(code) => getTrxData(code)}
                    />
                }
                ListHeaderComponentStyle={styles.listHeaderComponent}
                data={currTrxHistory}
                renderItem={({ item, index }) => (
                    <View style={styles.trxTouchableWrapper(index, (currTrxHistory.length - 1))}>
                        <View style={styles.iconWrapper}>
                            <Image
                                source={
                                    item.trx_type === 'deposit'
                                    ? TopUpImage
                                    : item.trx_type === 'redeem'
                                        ? RedeemImage
                                        : item.trx_type === 'withdraw'
                                            ? WithdrawImage
                                            : null
                                }
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textWrapper}>
                            <View>
                                <Text style={styles.trxType}>
                                    { item.trx_type === 'deposit' ? 'Top Up' : null }
                                    { item.trx_type === 'redeem' ? 'Redeem' : null }
                                    { item.trx_type === 'withdraw' ? 'Withdraw' : null }
                                </Text>
                                <Text style={styles.trxDate}>
                                    15 Oct, 11.05
                                </Text>
                                <Text style={styles.trxID}>
                                    Trx ID: 7839477790
                                </Text>
                            </View>
                            
                            {
                                item.trx_type === 'deposit' || item.trx_type === 'withdraw'
                                ?
                                <CurrencyFormat
                                    value={item.amount}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={ `${item.trx_type === 'deposit' ? '+' : '-'} Rp. ` }
                                    renderText={value => <Text style={styles.trxNominal}>{value}</Text>}
                                />
                                :
                                <Text style={styles.trxNominal}>
                                    {item.amount}
                                </Text>
                            }
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default TrxHistory

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    pageHeader: { elevation: 8, shadowColor: 0 },
    listHeaderComponent:
    {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    trxTouchableWrapper: (index, dataLength) => ({
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 3,
        shadowColor: '#cecece',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eaeaea',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: index !== dataLength ? 10 : 25
    }),
    iconWrapper:
    {
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        padding: 10
    },
    image: { width: 35, height: 35 },
    textWrapper:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    trxType:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21)
    },
    trxDate:
    {
        color: '#999999',
        fontFamily: fonts.regular,
        fontSize: fontSizer(11),
        lineHeight: fontSizer(18)
    },
    trxID:
    {
        color: '#cccccc',
        fontFamily: fonts.regular,
        fontSize: fontSizer(11),
        lineHeight: fontSizer(18)
    },
    trxNominal:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21)
    }
})