import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { Gap, IconClose, IconLive, IconPlus, ViewerChatbox, ViewerCount } from '../../../components'
import { DefaultAvatar } from '../../../assets'
import { bucketURL, colors, fonts, fontSizer } from '../../../utils'

const WatchLiveMainLayer = forwardRef(({ streamerBadgeInfo, chatbox, followingStatus }, ref) =>
{
    const [ isVisible, setIsVisible ] = useState(true)

    useImperativeHandle(ref, () =>
    {
        return {
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false),
            isVisible
        }
    })

    const currFullName = streamerBadgeInfo.name.length > 15 ? `${streamerBadgeInfo.name.substring(0, 12)}...` : streamerBadgeInfo.name

    useEffect(() =>
    {

    }, [followingStatus])

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            hasBackdrop={false}
            onBackButtonPress={streamerBadgeInfo.buttonExitLive}
            style={{ margin: 0 }}
        >
            <View style={styles.topbar}>
                <View style={styles.topbarItemWrapper}>
                    <TouchableOpacity
                        style={styles.streamerBadge}
                        onPress={streamerBadgeInfo.buttonProfileDetail}
                    >
                        <View style={styles.profilePhotoWrapper}>
                            <Image
                                source={
                                    streamerBadgeInfo.profilePhoto !== null
                                    ? streamerBadgeInfo.profilePhoto.length > 0 
                                        ? { uri: `${bucketURL}/${streamerBadgeInfo.profilePhoto}`}
                                        : DefaultAvatar
                                    : DefaultAvatar
                                }
                                style={styles.profilePhoto}
                            />
                            <View style={styles.textWrapper}>
                                <Text style={styles.name}>
                                    {currFullName}
                                </Text>
                                <Text style={styles.userId}>
                                    ID: {streamerBadgeInfo.userId}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.followButton(followingStatus)}
                            onPress={streamerBadgeInfo.buttonFollow}
                            disabled={followingStatus === 'Following' ? true : false}
                        >
                            <IconPlus size={22} color="#ffffff" />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={streamerBadgeInfo.buttonExitLive}>
                        <IconClose color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <Gap height={10} />

                <View style={styles.topbarItemWrapper}>
                    <View style={styles.liveLabelWrapper}>
                        <IconLive filled={true} color="#ffffff" size={15} />
                        <Text style={styles.liveLabel}>Live</Text>
                    </View>
                    <ViewerCount data={streamerBadgeInfo.viewCount} bgColor="white" />
                </View>
            </View>

            {/* Chat Box */}
            <ViewerChatbox
                socket={chatbox.socket}
                getUserLive={chatbox.getUserLive}
                userId={chatbox.userId}
                giftButtonOnPress={chatbox.giftButtonOnPress}
            />
        </Modal>
    )
})

export default WatchLiveMainLayer

const styles = StyleSheet.create({
    topbar:
    {
        width: '100%',
        padding: 15,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0
    },
    topbarItemWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    streamerBadge:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 180,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.35)'
    },
    profilePhotoWrapper:
    {
        flexDirection: 'row',
        marginVertical: 5,
        marginLeft: 5
    },
    profilePhoto:
    {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    textWrapper:
    {
        flexDirection: 'column',
        marginLeft: 5
    },
    name:
    {
        color: '#ffffff',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19)
    },
    userId:
    {
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: fonts.regular,
        fontSize: fontSizer(11),
        lineHeight: fontSizer(18),
        marginTop: -5
    },
    followButton: status => ({
        borderRadius: 100,
        padding: 2,
        backgroundColor: status === 'Following' ? colors.disable : '#FFA726',
        marginRight: 10
    }),
    liveLabelWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#EC407A',
        marginLeft: 5
    },
    liveLabel:
    {
        color: '#ffffff',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
        marginLeft: 10
    }
})