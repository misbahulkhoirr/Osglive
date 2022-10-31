import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Gap, HeaderText } from '../../components'
import { WelcomeImage } from '../../assets'
import { colors, fonts, fontSizer } from '../../utils'
import { loginGoogleAction } from '../../config'

const Welcome = ({ navigation }) =>
{
    const [ infouser, setInfouser ] = useState({})
    const [ password, setPassword ] = useState('123456dummy')

    const dispatch  = useDispatch()

    const usersListGoogle = useSelector(state => state.LoginGoogleReducer)

    const signInWithGoogle = async () =>
    {
        try
        {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            await setInfouser(userInfo)
            await dispatch(loginGoogleAction(userInfo.user, password, navigation))
        }
        catch(error)
        {
            if(error.code === statusCodes.SIGN_IN_CANCELLED)
            {
                console.log('user cancelled the login flow')
            }
            else if(error.code === statusCodes.IN_PROGRESS)
            {
                console.log('operation (e.g. sign in) is in progress already')
            }
            else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
            {
                console.log('play services not available or outdated')
            }
            else
            {
                console.log('error:', error)
                console.log('some other error happened')
            }
        }
    }

    const isSignedIn = async () =>
    {
        const isSignedIn = await GoogleSignin.isSignedIn()
        
        if(!!isSignedIn)
        {
            getCurrentUserInfo()
        }
        else
        {
            console.log('Please login.')
        }
    }

    const getCurrentUserInfo = async () =>
    {
        try
        {
            const userInfo = await GoogleSignin.signInSilently()
            console.log('Edit:', userInfo)
        }
        catch(error)
        {
            if(error.code === statusCodes.SIGN_IN_REQUIRED)
            {
                console.log('user has not signed in yet')
            }
            else
            {
                console.log('some other error')
            }
        }
    }

    const signOut = async () =>
    {
        try
        {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            console.log('Logout success.')
        }
        catch(error)
        {
            console.error(error)
        }
    }

    useEffect(() =>
    {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
            ClientId : '557964119934-r43cqgrmn5rhr0n473pju18ftshjuq2b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        })

        isSignedIn()

        if(usersListGoogle.error && usersListGoogle.error.data.message)
        {
            signOut()
            showError("Email sudah terdaftar.")
            dispatch({ type:'LOGIN_GOOGLE_ATTEMPT' })
        }
    }, [usersListGoogle.error])

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Gap height={15} />
                    {/* Welcome Image */}
                    <View style={styles.image}>
                        <WelcomeImage width={215} height={215} />
                    </View>
                    <Gap height={15} />
                </View>

                <View>
                    {/* Header Text */}
                    <View style={styles.headerText}>
                        <HeaderText title="Welcome" desc="Login or create an account to enjoy all features" />
                        <Gap height={15} />
                    </View>

                    {/* Button Group */}
                    <View style={styles.buttonGroup}>
                        <Button
                            title="Login"
                            onPress={() => navigation.navigate('Login')}
                        />
                        <Gap height={15} />
                        <Button
                            title="Sign Up"
                            outlined={true}
                            onPress={() => navigation.navigate('SignUp')}
                        />
                        <Gap height={5} />

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>OR</Text>
                            <View style={styles.backgroundLine} />
                        </View>
                        <Gap height={10} />

                        {/* Sign in With Google */}
                        <GoogleSigninButton
                            style={{ width: '100%', height: 55 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={signInWithGoogle}
                        />
                        <Gap height={10} />

                        <View style={styles.textLinkWrapper}>
                            <TouchableOpacity onPress={signOut}>
                                <Text style={styles.textLink}>SignOut</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    page:
    {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'space-between'
    },
    image:
    {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    headerText: { paddingHorizontal: 15 },
    buttonGroup: { paddingHorizontal: 15 },
    textWrapper:
    {
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    textLinkWrapper: { alignItems: 'center' },
    text:
    {
        width: 35,
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21),
        backgroundColor: 'white',
        textAlign: 'center',
        marginLeft: '45%',
        zIndex: 1
    },
    textLink:
    {
        color: colors.text.secondary,
        textDecorationLine: 'underline',
        fontFamily: fonts.regular
    },
    backgroundLine:
    {
        marginTop: -15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary
    }
})