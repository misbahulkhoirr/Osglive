import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { Gap, IconAlert, IconClose, IconPlus, IconMail } from '../../atoms'
import { DefaultAvatar } from '../../../assets'
import { bucketURL, colors, fonts, fontSizer } from '../../../utils'

const ProfileModal = forwardRef(({ fullname, profilePhoto, userId, bio, status, followOnPress, messageOnPress, reportOnPress }, ref) =>
{
    const [ isVisible, setIsVisible ] = useState(false)

    useImperativeHandle(ref, () =>
    {
        return {
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false)
        }
    })
    
    const currFullName = fullname.length > 25 ? `${fullname.substring(0, 22)}...` : fullname

    useEffect(() => {

    }, [status])
    

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={profileModal.container}>
                <View style={profileModal.modal}>
                    {/* Profile Photo */}
                    <Image
                        source={
                            profilePhoto !== null
                            ? profilePhoto.length > 0 
                                ? { uri: `${bucketURL}/${profilePhoto}`}
                                : DefaultAvatar
                            : DefaultAvatar
                        }
                        style={profileModal.profilePhoto}
                    />

                    {/* Buttons on Header */}
                    <View style={profileModal.headerButtonWrapper}>
                        <TouchableOpacity onPress={reportOnPress}>
                            <IconAlert />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                            <IconClose />
                        </TouchableOpacity>
                    </View>

                    {/* Name */}
                    <View style={profileModal.headerTextWrapper}>
                        <Text style={profileModal.profileName}>{currFullName}</Text>
                        <Text style={profileModal.profileID}>ID: {userId}</Text>
                    </View>

                    {/* Bio */}
                    <View style={profileModal.content}>
                        <Text style={profileModal.label}>BIO</Text>
                        <ScrollView style={profileModal.textWrapper}>
                            <Text style={profileModal.text}>
                                {bio}
                            </Text>
                        </ScrollView>
                    </View>

                    {/* Button Group: Follow and Message */}
                    <View style={profileModal.buttonWrapper}>
                        <TouchableOpacity onPress={followOnPress}>
                            <LinearGradient
                                style={profileModal.button}
                                colors={[colors.primary, colors.secondary]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            >
                                { status === 'Following'
                                    ? <IconClose color="white" size={20} />
                                    : <IconPlus color="white" size={20} />
                                }
                                <Text style={profileModal.buttonTitle}>
                                    { status === 'Following' ? 'Unfollow' : 'Follow' }
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Gap width={10} />

                        <TouchableOpacity
                            style={profileModal.outlineButton}
                            onPress={messageOnPress}
                        >
                            <IconMail color={colors.primary} size={20} />
                            <Text style={profileModal.outlineButtonTitle}>
                                Message
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

const profileModal =
{
    container:
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
        alignItems: 'center'
    },
    profilePhoto:
    {
        width: 75,
        height: 75,
        borderRadius: 100,
        position: 'absolute',
        top: -37.5,
        alignItems: 'center'
    },
    headerButtonWrapper:
    {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTextWrapper: { alignItems: 'center' },
    profileName:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(16),
        lineHeight: fontSizer(23),
        textAlign: 'center'
    },
    profileID:
    {
        color: colors.text.tertiary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19)
    },
    content:
    {
        width: '100%',
        marginTop: 10,
        marginBottom: 25
    },
    label:
    {
        color: colors.text.tertiary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
    },
    textWrapper: { maxHeight: 80 },
    text:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
    },
    buttonWrapper:
    {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button:
    {
        minWidth: 115,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    buttonTitle:
    {
        color: '#ffffff',
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        textAlign: 'center',
        marginLeft: 5
    },
    outlineButton:
    {
        minWidth: 115,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 12,
        backgroundColor: 'transparent',
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    outlineButtonTitle:
    {
        color: colors.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        textAlign: 'center',
        marginLeft: 5
    }
}

export default ProfileModal