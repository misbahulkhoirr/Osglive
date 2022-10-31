import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Gap, IconCard, IconDiamond, OptionGrid, PageHeader } from '../../../components'
import { BeansImage, style } from '../../../assets'
import { bucketURL, colors, fonts, fontSizer } from '../../../utils'
import { convertRedeemAction, getRedeemNominalAction, getUserBalanceAction } from '../../../config'

const RedeemDiamonds = ({ navigation }) =>
{
    const [ redeem_id, setRedeem_id ] = useState('')
    const [ balance, setBalance ] = useState('')

    const dispatch = useDispatch()

    const balanceList   = useSelector(state => state.GetBalanceReducer)
    const convertReedem = useSelector(state => state.ConvertReedemReducer)
    const reedemNominal = useSelector(state => state.ReedemNominalReducer)
    
    const { data: balanceData } = balanceList
    const { data: nominalReedemData } = reedemNominal
 
    const onSubmit = () => 
    {
        dispatch(convertRedeemAction(redeem_id)).then(() =>
        {
            loadGetBalance()
        })
    }

    const loadGetBalance = () =>
    {
        dispatch(getUserBalanceAction()).then(() =>
        {
            setBalance(balanceData.diamonds)
        })
    }

    useEffect(() =>
    {
        AsyncStorage.getItem('access_token').then((response) =>
        {
            if(response == null || response == undefined)
            {
                navigation.navigate('Login')
            }
        })

        dispatch(getRedeemNominalAction())
        loadGetBalance()
    }, [])

    return (
        <ScrollView
            style={style.scrollView}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.pageHeader}>
                <PageHeader
                    title="Redeem"
                    prevNav={true}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <View style={style.content}>
                {/* Details */}
                <>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <Gap height={5} />
                    <View style={styles.purchaseSummary}>
                        <View style={styles.itemWrapper}>
                            <View style={styles.groupText}>
                                <IconCard size={20} />
                                <Gap width={8} />
                                <Text style={styles.itemLabel}>Credits</Text>
                            </View>
                            <View style={styles.groupText}>
                                <Text style={styles.desc}>{balanceData && balanceData.diamonds ? balanceData.diamonds : 0}</Text>
                                <Gap width={5} />
                                <IconDiamond color="#03A9F4" size={15}/>
                            </View>
                        </View>
                    </View>
                </>

                <Gap height={15} />

                {/* Form Redeem Diamonds */}
                <>
                    <Text style={styles.sectionTitle}>Redeem Diamonds</Text>
                    <Gap height={5} />
                    <OptionGrid
                        options={nominalReedemData}
                        key={nominalReedemData.id}
                        aspectRatio={2.5/0.5}
                        columns={1}
                        columnSpacing={5}
                        onChange={(option) => setRedeem_id(option.id)}
                        flexDir="row"
                        bgColor="transparent"
                        borderColor="transparent"
                        divider={true}
                        selectedItemPattern={true}
                        renderItems={(opt) => (
                            <>
                                <View style={styles.itemTop}>
                                    <Image
                                        source={{ uri: `${bucketURL}/${opt && opt.image}` }}
                                        style={styles.image}
                                    />
                                    <Gap width={10} />
                                    <Text style={styles.itemTopText}>{opt && opt.diamonds}</Text>
                                </View>
                                <View style={styles.itemBottom}>
                                    {
                                        opt.beans >= 1000
                                        ?
                                            opt.beans/1000 >= 1000
                                            ?
                                            <CurrencyFormat
                                                value={opt.beans/1000}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                suffix={' K'}
                                                renderText={value => (
                                                <Text style={styles.itemBottomText}>
                                                    {value}
                                                </Text>)}
                                            />
                                            :
                                            <Text style={styles.itemBottomText}>
                                                {`${opt && opt.beans/1000} K`}
                                            </Text>
                                        :
                                        <Text style={styles.itemBottomText}>
                                            {opt && opt.beans}
                                        </Text>
                                    }
                                    <Gap width={5} />
                                    <Image source={BeansImage} style={styles.beansImage} />
                                </View>
                            </>
                        )}
                    />
                </>

                {/* Convert Confirmation */}
                <View style={styles.buttonWrapper}>
                    <Button title="Redeem" onPress={onSubmit} />
                    <Gap height={15} />
                </View>
            </View>
        </ScrollView>
    )
}

export default RedeemDiamonds

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
    purchaseSummary:
    {
        borderWidth: 1,
        borderColor: colors.primaryLight,
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
    itemLabel:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
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
    image:
    {
        width: 30,
        height: 30
    },
    itemTop:
    {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    itemTopText:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14)
    },
    itemBottom:
    {
        minWidth: 110,
        paddingVertical: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFE082',
        borderRadius: 50,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        marginRight: 15
    },
    itemBottomText:
    {
        color: '#FFC107',
        fontFamily: fonts.medium,
        fontSize: fontSizer(14)
    },
    beansImage: { width: 20, height: 20 },
    buttonWrapper: { paddingVertical: 50 }
})