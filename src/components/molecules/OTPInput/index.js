import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'

const OTPInput = ({ onLastInputFilled }) =>
{
    const refInput1 = useRef()
    const refInput2 = useRef()
    const refInput3 = useRef()
    const refInput4 = useRef()

    const [ activeInput, setActiveInput ] = useState('input1')

    /**
     * Go to the next input if value is not empty,
     * and go the previous input when value is deleted/empty.
     * @param {*} value
     * @param {*} refNextInput
     * @param {*} refPrevInput
     */
    const checkInput = (value, refPrevInput, refNextInput) =>
    {
        if(refPrevInput) if(!value.trim()) refPrevInput.focus()
        if(refNextInput) if(value.trim()) refNextInput.focus()
    }

    const [ codes, setCodes ] = useState(
    {
        input1: null,
        input2: null,
        input3: null,
        input4: null 
    })

    useEffect(() =>
    {
        // When input4 is filled, run onLastInputFilled() function
        if(codes.input4) onLastInputFilled(`${codes.input1}${codes.input2}${codes.input3}${codes.input4}`)
    }, [codes])

    return (
        <View style={styles.textInputWrapper}>
            <TextInput
                ref={refInput1}
                style={[
                    styles.textInput,
                    {
                        marginRight: 15,
                        borderColor: activeInput === 'input1' ? colors.primary : colors.border.primary
                    }
                ]}
                maxLength={1}
                keyboardType="numeric"
                onFocus={() => setActiveInput('input1')}
                onChangeText={(value) =>
                {
                    checkInput(value, null, refInput2.current)
                    value ? setCodes({ ...codes, input1: value }) : setCodes({ ...codes, input1: null })
                }}
            />
            <TextInput
                ref={refInput2}
                style={[
                    styles.textInput,
                    {
                        marginRight: 15,
                        borderColor: activeInput === 'input2' ? colors.primary : colors.border.primary
                    }
                ]}
                maxLength={1}
                keyboardType="numeric"
                onFocus={() => setActiveInput('input2')}
                onChangeText={(value) =>
                {
                    checkInput(value, refInput1.current, refInput3.current)
                    value ? setCodes({ ...codes, input2: value }) : setCodes({ ...codes, input2: null })
                }}
            />
            <TextInput
                ref={refInput3}
                style={[
                    styles.textInput,
                    {
                        marginRight: 15,
                        borderColor: activeInput === 'input3' ? colors.primary : colors.border.primary
                    }
                ]}
                maxLength={1}
                keyboardType="numeric"
                onFocus={() => setActiveInput('input3')}
                onChangeText={(value) =>
                {
                    checkInput(value, refInput2.current, refInput4.current)
                    value ? setCodes({ ...codes, input3: value }) : setCodes({ ...codes, input3: null })
                }}
            />
            <TextInput
                style={[
                    styles.textInput,
                    {
                        borderColor: activeInput === 'input4' ? colors.primary : colors.border.primary
                    }
                ]}
                maxLength={1}
                keyboardType="numeric"
                onFocus={() => setActiveInput('input4')}
                ref={refInput4}
                onChangeText={(value) =>
                {
                    checkInput(value, refInput3.current, null)
                    value ? setCodes({ ...codes, input4: value }) : setCodes({ ...codes, input4: null })
                }}
            />
        </View>
    )
}

export default OTPInput

const styles = StyleSheet.create({
    textInputWrapper:
    { 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(16),
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
        flex: 1
    }
})