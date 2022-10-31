import React from 'react'
import { UnderDevelopment } from '../../../components'

const HelpCenter = ({ navigation }) =>
{
    return <UnderDevelopment onPress={() => navigation.goBack()} />
}

export default HelpCenter