import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { Button, Gap, HeaderText, Input, Link, ValidationTextError } from '../../components'
import { LogoImage, style } from '../../assets'
import { colors, fonts, showError, showSuccess, useForm } from '../../utils'
import { loginAction } from '../../config'

const Login = ({ navigation }) =>
{
    const [form, setForm] = useForm({
        email: 'administrator@gmail.com',
        password: '12345678',
    })

    const dispatch  = useDispatch()
    const usersList = useSelector(state => state.LoginReducer)

    const onLogin = async () =>
    {
        await NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === true || state.isInternetReachable === true || state.isWifiEnabled === true)
            {
                dispatch(loginAction(form, navigation))
            }
            else
            {
                showError('Please check your internet connection.')
            }
        })
    }

    const onSignUp = () =>
    {
        setForm('reset')
        dispatch({ type:'LOGIN_ATTEMPT' })
        dispatch({ type:'REGISTER_ATTEMPT' })
        navigation.navigate('SignUp')
    }

    const forgotPassword = () =>
    {
        setForm('reset')
        dispatch({ type:'LOGIN_ATTEMPT' })
        dispatch({ type: 'FORGOT_PASSWORD_ATTEMPT' })
        navigation.navigate('ForgotPassword')
    }

    useEffect(() =>
    {
        AsyncStorage.removeItem('code')

        if(usersList && usersList.error ? usersList.error.data.error : null)
        {
            showError(usersList && usersList.error ? usersList.error.data.error : null)
        }

        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === false || state.isInternetReachable === false || state.isWifiEnabled === false)
            {
                // showError('Please check your internet connection.')

                return () => showSuccess('Back online.')
            }
        })
    }, [usersList])
    console.log('usersList',usersList)
    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.content}>
                    {/* Login Image */}
                    <View style={styles.image}>
                        <Image source={LogoImage} style={styles.imageContent} />
                    </View>
                    
                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText title="Login" desc="Watch or cast your own live stream" />
                        <Gap height={20} />
                        
                        <Input
                            useIcon={true}
                            iconName="mail"
                            placeholder="E-mail"
                            value={form.email}
                            onChangeText={(value) => setForm('email',value)}
                        />
                        {usersList.error && usersList.error.data.email && 
                            <ValidationTextError message={usersList.error.data.email} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="lock"
                            placeholder="Password"
                            secureTextEntry={true}
                            value={form.password}
                            onChangeText={(value) => setForm('password',value)}
                        />
                        {usersList.error && usersList.error.data.password &&
                            <ValidationTextError message={usersList.error.data.password} />
                        }
                        <Gap height={15} />

                        <View style={styles.inlineContainer}>
                            <TouchableOpacity onPress={forgotPassword}>
                                <Text style={styles.textLink} >Forgot Password</Text>
                            </TouchableOpacity>
                        </View>
                        <Gap height={35} />
                    </View>

                    {/* Login Button */}
                    <View style={styles.buttonWrapper}>
                        <Button title="Login" onPress={onLogin} />
                        <Gap height={15} />
                    </View>

                    {/* Link to Sign Up Page */}
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>Don't have an account yet? </Text>
                        <Link title="Sign Up" onPress={onSignUp} />
                        <Gap height={30} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    image:
    {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    imageContent:
    {
        width: 155,
        height: 155
    },
    input: { paddingHorizontal: 15 },
    buttonWrapper: { paddingHorizontal: 55 },
    textWrapper:
    {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular
    },
    textLink:
    {
        color: colors.text.secondary,
        textDecorationLine: 'underline',
        fontFamily: fonts.regular
    },
    checkboxContainer:
    {
        flexDirection: 'row'
    },
    inlineContainer:
    {
        flexDirection: 'row',
        alignItems: 'center'
    }
})