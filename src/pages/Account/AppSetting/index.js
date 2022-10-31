import React from 'react'
import { UnderDevelopment } from '../../../components'

const AppSetting = ({ navigation }) =>
{
    return <UnderDevelopment onPress={() => navigation.goBack()} />
}

export default AppSetting