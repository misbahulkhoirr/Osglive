import React, {useState, useEffect} from 'react'
import { View, Text, ImageBackground, Picker, Image } from 'react-native'
import { Button, Gap, Input } from '../../../components'
import SlotMachine from 'react-native-slot-machine'
import { background1,happyfruit } from '../../../assets'

const Slot1 = ({ navigation }) =>
{
    const [ spin, setSpin ] = useState(1)
    const [ bet, setBet ] = useState('100000')

    const [ slot1, setSlot1 ] = useState('05233')
    const [ slot2, setSlot2 ] = useState('54231')
    const [ slot3, setSlot3 ] = useState('30213')
    const [ slot4, setSlot4 ] = useState('25412')

    const randomSlot1 = () => {
        var slotArr = "";
        for (var i = 0; i < 5; i++) {
            var arraySlot = [0, 1, 2, 4, 5, 1, 2, 3, 3, 4, 5];
            var rand = arraySlot[Math.floor(Math.random() * 6)];
            slotArr = slotArr+rand;
        }
        console.log(slotArr);
        setSlot1(slotArr)
    }

    const randomSlot2 = () => {
        var slotArr = "";
        for (var i = 0; i < 5; i++) {
            var arraySlot = [0, 1, 2, 4, 5, 1, 2, 3, 3, 4, 5];
            var rand = arraySlot[Math.floor(Math.random() * 6)];
            slotArr = slotArr+rand;
        }
        console.log(slotArr);
        setSlot2(slotArr)
    }

    const randomSlot3 = () => {
        var slotArr = "";
        for (var i = 0; i < 5; i++) {
            var arraySlot = [0, 1, 2, 4, 5, 1, 2, 3, 3, 4, 5];
            var rand = arraySlot[Math.floor(Math.random() * 6)];
            slotArr = slotArr+rand;
        }
        console.log(slotArr);
        setSlot3(slotArr)
    }

    const randomSlot4 = () => {
        var slotArr = "";
        for (var i = 0; i < 5; i++) {
            var arraySlot = [0, 1, 2, 4, 5, 1, 2, 3, 3, 4, 5];
            var rand = arraySlot[Math.floor(Math.random() * 6)];
            slotArr = slotArr+rand;
        }
        console.log(slotArr);
        setSlot4(slotArr)
    }

    const handleSpin = () => {
        randomSlot1();
        randomSlot2();
        randomSlot3();
        randomSlot4();
        setSpin(spin+1);
    }

    const handleMaxBet = () => {
        setBet('2000000');
    }

    const symbols = ['💠', '🍎', '🍐', '🍊', '🍋', '🍌'];

    return (
        <View style={style.container}>
            <ImageBackground
                source={background1}
                style={{
                    position: 'absolute',
                    height:'100%',
                    width:'100%'
                }}
            ></ImageBackground>
            <View style={style.containerHeader}>
                <Image style={{width:'100%',height:'100%',resizeMode: 'contain'}} source={happyfruit}></Image>
            </View>
            <View style={[style.containerSlot, { resizeMode: 'contain' }]}>
                <SlotMachine initialAnimation={false} duration={500} width={60} height={60} text={slot1} range="012345" renderTextContent={c => <Text style={{fontSize: 35}}>{symbols[c]}</Text>} />
                <Gap height={5} />
                <SlotMachine initialAnimation={false} duration={500} width={60} height={60} text={slot2} range="012345" renderTextContent={c => <Text style={{fontSize: 35}}>{symbols[c]}</Text>} />
                <Gap height={5} />
                <SlotMachine initialAnimation={false} duration={500} width={60} height={60} text={slot3} range="012345" renderTextContent={c => <Text style={{fontSize: 35}}>{symbols[c]}</Text>} />
                <Gap height={5} />
                <SlotMachine initialAnimation={false} duration={500} width={60} height={60} text={slot4} range="012345" renderTextContent={c => <Text style={{fontSize: 35}}>{symbols[c]}</Text>} />
            </View>
            <View style={style.containerMenuBottom}>
                <View
                    style={{
                        margin:5,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <View style={{
                        minWidth: 150,
                        backgroundColor:'#fff',
                        justifyContent: 'center'
                    }}>
                        <Picker
                            selectedValue={bet}
                            onValueChange={(itemValue, itemIndex) => setBet(itemValue)}
                        >
                            <Picker.Item label="100.000" value="100000" />
                            <Picker.Item label="200.000" value="200000" />
                            <Picker.Item label="500.000" value="500000" />
                            <Picker.Item label="1.000.000" value="1000000" />
                            <Picker.Item label="2.000.000" value="2000000" />
                        </Picker>
                    </View>
                    <Gap width={15} />
                    <View style={{
                        minWidth: 70
                    }}>
                        <Button title="Max Bet" outlined={true} onPress={(handleMaxBet)} />
                    </View>
                    <Gap width={15} />
                    <View style={{
                        minWidth: 70
                    }}>
                        <Button title="Spin" outlined={false} onPress={(handleSpin)} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = {
    container:{
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    containerHeader:{
        position:'absolute',
        width: '90%',
        height: '10%',
        left:'5%',
        top:'5%'
    },
    containerSlot:{
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerMenuBottom:{
        backgroundColor: '#000',
        width: '100%',
        height: '10%',
        justifyContent: 'center'
    }
}
export default Slot1