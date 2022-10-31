import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import { colors } from '../../../utils'

const IconNext = ({ filled, size, color }) =>
{
    const actualSize = size ? size : '24'
    let actualColor  = color ? color : colors.text.secondary

    if(filled === true)
    {
        actualColor = color ? color : colors.primary

        return (
            <Svg
                width={actualSize}
                height={actualSize}
                viewBox="0 0 24 24"
                fill={actualColor}
            >
                <G id="chevron_right_24px">
                    <Path id="icon/navigation/chevron_right_24px" d="M9.70498 6L8.29498 7.41L12.875 12L8.29498 16.59L9.70498 18L15.705 12L9.70498 6Z"/>
                </G>
            </Svg>
        )
    }

    return (
        <Svg
            width={actualSize}
            height={actualSize}
            viewBox="0 0 24 24"
            fill={actualColor}
        >
            <G id="chevron_right_24px">
                <Path id="icon/navigation/chevron_right_24px" d="M9.70498 6L8.29498 7.41L12.875 12L8.29498 16.59L9.70498 18L15.705 12L9.70498 6Z"/>
            </G>
        </Svg>
    )
}

export default IconNext