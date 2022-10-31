import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Option = ({ options, onChange }) =>
{
    const [ activeOption, setActiveOption ] = useState(options[0])

    const updateActiveOption = (active) =>
    {
        setActiveOption(active)
    }

    return (
        <View
            style={{
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}
        >
            {
                options.map((option, index) => (
                    <TouchableOpacity
                        onPress={() =>
                        {
                            onChange(option)
                            updateActiveOption(option)
                        }}
                        key={index}
                    >
                        <Text
                            style={{
                                width: 150,
                                borderWidth: 1,
                                height: 50,
                                color: activeOption === option ? 'red' : 'black'
                            }}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Option