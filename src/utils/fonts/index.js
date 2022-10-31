import { Dimensions, Platform, PixelRatio } from 'react-native'

export const fonts =
{
    light: 'Rubik-Light',
    lightItalic: 'Rubik-LightItalic',
    regular: 'Rubik-Regular',
    italic: 'Rubik-Italic',
    medium: 'Rubik-Medium',
    mediumItalic: 'Rubik-MediumItalic',
    bold: 'Rubik-Bold',
    boldItalic: 'Rubik-BoldItalic',
    black: 'Rubik-Black',
    blackItalic: 'Rubik-BlackItalic'
}


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 320;

export const fontSizer = (size) =>
{
    const newSize = size * scale

    if (Platform.OS === 'ios')
    {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
    else
    {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}