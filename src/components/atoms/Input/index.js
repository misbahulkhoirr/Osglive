import React from 'react'
import { TextInput, View } from 'react-native'
import { IconMail, IconAccount, IconText, IconLock, IconPhone, IconAlert, IconUpload, IconRoom, IconDocument, IconChat } from '../../atoms'
import { colors, fonts } from '../../../utils'

const Input = ({ useIcon, iconName, isDisableEdit, placeholder, secureTextEntry, defaultValue, keyboardType, ...rest }) => 
{
    let currBackground

    isDisableEdit ? currBackground = { backgroundColor: '#dedede' } : currBackground = null

    if(useIcon === true && iconName)
    {
        let icon = <IconAlert color={colors.alert} size={20} />
        iconName === 'mail' ? icon = <IconMail color={colors.primary} size={20} /> : null
        iconName === 'account' ? icon = <IconAccount color={colors.primary} size={20} /> : null
        iconName === 'text' ? icon = <IconText color={colors.primary} size={20} /> : null
        iconName === 'lock' ? icon = <IconLock color={colors.primary} size={20} /> : null
        iconName === 'phone' ? icon = <IconPhone color={colors.primary} size={20} /> : null
        iconName === 'upload' ? icon = <IconUpload color={colors.primary} size={20} /> : null
        iconName === 'room' ? icon = <IconRoom color={colors.primary} size={20} /> : null
        iconName === 'document' ? icon = <IconDocument color={colors.primary} size={20} /> : null
        iconName === 'chat' ? icon = <IconChat color={colors.primary} size={20} /> : null

        return (
            <View style={inputGroup}>
                <View style={[inputGroup.icon, currBackground]}>
                    {icon}
                </View>
                <TextInput
                    style={[inputGroup.field, currBackground]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.text.secondary}
                    secureTextEntry={secureTextEntry}
                    defaultValue={defaultValue}
                    keyboardType={keyboardType}
                    {...rest}
                />
            </View>
        )
    }

    return (
        <TextInput
            style={[input, currBackground]}
            placeholder={placeholder}
            placeholderTextColor={colors.text.secondary}
            secureTextEntry={secureTextEntry}
            defaultValue={defaultValue}
            {...rest}
        />
    )
}

const input =
{
    color: colors.text.primary,
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9'
}

const inputGroup =
{
    flexDirection: 'row',

    icon:
    {
        justifyContent: 'center',
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: colors.border.primary,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        paddingVertical: 8,
        paddingLeft: 15,
        backgroundColor: '#f9f9f9'
    },
    field:
    {
        flex: 1,
        color: colors.text.primary,
        fontFamily: fonts.regular,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: colors.border.primary,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9'
    }
}

export default Input