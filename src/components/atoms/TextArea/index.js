import React from 'react'
import { TextInput } from 'react-native'
import { colors, fonts } from '../../../utils'

const TextArea = ({ placeholder, editable, defaultValue, ...rest }) =>
{
    let currBackground

    editable === false ? currBackground = { backgroundColor: '#dedede' } : currBackground = { backgroundColor: '#f9f9f9' }

    if(editable === false)
    {
        return (
            <TextInput
                style={[textarea, currBackground ]}
                placeholder={placeholder}
                placeholderTextColor={colors.text.tertiary}
                multiline={true}
                numberOfLines={3}
                editable={editable}
                defaultValue={defaultValue}
                {...rest}
            />
        )
    }
    
    return (
        <TextInput
            style={[textarea, currBackground ]}
            placeholder={placeholder}
            placeholderTextColor={colors.text.tertiary}
            multiline={true}
            numberOfLines={3}
            editable={editable}
            defaultValue={defaultValue}
            {...rest}
        />
    )
}

const textarea =
{
    color: colors.text.primary,
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
}

export default TextArea