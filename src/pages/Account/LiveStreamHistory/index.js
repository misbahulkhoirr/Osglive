import React, { useCallback, useState, useEffect, useRef } from 'react'
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, LiveHistoryDetail, PageHeader } from '../../../components'
import { BeansImage } from '../../../assets'
import { colors, fonts, fontSizer } from '../../../utils'
import { liveStreamHistoryAction } from '../../../config'

const LiveStreamHistory = ({ navigation }) =>
{
    const detailRef = useRef(null)

    const [ refreshing, setRefreshing ] = useState(false)

    const wait = (timeout) =>
    {
        return new Promise(resolve => setTimeout(resolve, timeout))
    }

    const onRefresh = useCallback(() =>
    {
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false))
    }, [])

    const dispatch      = useDispatch()
    const LiveHistories = useSelector(state => state.LiveHistoryReducer)

    useEffect(() =>
    {
        dispatch(liveStreamHistoryAction())
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pageHeader}>
                <PageHeader
                    title="Live Stream History"
                    prevNav={true}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Gap height={15} />

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListHeaderComponentStyle={styles.listHeaderComponent}
                data={LiveHistories && LiveHistories.data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.trxTouchableWrapper(index, (LiveHistories.length - 1))}
                        onPress={() =>
                        {
                            detailRef.current.show()
                            detailRef.current.showData(item)
                        }}
                    >
                        <View style={styles.textWrapper}>
                            <View>
                                <Text style={styles.trxType}>
                                    {item.room_name}
                                </Text>
                                <Text style={styles.trxDate}>
                                    {item.date}
                                </Text>
                                <Text style={styles.trxID}>
                                    Duration: {item.duration}
                                </Text>
                            </View>

                            <View style={styles.incomeWrapper}>
                                <Text style={styles.trxNominal}>
                                    {item.income}
                                </Text>
                                <Gap width={5} />
                                <Image source={BeansImage} style={styles.image} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />

            <LiveHistoryDetail ref={detailRef} />
        </SafeAreaView>
    )
}

export default LiveStreamHistory

const styles = StyleSheet.create({
    pageHeader: { elevation: 8, shadowColor: 0 },
    listHeaderComponent:
    {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    container:
    {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    trxTouchableWrapper: (index, dataLength) => ({
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 3,
        shadowColor: '#cecece',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eaeaea',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: index !== dataLength ? 10 : 25
    }),
    textWrapper:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    trxType:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21)
    },
    trxDate:
    {
        color: '#999999',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19)
    },
    trxID:
    {
        color: '#cccccc',
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        lineHeight: fontSizer(19)
    },
    incomeWrapper: { flexDirection: 'row' },
    trxNominal:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21)
    },
    image: { width: 20, height: 20 }
})