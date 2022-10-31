import React, { useRef } from 'react'
import { WebView } from 'react-native-webview'

const LoginGoogle = ({ route }) =>
{
    const webViewRef = useRef(null)
    const UrlFacebook = route.params.apps
    console.log('UrlFacebook:', UrlFacebook)
    return (
        <WebView 
            source={{ uri: '' }} 
            ref={webViewRef} 
            // userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
        />
    )
}

export default LoginGoogle