import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import codePush from 'react-native-code-push'
import Orientation from 'react-native-orientation'
import * as Progress from 'react-native-progress'
import FlashMessage from 'react-native-flash-message'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { style } from './assets'
import { Router } from './config'

let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE
}

class App extends Component
{
    constructor(props)
    {
        super(props)
    
        this.state = {
            isLoading: 0,
            progressStatus: 0
        }
    }

    componentDidMount()
    {
        Orientation.lockToPortrait()

        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        },
        (status) =>
        {
            switch(status)
            {
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                    this.setState({ isLoading: '100%' })
                break
                case codePush.SyncStatus.INSTALLING_UPDATE:
                    this.setState({ isLoading: '100%' })
                break
                case codePush.SyncStatus.UPDATE_INSTALLED:
                    this.setState({ isLoading: 0 })
                break
                default:
                break
            }
        },
        ({ receivedBytes, totalBytes }) =>
        {
            this.setState({ progressStatus: (receivedBytes / totalBytes) * 100 })
        })
    }

    render()
    {
        const { isLoading, progressStatus } = this.state
  
        return (
            <>
                <View style={styles.progressBar(isLoading)}>
                    <Text>{progressStatus}%</Text>
                    <Progress.Bar progress={progressStatus} width={350} height={15} />
                </View>
                <NavigationContainer>
                    <NativeBaseProvider>
                        <View style={style.container}>
                            <Router />
                        </View>
                    </NativeBaseProvider>
                </NavigationContainer>
                <FlashMessage position="top" />
            </>
        )
    }
}
  
App = codePush(codePushOptions)(App)

export default (App)

const styles = StyleSheet.create({
    progressBar: size => ({
        backgroundColor: '#fff',
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center'
    })
})