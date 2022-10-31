import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Gap, IconCard, OptionGrid, PageHeader } from '../../../components'
import { BeansImage, style } from '../../../assets'
import { colors, fonts, fontSizer, tokenValidation } from '../../../utils'
import { getUserBalanceAction, withdrawRateAction } from '../../../config'

const WithdrawBalance = ({ navigation }) =>
{
    const [ items, setItems ] = useState([
        { nominal: '10000', beans: '15' },
        { nominal: '15000', beans: '20' },
        { nominal: '20000', beans: '25' },
        { nominal: '25000', beans: '30' },
        { nominal: '30000', beans: '35' },
        { nominal: '50000', beans: '60' },
        { nominal: '75000', beans: '80' },
        { nominal: '100000', beans: '110' },
        { nominal: '150000', beans: '160' },
        { nominal: '200000', beans: '220' },
        { nominal: '500000', beans: '550' },
        { nominal: '1000000', beans: '1250' }
    ])
    
    const dispatch     = useDispatch()
    const balanceList  = useSelector(state => state.GetBalanceReducer)
    const withdrawRate = useSelector(state => state.WithdrawRateReducer)

    const { data: balanceData } = balanceList

    /**
     * Handling function when amount is selected
     * @param {*} option
     */
    const handleSelectAmount = (option) =>
    {
        console.log('Selected: ', option)
    }

    useEffect(() =>
    {
        tokenValidation(balanceList.error, navigation)
        dispatch(getUserBalanceAction())
        dispatch(withdrawRateAction())
    }, [])

    return (
        <ScrollView
            style={style.scrollView}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.pageHeader}>
                <PageHeader
                    title="Withdraw"
                    prevNav={true}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <View style={style.content}>
                {/* Details */}
                <>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <Gap height={5} />
                    <View style={styles.summary}>
                        <View style={styles.itemWrapper}>
                            <View style={styles.groupText}>
                                <IconCard size={20} />
                                <Gap width={8} />
                                <Text style={styles.itemLabelBold}>Credits</Text>
                            </View>
                            <View style={styles.groupText}>
                                <CurrencyFormat
                                    value={balanceData && balanceData.beans}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    renderText={value => <Text style={styles.desc}>{value ? value : 0}</Text>}
                                />
                                <Gap width={5} />
                                <Image source={BeansImage} style={styles.beansImage} />
                            </View>
                        </View>
                    </View>
                </>
                <Gap height={15} />

                {/* Bank Account */}
                <>
                    <Text style={styles.sectionTitle}>Bank Account</Text>
                    <Gap height={5} />
                    <View style={styles.BGdesc}>
                        <Text style={styles.itemLabel}>BCA Bank Central Asia</Text>
                    </View>
                </>
                <Gap height={15} />

                {/* Select Amount */}
                <>
                    <Text style={styles.sectionTitle}>Select Amount</Text>
                    <Gap height={5} />
                    <OptionGrid
                        options={items}
                        onChange={(option) => handleSelectAmount(option)}
                        renderItems={(opt) => (
                            <>
                                <View style={styles.itemTop}>
                                    <Text style={styles.itemTopText}>{opt.beans}</Text>
                                    <Gap width={5} />
                                    <Image source={BeansImage} style={styles.beansImage} />
                                </View>
                                <View style={styles.itemBottom}>
                                    <CurrencyFormat
                                        value={opt.nominal}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'+ Rp '}
                                        renderText={value => (
                                            <Text style={styles.itemBottomText}>
                                                {value}
                                            </Text>
                                        )}
                                    />
                                </View>
                            </>
                        )}
                    />
                </>

                {/* Withdraw Confirmation */}
                <View style={styles.buttonWrapper}>
                    <Button title="Withdraw" onPress={() => alert('Test ok.')} />
                    <Gap height={15} />
                </View>
            </View>
        </ScrollView>
    )
}

export default WithdrawBalance

const styles = StyleSheet.create({
    pageHeader: { elevation: 8, shadowColor: 0 },
    sectionTitle:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21),
        paddingLeft: 5
    },
    groupText:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    summary:
    {
        backgroundColor: colors.primaryLight,
        borderRadius: 8,
        padding: 15
    },
    BGdesc:
    {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 15
    },
    itemWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    itemLabelBold:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
    },
    itemLabel:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
    },
    desc:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21),
    },
    buttonWrapper: { paddingVertical: 50 },
    itemTop:
    {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    itemTopText:
    {
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        color: colors.text.secondary
    },
    itemBottom:
    {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
    },
    itemBottomText:
    {
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        color: colors.text.secondary
    },
    beansImage: { width: 20, height: 20 }
})