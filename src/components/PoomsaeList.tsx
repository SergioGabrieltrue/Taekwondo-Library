import { FlatList, StyleSheet, Pressable, Linking, Alert } from "react-native";
import { ThemedText } from "./themed-text";
import type { PoomsaeItem } from "@/data/poomsae";
import { ThemedView } from "./themed-view";


type PoomsaeListProps = {
    data: PoomsaeItem[]
}



const handlePress = async (url: string | undefined) => {
    if (url) {
        await Linking.openURL(url);
    }
    else {
        Alert.alert(`A URL deste conteúdo não está ativaa ou disponível: ${url}`);
    }
}

export default function PoomsaeList({ data }: PoomsaeListProps) {
    return (
        <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={data}

            renderItem={({ item }) =>
                <Pressable
                    onPress={() => handlePress(item.videoUrl)} >
                    {({ pressed }) => (

                        <ThemedView style={[
                            styles.cardPoomsae,
                            pressed && styles.cardPoomsaePressed
                        ]}>
                            <ThemedText type="subtitle">
                                {item.nome}
                            </ThemedText>
                            <ThemedText>
                                {`Significado: ${item.significado}`}
                            </ThemedText>
                        </ThemedView>
                    )}
                </Pressable>

            }
        >
        </FlatList>
    )
}

const styles = StyleSheet.create({
    cardPoomsae: {
        padding: 16,
        margin: 8,
        borderWidth: 2,
        borderStyle: 'solid', // Opções: 'solid', 'dotted' ou 'dashed'
        borderColor: '#d3d3d3',
        borderRadius: 15,
    }
    ,
    cardPoomsaePressed: {
        backgroundColor: "#e9f87c"
    }
});

