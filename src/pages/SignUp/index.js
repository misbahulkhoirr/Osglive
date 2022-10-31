import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RadioButtonRN from 'radio-buttons-react-native'
import NetInfo from '@react-native-community/netinfo'
import { Button, Gap, HeaderText, Input, Link, ValidationTextError } from '../../components'
import { SignUpImage, style } from '../../assets'
import { colors, fonts, fontSizer, showError, showSuccess, useForm } from '../../utils'
import { signupAction } from '../../config'

const SignUp = ({ navigation }) => 
{
    const genderData =
    [
        { label: 'Male' },
        { label: 'Female' }
    ]

    const [ genderInitial, setGenderInitial ] = useState(-1)

    const [ form, setForm ] = useForm({
        name: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        password_confirmation: ''
    })

    const dispatch  = useDispatch()
    const usersList = useSelector(state => state.RegisterReducer)

    const handlePickGender = (e) =>
    {
        let genderTextCode
        let genderNumCode

        if(e)
        {
            if(e.label === 'Male')
            {
                genderTextCode = 'L'
                genderNumCode = 1
            }
            else
            {
                genderTextCode = 'P'
                genderNumCode = 2
            }
        }

        setForm('gender', genderTextCode)
        setGenderInitial(genderNumCode)
    }

    const onRegister = async () =>
    {
        // dispatch({type: 'SET_LOADING', value: true})
        
        await setGenderInitial(-1)
        await NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === true || state.isInternetReachable === true || state.isWifiEnabled === true)
            {
                dispatch(signupAction(form, navigation))
                dispatch({ type: 'OTPREGISTER_ATTEMPT' })
            }
            else
            {
                showError('Please check your internet connection.')
            }
        })
    }

    useEffect(() =>
    {
        NetInfo.addEventListener((state) =>
        {
            if(state.isConnected === false || state.isInternetReachable === false || state.isWifiEnabled === false)
            {
                showError('Please check your internet connection.')

                return () => showSuccess('Back online.')
            }
        })
    }, [usersList])
    
    const { name, username, email, phone, password, password_confirmation } = form

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.content}>
                    {/* Sign Up Image */}
                    <View style={styles.image}>
                        <SignUpImage width={165} height={165} />
                    </View>
                    
                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText title="Sign Up" desc="Create an account" />
                        <Gap height={20} />
                        
                        <Input
                            useIcon={true}
                            iconName="mail"
                            placeholder="E-mail"
                            value={email}
                            onChangeText={(value) => setForm('email', value)}
                        />
                        {usersList.error && usersList.error.data.email && 
                            <ValidationTextError message={usersList.error.data.email} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="account"
                            placeholder="Username"
                            value={username}
                            onChangeText={(value) => setForm('username', value)}
                        />
                        {usersList.error && usersList.error.data.username && 
                            <ValidationTextError message={usersList.error.data.username} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="text"
                            placeholder="Name"
                            value={name}
                            onChangeText={(value) => setForm('name', value)}
                        />
                        {usersList.error && usersList.error.data.name && 
                            <ValidationTextError message={usersList.error.data.name} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="lock"
                            placeholder="Password"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(value) => setForm('password', value)}
                        />
                        {usersList.error && usersList.error.data.password && 
                            <ValidationTextError message={usersList.error.data.password} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="lock"
                            placeholder="Password Confirmation"
                            value={password_confirmation}
                            secureTextEntry={true}
                            onChangeText={(value) => setForm('password_confirmation', value)}
                        />
                        {usersList.error && usersList.error.data.password_confirmation && 
                            <ValidationTextError message={usersList.error.data.password_confirmation} />
                        }
                        <Gap height={15} />

                        <Input
                            useIcon={true}
                            iconName="phone"
                            placeholder="Phone"
                            value={phone}
                            onChangeText={(value) => setForm('phone', value)}
                        />
                        {usersList.error && usersList.error.data.phone && 
                            <ValidationTextError message={usersList.error.data.phone} />
                        }
                        <Gap height={15} />
                    </View>

                    <View style={styles.genderOption}>
                        <Text style={styles.genderText}>Gender</Text>

                        <RadioButtonRN
                            data={genderData}
                            initial={genderInitial}
                            selectedBtn={(e) => handlePickGender(e)}
                            animationTypes={['shake']}
                            circleSize={14}
                            textStyle={styles.textSelect}
                            activeColor={colors.primary}
                            boxActiveBgColor={colors.primaryLight}
                            boxStyle={styles.select}
                            style={{ flexDirection: 'row' }}
                        />
                        {usersList.error && usersList.error.data.gender && 
                            <ValidationTextError message={usersList.error.data.gender} />
                        }
                        <Gap height={35} />
                    </View>

                    {/* Sign Up Button */}
                    <View style={styles.button}>
                        <Button title="Sign Up" onPress={onRegister} />
                        <Gap height={15} />
                    </View>

                    {/* Link to Login Page */}
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>Already have an account? </Text>
                        <Link title="Login" onPress={() => navigation.navigate('Login')} />
                        <Gap height={35} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    image:
    {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    input: { paddingHorizontal: 15 },
    button: { paddingHorizontal: 55 },
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
    genderOption: { marginHorizontal: 10 },
    genderText:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        paddingLeft: 10
    },
    textSelect:
    { 
        fontFamily: fonts.regular,
        color: colors.text.secondary,
        marginLeft: 10
    },
    select:
    {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        flex: 1,
        marginHorizontal: 5
    }
})