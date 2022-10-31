import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'
import { IconHome, IconAccount, IconDocument, IconChart, IconChat, IconHelp, IconHistory, IconSetting } from '../../atoms'

const MenuListItem = ({ icon, name, onPress, idx, numberOfMenus, notificationTick, unMessage }) =>
{
    const Icon = () =>
    {
        if(icon === 'account') return <IconAccount color={colors.primary} size="20" />
        if(icon === 'document') return <IconDocument color={colors.primary} size="20" />
        if(icon === 'chart') return <IconChart color={colors.primary} size="20" />
        if(icon === 'chat') return <IconChat color={colors.primary} size="20" />
        if(icon === 'help') return <IconHelp color={colors.primary} size="20" />
        if(icon === 'history') return <IconHistory color={colors.primary} size="20" />
        if(icon === 'setting') return <IconSetting color={colors.primary} size="20" />

        return <IconHome color={colors.primary} size="20" />
    }

    let borderBottom = null

    // Disable border bottom if menu is the last menu
    if(idx+1 === numberOfMenus) borderBottom = { borderBottomWidth: 0 }
    
    return (
        <TouchableOpacity style={[menuItem, borderBottom]} onPress={onPress}>
            <Icon />
            <View style={menuItem.textWrapper}>
                <Text style={menuItem.text}>{name}</Text>
                {notificationTick === true && unMessage != "0" ? 
                <View style={menuItem.notificationTick} >
                    <Text style={menuItem.notificationText}>{unMessage}</Text>
                </View> 
                : 
                null}
            </View>
        </TouchableOpacity>
    )
}

const menuItem =
{
    flexDirection: 'row',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    paddingVertical: 7,

    textWrapper:
    { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
        marginLeft: 10
    },
    notificationTick:
    {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25 / 2
    },
    notificationText: 
    {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 11,
        fontFamily: fonts.regular
    }
}

export default MenuListItem
