import React from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { PageHeader } from '../../components'
import { colors, fonts } from '../../utils'

const NotificationList = ({ navigation }) =>
{
    const data = [
        {
            id: 1,
            title: 'Top up berhasil',
            desc: 'Pengisian saldo sejumlah Rp. 120.000 berhasil dilakukan.',
            time: '19 min',
            unread: true
        },
        {
            id: 2,
            title: 'Bonus saldo sekarang juga!',
            desc: 'Lakukan pengisian saldo minimal Rp. 250.000 dan dapatkan bonus saldo dalam bentuk cashback hingga 5%.',
            time: '1 hour',
            unread: true
        },
        {
            id: 3,
            title: 'Penarikan saldo berhasil',
            desc: 'Penarikan saldo sejumlah Rp. 200.000 berhasil dilakukan.',
            time: '3 days',
            unread: false
        }
    ]

    const setRead = () =>
    {
        console.log('Action set to read.')
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Notifications"
                prevNav={true}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <FlatList
                    ListHeaderComponentStyle={styles.listHeaderComponent}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item(item.unread)}
                            onPress={() => setRead()}
                        >
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDesc}>{item.desc}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default NotificationList

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    content: { flex: 1 },
    listHeaderComponent:
    {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    item: unread => ({
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        padding: 15,
        backgroundColor: unread ? colors.primaryLight : 'white'
    }),
    itemTitle:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        marginBottom: 5
    },
    itemDesc:
    {
        color: colors.text.primary,
        fontFamily: fonts.regular
    }
})