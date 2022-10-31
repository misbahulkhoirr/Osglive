import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'
import { Button, Gap, HeaderText, Link, OTPInput, ValidationTextError } from '../../components'
import { style, VerifyEmailImage } from '../../assets'
import { colors, fonts, fontSizer, useForm, storeData, showError, showSuccess } from '../../utils'
import { forgotPasswordAction, OTPAction, OTPSignupAction, resendRegistOTPAction } from '../../config'

const VerifyAccount = ({ route, navigation }) =>
{
    const [form, setForm] = useForm({
        otp: '',
        email: ''
    })
    
    const { params = 'Empty params VerifyEmail' } = route
    const { itemEmail, fromPage } = params
    
    const dispatch   = useDispatch()
    const Validation = useSelector(state => fromPage === 'SignUp' ? state.OTPRegisterReducer.error : state.OTPReducer.error)
    const OTPSuccess = useSelector(state => fromPage === 'SignUp' ? state.OTPRegisterReducer.data : state.OTPReducer.data)

    const handleSubmit = () =>
    {
        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === true || state.isInternetReachable === true || state.isWifiEnabled === true)
            {
                if(fromPage === 'SignUp') dispatch(OTPSignupAction(form, navigation))
                if(fromPage === 'ForgotPassword') dispatch(OTPAction(form, navigation))
            }
            else
            {
                showError('Please check your internet connection.')
            }
        })
    }

    const handleResendOTP = () =>
    {
        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === true || state.isInternetReachable === true || state.isWifiEnabled === true)
            {   
                if(fromPage === 'SignUp') dispatch(resendRegistOTPAction(form, navigation))
                if(fromPage === 'ForgotPassword') dispatch(forgotPasswordAction(form, navigation))

                // dispatch(forgotPasswordAction(form, navigation))
            }
            else
            {
                showError('Please check your internet connection.')
            }
        })
    }

    useEffect(() =>
    {
        setForm('email', itemEmail)

        if(OTPSuccess.message === 'Account successfully activated.')
        {
            showSuccess('Registration succeed.')
        }

        if(OTPSuccess.message === 'Success')
        {
            storeData('code', OTPSuccess.code)
        }
        else if(Validation ? Validation.data : null)
        {
            return () => dispatch({ type: 'OTP_ATTEMPT' })
        }
        
        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === false || state.isInternetReachable === false || state.isWifiEnabled === false)
            {
                showError('Please check your internet connection.')

                return () => showSuccess('Back online.')
            }
        })
    }, [OTPSuccess, Validation])

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.content}>
                    {/* Illustration Image */}
                    <View style={styles.image}>
                        <VerifyEmailImage width={155} height={155} />
                    </View>

                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText title="Verify Your Account" desc={`Please enter the 4 digit code sent to ${itemEmail}`} />
                        <Gap height={20} />

                        <OTPInput
                            onLastInputFilled={(value) => setForm('otp',value)}
                        />
                        {Validation && Validation.data && 
                            <ValidationTextError message={Validation.data.message ? Validation.data.message : Validation.data.otp} />
                        }
                        <Gap height={35} />
                    </View>

                    {/* Send Button */}
                    <View style={styles.buttonWrapper}>
                        <Button title="Confirm" onPress={handleSubmit} />
                        <Gap height={15} />
                    </View>

                    {/* Link to Resend OTP */}
                    <View style={styles.link}>
                        <Text style={styles.text}>Didn't receive the code? </Text>
                        <TouchableOpacity>
                            <Link title="Resend OTP" onPress={handleResendOTP} />
                        </TouchableOpacity>
                        <Gap height={35} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default VerifyAccount

const styles = StyleSheet.create({
    image:
    {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    input: { paddingHorizontal: 15 },
    buttonWrapper: { paddingHorizontal: 55 },
    link:
    {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular
    },
    textInputWrapper:
    { 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(16),
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
        flex: 1
    }
})