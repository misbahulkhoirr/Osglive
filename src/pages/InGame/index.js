import React, {useEffect, useRef } from 'react'
import { ActivityIndicator  } from 'react-native'
import { WebView } from 'react-native-webview'
import { useIsFocused } from '@react-navigation/native'
import Orientation from 'react-native-orientation'

const InGame = ({ route }) =>
{
    const webViewRef = useRef(null)
    const isFocused = useIsFocused()
    const linkApps = route.params.apps

    useEffect(() =>
    {
        Orientation.lockToLandscape();
    }, [])

    useEffect(() =>
    {
        if(!isFocused) Orientation.lockToPortrait()
    }, [isFocused])

    const injectJS = `document.getElementById('unity-canvas').style.width = "100vw"
                      document.getElementById('unity-canvas').style.height = "100vh"
                      document.body.style.margin = 0
                      true`

    const onBrowserMessage = (event) =>
    {
        console.log(event.nativeEvent.data)
    }
    
    return (
        <WebView
            source={{ uri: linkApps }}
            style={{ margin: -5}}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}
            startInLoadingState={true}
            renderLoading={() => (<ActivityIndicator />)}
            ref={webViewRef}
            injectedJavaScript={injectJS}
            onMessage={onBrowserMessage}
        />
    )
}

export default InGame