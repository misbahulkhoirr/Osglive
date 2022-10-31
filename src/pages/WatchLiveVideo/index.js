import React, { Component } from 'react'
import { View, Alert, AppState } from 'react-native'
import { NodePlayerView } from 'react-native-nodemediaclient'
import GestureRecognizer from 'react-native-swipe-gestures'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-community/async-storage'
import { GiftPopupImage, GiftsModal, LiveListLayer, ProfileModal,WatchLiveMainLayer } from '../../components'
import { DefaultAvatar, LivingThings } from '../../assets'
import { tokenValidation } from '../../utils'
import {
    followStreamerAction,
    getGiftsAction,
    getRoomsAction,
    postGiftAction,
    roomDetailAction,
    stopWatchingAction,
    unfollowStreamerAction,
    getUserDetailAction,
} from '../../config'

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})

class WatchLiveVideo extends Component
{
    constructor(props)
    {
        super(props)
    
        this.state =
        {
            isLive: false,
            isLove: false,
            username: null,
            gestureName: 'none',
            backgroundColor: '#fff',
            followersData: 
            [
                // Dummy data
                { id: 1, photo: DefaultAvatar , key: 1},
                { id: 2, photo: DefaultAvatar , key: 2},
                { id: 3, photo: DefaultAvatar , key: 3},
                { id: 4, photo: DefaultAvatar , key: 4},
                { id: 5, photo: DefaultAvatar , key: 5},
                { id: 6, photo: DefaultAvatar , key: 6},
                { id: 7, photo: DefaultAvatar , key: 7},
                { id: 8, photo: DefaultAvatar , key: 8}
            ],
            status: '',
            Gift: {},
            giftPopupImage: '',
            namestreamer: '',
            user_id_streamer: '',
            viewCount: null,
            appState: AppState.currentState,
        }

        this.modalRef = React.createRef(null)
        this.giftModalRef = React.createRef(null)
        this.giftPopupRef = React.createRef(null)
        this.mainLayerRef = React.createRef(null)
        this.liveListLayerRef = React.createRef(null)
    }

    onSwipeUp = () =>
    {
        if(this.mainLayerRef.current.isVisible === true && this.liveListLayerRef.current.isVisible === false)
        {
            
            console.log('Swipe Up Berhasil!')
            const { navigation, route } = this.props
            const { params } = route

            const roomId = params.id

            const currentRoomId = params.listRoom.findIndex(x => x.id === params.id)
            const totalRoom     = params.listRoom.length
            const nextRoomId    = currentRoomId + 1
            
            if(nextRoomId <= (totalRoom - 1))
            {
                this.vp.stop()

                this.setState({
                    isLive: false,
                    isLove: false,
                })

                socket.emit("LeaveRoom", roomId)
                setTimeout(() =>
                {
                    const nextRoom = params.listRoom[nextRoomId]
                    setTimeout(async() => {
                        await getRoomsAction()
                        await this.setState({
                            status: nextRoom.status
                        })
                        await console.log('BeforeparamsSwipeUp:', nextRoom.name)
                        await console.log('BeforeparamsSwipeUp:', nextRoom.status)
                        await navigation.navigate('WatchLiveVideo',
                        {
                            id: nextRoom.id,
                            userid: nextRoom.user_id,
                            name: nextRoom.name,
                            bio: nextRoom.bio,
                            status:nextRoom.status,
                            photo: nextRoom.photo,
                            listRoom: params.listRoom
                        })
                        console.log('BeforeparamsSwipeUp:', nextRoom)
                    }, 500)
                    socket.emit("joinRoom",
                    {
                        username: this.state.username,
                        room_user_id: nextRoom.user_id,
                        roomId: roomId
                    })
                    
                }, 500)
            }
            
            console.log('AfterparamsSwipeUp:', params.status)
        }
        AsyncStorage.removeItem('contacts')
    }

    onSwipeDown = () =>
    {
        if(this.mainLayerRef.current.isVisible === true && this.liveListLayerRef.current.isVisible === false)
        {
            console.log('Swipe Down Berhasil!')
            const { navigation, route } = this.props
            const { params } = route

            const roomId = params.id

            const currentRoomId = params.listRoom.findIndex(x => x.id === params.id)
            const prevRoomId    = currentRoomId - 1
            
            if(prevRoomId >= 0)
            {
                this.vp.stop()

                this.setState({
                    isLive: false,
                    isLove: false,
                })
                
                socket.emit("LeaveRoom", roomId)
                setTimeout(() =>
                {
                    
                    const prevRoom = params.listRoom[prevRoomId]
                    setTimeout(async() => {
                        await getRoomsAction()
                        await this.setState({
                            status: prevRoom.status
                        })
                        await console.log('BeforeparamsSwipeDown:', prevRoom.name)
                        await console.log('BeforeparamsSwipeDown:', prevRoom.status)
                        await navigation.navigate('WatchLiveVideo',
                        {
                            id: prevRoom.id,
                            userid: prevRoom.user_id,
                            name: prevRoom.name,
                            bio: prevRoom.bio,
                            status: prevRoom.status,
                            listRoom: params.listRoom,
                            photo: prevRoom.photo
                        })
                    }, 500)
                    console.log('BeforeparamsSwipeDown:', prevRoom)
                    socket.emit("joinRoom",
                    {
                        username: this.state.username,
                        room_user_id: prevRoom.user_id,
                        roomId: roomId
                    })
                    
                }, 500)
            }
            console.log('AfterparamsSwipeDown:', params.status)
        }
        AsyncStorage.removeItem('contacts')
    }

    onSwipeRight = () =>
    {
        if(this.mainLayerRef.current.isVisible === true && this.liveListLayerRef.current.isVisible === false)
        {
            this.mainLayerRef.current.hide()
        }

        if(this.mainLayerRef.current.isVisible === true && this.liveListLayerRef.current.isVisible === true)
        {
            this.liveListLayerRef.current.hide()
        }
    }

    onSwipeLeft = () =>
    {
        if(this.mainLayerRef.current.isVisible === false && this.liveListLayerRef.current.isVisible === false)
        {
            this.mainLayerRef.current.show()
        }
        if(this.mainLayerRef.current.isVisible === true && this.liveListLayerRef.current.isVisible === false)
        {
            this.liveListLayerRef.current.show()
        }
    }

    onSubmitFollow = () =>
    {
        const { followStreamerAction, unfollowStreamerAction, roomDetailData, route, getRoomsAction} = this.props
        const { params } = route
        const { user_id_streamer, status } = this.state
        if(status === 'Following')
        {
            unfollowStreamerAction(user_id_streamer ? user_id_streamer : roomDetailData).then(() =>
            {
                this.setState({status: 'Not Following'})
                getRoomsAction()
            })
        }
        else if(status === 'Not Following')
        {
            followStreamerAction(user_id_streamer ? user_id_streamer : roomDetailData).then(() =>
            {
                this.setState({status: 'Following'})
                getRoomsAction()
            })
        }
    }

    onSubmitExitLive = () =>
    {
        const { navigation, stopWatchingAction, route } = this.props
        const { params } = route

        const roomId = params.id

        Alert.alert("Exit", "Are you sure you want to exit from this live?",
        [
            {
                text: "Cancel",
                onPress: () => this.mainLayerRef.current.show(),
                style: "cancel"
            },
            {
                text: "YES",
                onPress: () => 
                {
                    stopWatchingAction()
                                       
                    this.vp.stop()
                    
                    this.setState({
                        isLive: false,
                        isLove: false
                    })
                    
                    socket.emit("LeaveRoom", roomId)
                    navigation.goBack()
                },
            }
        ])
        AsyncStorage.removeItem('contacts')
        this.mainLayerRef.current.hide()
        // return true
    }

    sendGift = (item) =>
    {
        const { postGiftAction, route } = this.props
        const { params } = route

        const roomId = params.id

        this.setState({ giftPopupImage: item.image })

        postGiftAction(item.id, roomId).then((res) => 
        {
            this.giftModalRef.current.hide()
            this.giftPopupRef.current.show()
        
            setTimeout(() =>
            {
                this.giftPopupRef.current.hide()
            }, 1000)
        })
    }

    goToDirectMessage = () =>
    {
        const { route, navigation } = this.props
        const { params } = route

        this.modalRef.current.hide()
        this.mainLayerRef.current.hide()

        setTimeout(() =>
        {
            navigation.navigate('Chatting',
            {
                username: params.name,
                photo: params.photo,
                userId: params.userid
            })
        }, 500)
    }

    componentDidMount()
    {
        const { getGiftsAction, navigation, roomDetailAction, getUserDetailAction, route, getRoomsAction } = this.props
        const { params } = route

        getUserDetailAction().then((res) =>
        {
            this.setState({ username: res && res.data.name })
            const { username } = this.state

            socket.emit("joinRoom",
            {
                username: username,
                room_user_id: params.userid,
                roomId: params.id
            })
        })

        socket.on('countUserOnline', (data) =>
        {
            this.setState({ viewCount: data })
        })

        const room_id = params.id
        roomDetailAction(room_id)

        if(!this.state.status){
            this.setState({ status: params.status })
        }
        
        getGiftsAction()
        tokenValidation(null, navigation)

        this.appStateSubscription = AppState.addEventListener(
            "change",
            nextAppState => {
            if (this.state.appState.match(/inactive|background/) && nextAppState === "background" || 'inactive') 
            {
                console.log('nextAppState',nextAppState)
                if(nextAppState === 'background'){
                    this.vp.stop()
                    setTimeout(() => {
                        stopWatchingAction()
                            
                        this.setState({
                            isLive: false,
                            isLove: false
                        })
                        
                        socket.emit("LeaveRoom", params.id)
                    },10000)
                }else if(nextAppState === 'active'){
                    this.vp.start()
                }
                // stopWatchingAction()
                //     this.vp.stop()
                    
                //     this.setState({
                //         isLive: false,
                //         isLove: false
                //     })
                    
                //     socket.emit("LeaveRoom", params.id)
            }
                this.setState({ appState: nextAppState });
            }
          );
    }
    

    componentDidUpdate(prevProps, prevState)
    {
        const { postGiftData } = this.props 
        
        if(postGiftData !== prevProps.postGiftData)
        {
            this.setState({ Gift: postGiftData.gift_image })
        }

        if(postGiftData && postGiftData.gift_image)
        {
            const Gift = postGiftData.gift_image
            socket.emit('sendingGift', `{{${Gift}}}`, Gift)
        }
    }

    componentWillUnmount()
    {
        console.log("Component unmounted.")
    }

    render()
    {
        const { getGiftsData, route, navigation } = this.props
        const { params } = route
        const { viewCount } = this.state
        // console.log('RoomsDetail', roomDetailData.status)
        // console.log('paramsStatus', params)
        // console.log('Status', this.state.status)
        // // console.log('user_id_streamer', this.state.user_id_streamer)
        // console.log('Route', route)

        const testData = [
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings },
            { name: 'Test User', roomName: 'Main Game Online', roomCover: LivingThings }
        ]

        return (
            <View>
                <GestureRecognizer
                    onSwipeUp={(state) => this.onSwipeUp()}
                    onSwipeDown={(state) => this.onSwipeDown()}
                    onSwipeRight={this.onSwipeRight}
                    onSwipeLeft={this.onSwipeLeft}
                    decelerationRate="fast"
                    vertical
                    config={{
                        velocityThreshold: 0.3,
                        directionalOffsetThreshold: 80
                    }}
                >
                    {/* Current Live Stream */}
                    <NodePlayerView 
                        style={{ height: '100%' }}
                        ref={(vp) => { this.vp = vp }}
                        inputUrl={`rtmp://52.76.213.248:1935/live/${params.id}`}
                        scaleMode={"ScaleAspectFill"}
                        bufferTime={300}
                        maxBufferTime={1000}
                        autoplay={true}
                    />

                    {/* Main Layer */}
                    <WatchLiveMainLayer
                        ref={this.mainLayerRef}
                        streamerBadgeInfo={{
                            userId: params.userid,
                            name: params.name,
                            profilePhoto: params.photo,
                            buttonProfileDetail: () => this.modalRef.current.show(),
                            buttonFollow: () => this.onSubmitFollow(),
                            buttonExitLive: () => this.onSubmitExitLive(),
                            viewCount: viewCount !== null ? viewCount : "25.7K"
                        }}
                        chatbox={{ 
                            socket: socket,
                            getUserLive: params.name,
                            userId: params.userid,
                            giftButtonOnPress: () => this.giftModalRef.current.show()
                        }}
                        followingStatus={  this.state.status }
                    />

                    {/* Live List Layer */}
                    <LiveListLayer
                        ref={this.liveListLayerRef}
                        data={testData}
                    />
                </GestureRecognizer>

                {/* Profile Modal */}
                <ProfileModal
                    ref={this.modalRef}
                    fullname={params && params.name}
                    profilePhoto={params.photo}
                    userId={params && params.userid}
                    bio={params && params.bio}
                    status={this.state.status}
                    followOnPress={() => this.onSubmitFollow()}
                    messageOnPress={() => this.goToDirectMessage()}
                    reportOnPress={() => alert('Report User onPress')}
                />

                {/* Gift Modal */}
                <GiftsModal
                    ref={this.giftModalRef}
                    data={getGiftsData}
                    giftItemOnPress={(item) => this.sendGift(item)}
                />

                {/* Gift Popup Image */}
                <GiftPopupImage
                    ref={this.giftPopupRef}
                    imagePopUp={this.state.giftPopupImage}
                />
            </View>
        )
    }
}

const mapStateToProp = (state) => ({
    followStreamerData: state.FollowRoomReducer.data,
    unfollowStreamerData: state.UnFollowRoomReducer.data,
    roomDetailData: state.RoomDetailReducer.data,
    getGiftsData: state.GetGiftsReducer.data,
    postGiftData: state.PostGiftReducer.data,
    stopWatchingData: state.CloseViewReducer.data,
    getUserData: state.GetUserReducer.data
})

const mapDispatchToProps = (dispatch) => ({
    followStreamerAction: (id) => dispatch(followStreamerAction( id )),
    unfollowStreamerAction: (id) => dispatch(unfollowStreamerAction( id )),
    roomDetailAction: (room_id) => dispatch(roomDetailAction(room_id)),
    getGiftsAction: () => dispatch(getGiftsAction()),
    postGiftAction: (id, roomId) => dispatch(postGiftAction(id, roomId)),
    stopWatchingAction: () => dispatch(stopWatchingAction()),
    getUserDetailAction: () => dispatch(getUserDetailAction()),
    getRoomsAction: () => dispatch(getRoomsAction()),

})

export default connect(mapStateToProp, mapDispatchToProps)(WatchLiveVideo)