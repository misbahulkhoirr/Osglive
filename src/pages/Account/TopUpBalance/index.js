import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, Grid, IconDiamond, PageHeader } from '../../../components'
import { style, VoucherBGImage } from '../../../assets'
import { colors, fonts, fontSizer } from '../../../utils'
import { topupNominalListAction } from '../../../config'

const TopUpBalance = ({ navigation }) =>
{
    const dispatch = useDispatch()
    const topupNominalList = useSelector(state => state.NominalTopUpReducer.data)

    const { topup: topupData } = topupNominalList
    
    useEffect(() =>
    {
        dispatch(topupNominalListAction())
    }, [])

    return (
        <ScrollView
            style={style.scrollView}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.pageHeader}>
                <PageHeader
                    title="Top Up"
                    prevNav={true}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <View style={style.content}>
                <Grid
                    data={topupData}
                    aspectRatio={16/9}
                    columnSpacing={15}
                    gridItems={(item) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('TopUpBalanceConfirmation', { itemNominal: item.amount, itemDiamonds: item.diamonds })}
                        >
                            <View style={styles.itemNominal}>
                                <Image
                                    source={VoucherBGImage}
                                    style={styles.image}
                                />
                                <View style={styles.itemNominalValueWrapper}>
                                    <Text style={styles.itemNominalLabel}>Rp</Text>
                                    <CurrencyFormat
                                        value={item.amount}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        renderText={value => <Text style={styles.itemNominalText}>{value}</Text>}
                                    />
                                </View>
                            </View>
                            <View style={styles.itemDiamonds}>
                                <Text style={styles.itemDiamondsText}>+{item.diamonds}</Text>
                                <Gap width={5} />
                                <IconDiamond color="#03A9F4" size={15}/>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    )
}

export default TopUpBalance

const styles = StyleSheet.create({
    pageHeader: { elevation: 8, shadowColor: 0 },
    itemContainer: { flex: 1 },
    image:
    { 
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    itemNominal:
    {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center'
    },
    itemNominalValueWrapper:
    {
        paddingHorizontal: 15,
        position: 'absolute'
    },
    itemNominalLabel:
    {
        fontFamily: fonts.bold,
        fontSize: fontSizer(14),
        color: '#ffffff',
        marginBottom: 8
    },
    itemNominalText:
    {
        fontFamily: fonts.bold,
        fontSize: fontSizer(16),
        color: '#ffffff'
    },
    itemDiamonds:
    {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
    },
    itemDiamondsText:
    {
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        color: colors.text.secondary
    }
})