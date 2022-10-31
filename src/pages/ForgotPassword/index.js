import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { Button, Gap, HeaderText, Input, ValidationTextError } from '../../components'
import { ForgotPasswordImage, style } from '../../assets'
import { showError, useForm } from '../../utils'
import { forgotPasswordAction } from '../../config'

const ForgotPassword = ({ navigation }) =>
{
    const [form, setForm] = useForm({
        email: '',
    })

    const dispatch      = useDispatch()
    const StatusSuccess = useSelector(state => state.ForgotPasswordReducer)
    const Validation    = useSelector(state => state.ForgotPasswordReducer.error)

    const handleSubmit = () =>
    {
        dispatch({type: 'SET_LOADING', value: true})
        
        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === true || state.isInternetReachable === true || state.isWifiEnabled === true)
            {
                dispatch(forgotPasswordAction(form, navigation))
            }
            else
            {
                showError('Please check your internet connection.')
            }
        })
    }
    
    useEffect(async() =>
    {
        await AsyncStorage.removeItem('code')
        await NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === false || state.isInternetReachable === false || state.isWifiEnabled === false)
            {
                showError('Please check your internet connection.')

                return () => showSuccess('Back online.')
            }
        })
    }, [Validation, StatusSuccess])

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.content}>
                    {/* Illustration Image */}
                    <View style={styles.image}>
                        <ForgotPasswordImage width={155} height={155} />
                    </View>

                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText title="Forgot Password" desc="Enter your registered email below to receive password instruction" />
                        <Gap height={20} />

                        <Input
                            useIcon={true}
                            iconName="mail"
                            placeholder="E-mail"
                            value={form.email}
                            onChangeText={(value) => setForm('email',value)}
                        />
                        {Validation && Validation.data.message.email &&
                            <ValidationTextError message={Validation.data.message.email} />
                        }
                        <Gap height={35} />
                    </View>

                    {/* Send Button */}
                    <View style={styles.buttonWrapper}>
                        <Button title="Send" onPress={handleSubmit} />
                        <Gap height={15} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    image:
    {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    input: { paddingHorizontal: 15 },
    buttonWrapper: { paddingHorizontal: 55 }
})