import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'
import { Button, Gap, HeaderText, Input, ValidationTextError } from '../../components'
import { ResetPasswordImage, style } from '../../assets'
import { showError, showSuccess, useForm } from '../../utils'
import { resetPasswordAction } from '../../config'

const ResetPassword = ({route, navigation }) =>
{    
    const [form, setForm] = useForm({
        code: '',
        new_password: '',
        password_confirmation: ''
    });

    const dispatch = useDispatch()

    const StatusSuccess = useSelector(state => state.ResetPasswordReducer.data)
    const Validation    = useSelector(state => state.ResetPasswordReducer.error)
    const { params = 'Empty params ResetPassword' } = route
    const { code } = params
    const handleOnSubmit = () =>
    {
        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === true || state.isInternetReachable === true || state.isWifiEnabled === true)
            {
                dispatch(resetPasswordAction(form, navigation))
            }
            else
            {
                showError('Please check your internet connection.')
            }
        })   
    }

    useEffect(() =>
    {
        setForm('code',code)

        if(StatusSuccess.message === 'Password changed successfully')
        {
            showSuccess('Successfully reset password.')
        }

        if(StatusSuccess ? StatusSuccess.success : null)
        {
            return () => dispatch({ type:'RESET_PASSWORD_ATTEMPT' })
        }

        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === false || state.isInternetReachable === false || state.isWifiEnabled === false)
            {
                showError('Please check your internet connection.')

                return () => showSuccess('Back online.')
            }
        })
    }, [StatusSuccess])

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.content}>
                    {/* Illustration Image */}
                    <View style={styles.image}>
                        <ResetPasswordImage width={155} height={155} />
                    </View>
                    
                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText title="Create New Password" desc="Your new password must be different from previous password" />
                        <Gap height={20} />
                        
                        <Input
                            useIcon={true}
                            iconName="lock"
                            placeholder="Password"
                            value={form.new_password}
                            secureTextEntry={true}
                            onChangeText={(value) => setForm('new_password', value)}
                        />
                        {Validation && Validation.data.message.new_password &&
                            <ValidationTextError message={Validation.data.message.new_password} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="lock"
                            placeholder="Confirm Password"
                            value={form.password_confirmation}
                            secureTextEntry={true}
                            onChangeText={(value) => setForm('password_confirmation', value)}
                        />
                        {Validation && Validation.data.message.password_confirmation &&
                            <ValidationTextError message={Validation.data.message.password_confirmation} />
                        }
                        <Gap height={35} />
                    </View>

                    {/* Reset Password Button */}
                    <View style={styles.buttonWrapper}>
                        <Button title="Submit" onPress={handleOnSubmit} />
                        <Gap height={15} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ResetPassword

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