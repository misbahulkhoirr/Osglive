import React from 'react'
import { Text, View } from 'react-native'
import { IconEye } from '../../atoms'
import { fonts, fontSizer } from '../../../utils'

const ViewerCount = ({ data, bgColor }) =>
{
    const currBgColor = bgColor === 'white' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)'
    
    return (
        <View style={[viewerCount.viewerCountWrapper, { backgroundColor: currBgColor }]}>
            <IconEye filled={true} color="#ffffff" size={15} />
            <Text style={viewerCount.viewerCount}>{data}</Text>
        </View>
    )
}

const viewerCount =
{
    viewerCountWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    viewerCount:
    {
        color: '#ffffff',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
        marginLeft: 5
    }
}

export default ViewerCount