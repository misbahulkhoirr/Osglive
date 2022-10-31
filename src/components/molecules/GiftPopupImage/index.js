import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Dimensions, Image, View, Modal } from 'react-native'
import { bucketURL } from '../../../utils'

const GiftPopupImage = forwardRef(({ imagePopUp }, ref) =>
{
    const [ isVisible, setIsVisible ] = useState(false)
    
    useImperativeHandle(ref, () =>
    {
        return {
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false)
        }
    })

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            style={{ 
                backgroundColor: 'salmon'
            }}
        >
            <View
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 280,
                    position: 'absolute',
                    top: 110,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={{ uri: `${bucketURL}/${imagePopUp}`}}
                    style={{ width: 250, height: 250 }}
                />
            </View>
        </Modal>
    )
})

export default GiftPopupImage