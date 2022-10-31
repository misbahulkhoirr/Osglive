import React, { useState, useEffect } from 'react'
import { Alert, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import RadioButtonRN from 'radio-buttons-react-native'
import { Button, Gap, IconCard, IconDiamond, IconReceipt, PageHeader, Input, IconClose } from '../../../components'
import { style } from '../../../assets'
import { colors, fonts, fontSizer, useForm } from '../../../utils'
import { paymentChannelListAction, topupAction } from '../../../config'

const TopUpBalanceConfirmation = ({ route, navigation }) =>
{
    const { params = 'Empty params' } = route
    const { itemNominal = 0, itemDiamonds = 0 } = params

    const [ paymentChInitial ] = useState(-1)
    const [ modalVisible, setModalVisible ] = useState(false)

    const [ form, setForm ] = useForm({
        code:'',
        amount: itemNominal
    })

    const dispatch = useDispatch()

    const paymentChannelList = useSelector(state => state.BanksReducer)
    const topupStatus = useSelector(state => state.PaymentTopUpReducer.data)
    
    const { data: paymentChannel } = paymentChannelList
    const { actions } = topupStatus

    const supportedUrl = actions && actions.mobile_web_checkout_url ? actions.mobile_web_checkout_url : 'Zonk'

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async () =>
    {
        dispatch({ type: 'SET_LOADING', value: true })

        await dispatch(topupAction(form))
        
        if(form.code != '' && form.amount != '')
        {
            await setModalVisible(true)
        }
        else
        {
            await setModalVisible(false)
        }
    }

    const paymentConfirmation = () => Linking.openURL(supportedUrl)

    useEffect(() =>
    {
        dispatch(paymentChannelListAction())
    }, [])
    
    return (
        <>
            <ScrollView
                style={style.scrollView}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.pageHeader}>
                    <PageHeader
                        title="Payment Method"
                        prevNav={true}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <View style={style.content}>
                    {/* Purchase Summary */}
                    <>
                        <Text style={styles.sectionTitle}>Details</Text>
                        <Gap height={5} />
                        <View style={styles.purchaseSummary}>
                            <View style={styles.itemWrapper}>
                                <View style={styles.groupText}>
                                    <IconReceipt size={20} />
                                    <Gap width={8} />
                                    <Text style={styles.itemLabel}>Payment amount</Text>
                                </View>
                                <CurrencyFormat
                                    value={itemNominal}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp'}
                                    renderText={value => <Text style={styles.desc}>{value}</Text>}
                                />
                            </View>
                            <View style={styles.itemWrapper}>
                                <View style={styles.groupText}>
                                    <IconCard size={20} />
                                    <Gap width={8} />
                                    <Text style={styles.itemLabel}>Credit to be received</Text>
                                </View>
                                <View style={styles.groupText}>
                                    <Text style={styles.desc}>{itemDiamonds}</Text>
                                    <Gap width={5} />
                                    <IconDiamond color="#03A9F4" size={15}/>
                                </View>
                            </View>
                        </View>
                    </>

                    <Gap height={15} />

                    {/* Payment */}
                    <>
                        <Text style={styles.sectionTitle}>Payment</Text>
                        <RadioButtonRN
                            data={paymentChannel}
                            initial={paymentChInitial}
                            selectedBtn={(e) => setForm('code', e.code)}
                            animationTypes={['shake']}
                            circleSize={14}
                            textStyle={styles.textSelect}
                            activeColor={colors.primary}
                            boxActiveBgColor={colors.primaryLight}
                            boxStyle={styles.select}
                        />
                    </>
                    <Gap height={15} />

                    {form.code === "ID_OVO" &&
                        <Input placeholder="Input phone number" keyboardType="number" />
                    }

                    {/* Pay Confirmation */}
                    <View style={styles.buttonWrapper}>
                        <Button title="Pay" onPress={onSubmit} />
                    </View>
                </View>
            </ScrollView>
            
            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() =>
                {
                    Alert.alert("Modal has been closed.")
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalHeaderWrapper}>
                            <Text style={styles.modalTitle}>Continue Payment?</Text>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <IconClose />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalText}>
                            Do you want to continue payment?
                        </Text>

                        <View style={styles.modalButtonWrapper}>
                            <Button title="Confirm" onPress={paymentConfirmation} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default TopUpBalanceConfirmation

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
        backgroundColor: colors.primaryLight,
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
    buttonWrapper: { paddingVertical: 50 },
    textSelect:
    { 
        fontFamily: fonts.regular,
        color: colors.text.primary,
    },
    select:
    {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 5
    },
    modalContainer:
    {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    modal:
    {
        width: '100%',
        borderRadius: 15,
        padding: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },
    modalHeaderWrapper:
    {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalTitle:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21)
    },
    modalText:
    {
        width: '100%',
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21),
        marginVertical: 15
    },
    modalButtonWrapper: { width: '100%' }
})