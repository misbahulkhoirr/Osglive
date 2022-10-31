import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Actionsheet, Box, useDisclose } from 'native-base'
import { colors, fonts, fontSizer } from '../../../utils'
import { Gap } from '../../atoms'

const LiveHistoryDetail = forwardRef((props, ref) =>
{
    const [ detail, setDetail ] = useState()

    const { isOpen, onOpen, onClose } = useDisclose()

    useImperativeHandle(ref, () =>
    {
        return {
            show: onOpen,
            showData: (liveHistory) => setDetail(liveHistory)
        }
    })

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <Box w="100%" px={2} justifyContent="center">
                    <Text style={styles.title}>History Detail</Text>
                    <View style={styles.textWrapper}>
                        <Text style={styles.label}>Room ID</Text>
                        <Text style={styles.textDetail}>: {detail && detail.room_id}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.label}>Room Name</Text>
                        <Text style={styles.textDetail}>: {detail && detail.room_name}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.label}>Room Code</Text>
                        <Text style={styles.textDetail}>: {detail && detail.room_code}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.textDetail}>: {detail && detail.date}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.label}>Duration</Text>
                        <Text style={styles.textDetail}>: {detail && detail.duration}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.label}>Income</Text>
                        <Text style={styles.textDetail}>: {detail && detail.income}</Text>
                    </View>
                    <Gap height={15} />
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    )
})

export default LiveHistoryDetail

const styles = StyleSheet.create({
    title:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(19),
        marginBottom: 15
    },
    textWrapper:
    {
        flexDirection: 'row'
    },
    label:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
        width: 100
    },
    textDetail:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19),
    }
})