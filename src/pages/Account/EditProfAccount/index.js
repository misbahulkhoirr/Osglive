import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { launchImageLibrary } from 'react-native-image-picker'
import { Button, Gap, IconPencil, Input, PageHeader, TextArea, ValidationTextError } from '../../../components'
import { DefaultAvatar, style } from '../../../assets'
import { bucketURL, colors, fonts, fontSizer, showSuccess, tokenValidation } from '../../../utils'
import { getUserDetailAction, postUpdateUserAction } from '../../../config'

const EditProfAccount = ({ navigation }) =>
{
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ name, setName ] = useState('')
    const [ old_password, setOld_Password ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ password_confirmation, setPassword_confirmation ] = useState('')
    const [ bio, setBio ] = useState('')
    const [ photo, setPhoto ] = useState('')

    const dispatch = useDispatch()
    const userList = useSelector(state => state.GetUserReducer)

    const { data: userData } = userList

    const handleLoadUser = () =>
    {
        dispatch(getUserDetailAction()).then(() =>
        {
            if(userList.error)
            {
                console.log('Handle Load User:', userList.error);
            }
            else
            {
                setUsername(userData.username)
                setEmail(userData.email)
                setPhone(userData.phone)
                setName(userData.name)
                setBio(userData.bio)
                setPhoto(userData.photo)
            }
        })
    }

    const form = {
        username,
        name,
        email,
        bio,
        phone,
        password,
        password_confirmation,
        old_password,
        photo
    }

    const form2 = {
        username,
        name,
        email,
        bio,
        phone,
        password,
        password_confirmation,
        old_password
    }

    const editUser = useSelector(state => state.EditUserReducer)

    const onSubmitEdit = () =>
    {
        if(userData.photo != photo)
        {
            dispatch(postUpdateUserAction(form, navigation)).then(() => console.log('Edit User', editUser))
        }
        else
        {
            dispatch(postUpdateUserAction(form2, navigation)).then(() => console.log('Edit User Res', editUser))
        }
    }
    const handleChoosePhoto = () =>
    {
        const options = {
            mediaType: 'photo',
            saveToPhotos: true,
            quality: 0.5
        }
      
        launchImageLibrary(options, response =>
        {
            if(response)
            {
                if(response.didCancel || response.errorCode)
                {
                    setPhoto(photo)
                    console.log('Error:', response.errorMessage)
                }
                else setPhoto(response.assets[0].uri)
            }
        })
    }

    useEffect(() =>
    {
        tokenValidation(null, navigation)
        handleLoadUser()

        if(editUser.data && editUser.data.message)
        {
            showSuccess('Edit profile berhasil.')

            return () => dispatch({ type: 'EDIT_USER_ATTEMPT' })
        }

        if(editUser.error) return () => dispatch({ type: 'EDIT_USER_ATTEMPT' })
    }, [editUser.error, editUser.data])
    
    return (
        <ScrollView
            style={style.scrollView}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.pageHeaderWrapper}>
                <PageHeader
                    title="Edit Profile"
                    prevNav={true}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Gap height={10} />

            <View style={style.content}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.editAvatarWrapper} onPress={handleChoosePhoto}>
                        <Image
                            source={
                                photo
                                    ? userData.photo != photo
                                        ? { uri: photo }
                                        : { uri: `${bucketURL}/${photo}` }
                                    : DefaultAvatar
                            }
                            style={styles.avatar}
                        />
                        <View style={styles.pencilIcon}>
                            <IconPencil size={15} />
                        </View>
                    </TouchableOpacity>

                    <Gap width={10} />

                    <View>
                        <Text style={styles.headerText}>{userData.name}</Text>
                        <Text style={styles.userIdText}>ID: {userData.id}</Text>
                    </View>
                </View>

                <Gap height={25} />

                {/* Personal Information Form */}
                <View style={styles.form}>
                    <Text style={styles.formHeader}>Personal Information</Text>
                    <Gap height={15} />
                    <Input
                        useIcon={true}
                        iconName="account"
                        placeholder="Username"
                        isDisableEdit={true}
                        editable={false}
                        selectTextOnFocus={false}
                        defaultValue={userData.username}
                    />
                    <Gap height={15} />

                    <Input
                        onChangeText={email => setEmail(email)}
                        useIcon={true}
                        iconName="mail"
                        placeholder="E-mail"
                        defaultValue={userData.email}
                    />
                    {editUser.error && editUser.error.email &&
                        <ValidationTextError message={editUser.error.email} />
                    }
                    <Gap height={15} />

                    <Input
                        onChangeText={phone => setPhone(phone)}
                        useIcon={true}
                        iconName="phone"
                        placeholder="Phone"
                        keyboardType="numeric"
                        defaultValue={'' + userData.phone}
                    />
                    {editUser.error && editUser.error.phone &&
                        <ValidationTextError message={editUser.error.phone} />
                    }
                    <Gap height={15} />

                    <Input
                        onChangeText={name => setName(name)}
                        useIcon={true}
                        iconName="text"
                        placeholder="Name"
                        defaultValue={userData.name}
                    />
                    {editUser.error && editUser.error.name &&
                        <ValidationTextError message={editUser.error.name} />
                    }
                    <Gap height={15} />

                    {userData.google_id === null &&
                        <>
                            <Input
                                defaultValue={old_password}
                                onChangeText={old_password => setOld_Password(old_password)}
                                useIcon={true}
                                iconName="lock"
                                placeholder="Old Password"
                                secureTextEntry={true}
                            />
                            {editUser.error && editUser.error.message &&
                                <ValidationTextError message={editUser.error.message} />
                            }
                            <Gap height={15} />
                        </>
                    }

                    {userData.google_id === null &&
                        <>
                            <Input
                                defaultValue={password}
                                onChangeText={password => setPassword(password)}
                                useIcon={true}
                                iconName="lock"
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                            {editUser.error && editUser.error.password &&
                                <ValidationTextError message={editUser.error.password} />
                            }
                            <Gap height={15} />
                        </>
                    }

                    {userData.google_id === null &&
                        <>
                            <Input
                                defaultValue={password_confirmation}
                                onChangeText={password_confirmation => setPassword_confirmation(password_confirmation)}
                                useIcon={true}
                                iconName="lock"
                                placeholder="Password Confirmation"
                                secureTextEntry={true}
                            />
                            {editUser.error && editUser.error.password_confirmation &&
                                <ValidationTextError message={editUser.error.password_confirmation} />
                            }
                            <Gap height={15} />
                        </>
                    }

                    <TextArea
                        onChangeText={bio => setBio(bio)}
                        placeholder="Bio"
                        defaultValue={'' + userData.bio}
                    />
                    <Gap height={35} />

                    <Button title="Update" onPress={onSubmitEdit} />
                    <Gap height={35} />
                </View>
            </View>
        </ScrollView>
    )
}

export default EditProfAccount

const styles = StyleSheet.create({
    pageHeaderWrapper: { elevation: 8, shadowColor: 0 },
    header:
    {
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        elevation: 5
    },
    editAvatarWrapper: { padding: 10 },
    avatar:
    {
        width: 55,
        height: 55,
        borderRadius: 55 / 2
    },
    pencilIcon:
    {
        position: 'absolute',
        bottom: 10,
        right: 5,
        padding: 5,
        borderRadius: 100,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        elevation: 5
    },
    headerText:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(15),
        lineHeight: fontSizer(22),
        paddingBottom: 5
    },
    userIdText:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12)
    },
    form: { marginHorizontal: 15 },
    formHeader:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12)
    }
})