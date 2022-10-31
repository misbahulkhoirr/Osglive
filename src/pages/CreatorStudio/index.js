import React, { Component } from 'react'
import { Alert, BackHandler, Image, PermissionsAndroid, ScrollView, StyleSheet, Text, View, AppState } from 'react-native'
import { NodeCameraView } from 'react-native-nodemediaclient'
import { launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage'
import { connect} from 'react-redux'
import RadioButtonRN from 'radio-buttons-react-native'
import io from 'socket.io-client'
import { Button, Gap, HeaderText, Input, StreamerChatbox } from '../../components'
import { style } from '../../assets'
import { colors, fonts, fontSizer, tokenValidation } from '../../utils'
import { getLiveCategoryAction, settingLiveAction, stopLiveAction, forceStopAction } from '../../config'

const requestCameraPermission = async () =>
{
    try
    {
        const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
            title: "Cool room_cover App Camera And Microphone Permission",
            message:
                "Cool room_cover App needs access to your camera " +
                "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        })

        if(granted === PermissionsAndroid.RESULTS.GRANTED)
        {
            console.log("You can use the camera")
        }
        else
        {
            console.log("Camera permission denied")
        }
    }
    catch(err)
    {
        console.warn(err)
    }
}

const socket = io('http://52.76.213.248:3000',
{
    transports: ['websocket'],
    jsonp: false
})

class CreatorStudio extends Component
{
    constructor(props)
    {
        super(props)
    
        this.state =
        {
            isLive: false,
            isCamera: false,
            isFlash: false,
            isModal: false,
            room_name: '',
            room_cover: '',
            room_category_id:'',
            idRoom: '',
            cameraId: 1,
            token: null,
            appState: AppState.currentState,
            liveCategoryData:
            [
                { label: 'Category Live 1' },
                { label: 'Category Live 2' }
            ],
            liveCategoryDataInit: -1,
            username : null,
            userid : null,
            isValidation: true
        }
    }

    backAction = () =>
    {
        const { isLive } = this.state

        if(isLive === true)
        {
            Alert.alert("You need to stop youre live first")
        }
        else
        {
            this.vb.flashEnable(false)
            if(this.state.isCamera === true) this.vb.switchCamera()

            this.setState({
                isLive: false,
                isCamera: false,
                isFlash: false,
                isModal: false,
                room_name: '',
                room_cover: '',
                room_category_id: '',
                idRoom: '',
                cameraId: 1
            })

            this.backhandler.remove()
            this.props.navigation.goBack() 
        }

        return true
    }

    componentDidMount()
    {
        tokenValidation(null, navigation)

        const { getLiveCategoryAction, navigation } = this.props

        AsyncStorage.getItem("user").then((response) =>
        {
            const user = JSON.parse(response)

            this.setState({
                username : user.name,
                userid : user.id
            })
            console.log('USER : '+this.state.userid)
        })

        getLiveCategoryAction()
        requestCameraPermission()

        navigation.addListener('focus', () =>
        {
            this.backhandler = BackHandler.addEventListener("hardwareBackPress", this.backAction)
        })

        this.appStateSubscription = AppState.addEventListener(
            "change",
            nextAppState => {
            if (this.state.appState.match(/inactive|background/) && nextAppState === "background" || 'inactive') 
            {
                if(this.props.settingLive.id){
                    this.props.forceStopAction(this.props.settingLive.id)
                    this.setState({ isLive: false })
                    setTimeout(() =>
                        {
                            this.vb.stop()
                            socket.emit("StopRoom")
                        }, 1000)
                }
            }
                this.setState({ appState: nextAppState });
            }
          );
    }

    // componentDidUpdate(prevState)
    // {
    //     NetInfo.addEventListener((state) =>
    //     {
    //         // console.log('PrevState:', state)
    //         // if(state.isConnected === false)
    //         // {
    //         //     this.vb.stop()
    //         //     this.setState({isValidation: 'Stop'})
    //         //     console.log('Stop')
    //         //     if(state.isConnected === true)
    //         //     {
    //         //         console.log('Start Again 1')
    //         //     }
    //         // }
    //         // if(state.isConnected === true && this.state.isValidation === 'Stop')
    //         // {
    //         //     console.log('Start Again')
    //         //     this.vb.start()
    //         // }
    //         console.log('Match:', state.isConnected == this.state.isValidation ? true : false  )
    //         if(state.isConnected !== this.state.isValidation)
    //         {
    //             this.vb.stop()
    //         } 
    //     })   
    // }


    componentWillUnmount()
    {
        this.backhandler.remove()
        this.appStateSubscription.remove();
       
        console.log("unmounted")
    }

    render()
    {
        const { 
            isLive,
            isModal,
            isCamera,
            isFlash,
            room_cover,
            room_name,
            room_category_id,
            idRoom,
            cameraId,
            liveCategoryDataInit,
            username,
            userid
        } = this.state

        const {
            liveCategories,
            settingLiveAction,
            settingLive,
            settingLiveError,
            stopLiveAction,
            stopLiveError
        } = this.props

        const onCancel = () =>
        {
            this.setState({ 
                isModal: false,
                room_name: '',
                room_cover: '',
                room_category_id: '',
                idRoom: ''
             })
        }

        const ValidasiLiveError = () => {
            if(this.props.settingLiveError && this.props.settingLiveError.data !== prevProps.settingLiveError.data){
                this.setState({
                    isModal: false,
                    isLive: true,
                    idRoom: this.props.settingLive.id
                })
            }
        }

        const handleonSubmit = () =>
        {
            settingLiveAction(room_name, room_cover, room_category_id).then((res) => 
            {
                this.ValidasiLiveError()
                setTimeout(() =>
                {
                    this.vb.start()
                    socket.emit("joinRoom", { username: username, room_user_id: userid })
                }, 2000)
            })
            console.log(settingLive)
        }
        
        const handleChoosePhoto  = () =>
        {
            const options = {
                mediaType: 'photo',
                saveToPhotos: true,
                quality: 0.5
            }

            launchImageLibrary(options, (response) =>
            {
                if(response)
                {
                    if(response.didCancel || response.errorCode)
                    {
                        this.setState({ room_cover: room_cover })
                    }
                    else
                    {
                        this.setState({ room_cover: response.assets[0].uri })
                    }
                }
            })
        }

        const cameraButtonOnPress = () =>
        {
            this.vb.switchCamera()

            if(isCamera === true)
            {
                this.setState({ isCamera: false })
            }
            else
            {
                this.setState({ isCamera: true })
            }
        }

        const flashButtonOnPress = () =>
        {
            if(isFlash === true)
            {
                this.setState({ isFlash: false })
                this.vb.flashEnable(false)
            }
            else
            {
                this.setState({ isFlash: true })
                this.vb.flashEnable(true)
            }
        }

        const liveButtonOnPress = () =>
        {
            this.setState({ isModal: true })
            this.props.DISPATCH()
        }

        const stopButtonOnPress = () =>
        {
            stopLiveAction().then(() =>
            {
                if(stopLiveError)
                {
                    console.log('Failed stopped live', stopLiveError)
                }
                else
                {
                    console.log('Successfully stopped live.')
                    this.setState({ isLive: false })
                    
                    setTimeout(() =>
                    {
                        this.vb.stop()
                        socket.emit("StopRoom")
                    }, 1000)
                }
            })
        }

        const getCategoryId = (e) => this.setState({ room_category_id: e.id })
        return (
            <View style={style.container}>
                <NodeCameraView 
                    style={{ height: '100%'}}
                    ref={(vb) => { this.vb = vb }}
                    outputUrl = {"rtmp://52.76.213.248/live/"+settingLive.id}
                    camera={{ cameraId: cameraId , cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 1, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: true }}
                    autopreview={true}
                />

                {/* Chat Box */}
                <StreamerChatbox
                    socket={socket}
                    cameraButtonOnPress={cameraButtonOnPress}
                    flashButtonOnPress={flashButtonOnPress}
                    liveButtonOnPress={liveButtonOnPress}
                    // testButton={() => {
                    //     if (this.state.isPublish)
                    //     {
                    //         this.setState({ publishBtnTitle: 'Start Publish', isPublish: false })
                    //         this.vb.stop()
                    //     }
                    //     else
                    //     {
                    //         this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true })
                    //         this.vb.start()
                    //     }
                    // }}
                    stopButtonOnPress={stopButtonOnPress}
                    isLive={isLive}
                />

                {isLive === false ? 
                <ScrollView style={styles.container}>
                    <Gap height={20} />
                    <>
                        <HeaderText title="Live Room" desc="Set up your room for live stream" />
                        <Gap height={20} />
                    </>
                    <View style={styles.input}>
                        <Input
                            useIcon={true}
                            iconName="room"
                            value={room_name}
                            onChangeText={(room_name) => this.setState({room_name: room_name})}
                            placeholder="Room Name"
                        />
                        <Text style={styles.textError}>
                            {settingLiveError ? settingLiveError.data.room_name : ''}
                        </Text>
                        <Gap height={15} />

                        {
                            room_cover
                            ?
                                <View style={styles.coverImageWrapper}>
                                    <Image source={{ uri: room_cover }} style={styles.coverImage} />
                                </View>
                            :
                                <View style={styles.imagePlaceholder}>
                                    <Text style={styles.imagePlaceholderLabel}>No Image</Text>
                                </View>
                        }
                        <Text style={styles.textError}>
                            {settingLiveError ? settingLiveError.data.room_cover : ''}
                        </Text>
                        <Gap height={15} />
                        
                        <View style={styles.buttonWrapper}>
                            <Button title="Choose Photo" outlined={true} onPress={handleChoosePhoto} />
                        </View>
                    </View>

                    <Gap height={35} />

                    <View style={styles.pageStyle}>
                        <Text style={styles.categoryTitle}>
                            Select Category
                        </Text>

                        <RadioButtonRN
                            data={liveCategories}
                            initial={liveCategoryDataInit}
                            selectedBtn={(e) => getCategoryId(e)}
                            animationTypes={['shake']}
                            circleSize={14}
                            textStyle={styles.textSelect}
                            activeColor={colors.primary}
                            boxActiveBgColor={colors.primaryLight}
                            boxStyle={styles.select}
                        />
                        <Text style={styles.textError}>
                            {settingLiveError ? settingLiveError.data.room_category_id : ''}
                        </Text>
                        <Gap height={50} />

                        <Button  title="Start" onPress={handleonSubmit}  />
                        <Gap height={10} />
                        <Button title="Cancel" onPress={onCancel} outlined={true} />

                        <Gap height={50} />
                    </View>
                </ScrollView>   
                : null}
            </View>
        )
    }
}

const mapStateToProp = (state) => ({
    liveCategories: state.GetRoomCategoriesReducer.data,
    settingLive: state.SettingRoomReducer.data,
    settingLiveError: state.SettingRoomReducer.error,
    stopLive: state.StopRoomReducer.data,
    stopLiveError: state.StopRoomReducer.error,
    forceStop: state.ForceStopReducer.data
})

const mapDispatchToProps = (dispatch) => ({
    getLiveCategoryAction: () => dispatch(getLiveCategoryAction()),
    settingLiveAction: (room_name, room_cover, room_category_id) => dispatch(settingLiveAction({room_name, room_cover, room_category_id})),
    DISPATCH: () => dispatch({ type:'SETTING_ROOM_ATTEMPT' }),
    stopLiveAction: () => dispatch(stopLiveAction()),
    forceStopAction: (room_id) => dispatch(forceStopAction({room_id}))
})

export default connect(mapStateToProp, mapDispatchToProps)(CreatorStudio)

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    coverImage:
    {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    coverImageWrapper:
    {
        width: '100%',
        height: undefined,
        aspectRatio: 1 / 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#eaeaea',
    },
    imagePlaceholder:
    {
        width: '100%',
        height: undefined,
        aspectRatio: 1 / 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#eaeaea',
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagePlaceholderLabel:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(16)
    },
    input: { 
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    pageStyle: { paddingHorizontal: 15 },
    categoryTitle:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 5,
        marginHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#eaeaea'
    },
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
    textError:
    {
        color: 'red',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        marginTop: 5,
        textAlign:'center'
    },
    buttonWrapper:
    {
        width: '100%',
        paddingHorizontal: '15%'
    },
    textSelect:
    { 
        color: colors.text.primary,
        fontFamily: fonts.regular
    },
    select:
    {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 5
    }
})