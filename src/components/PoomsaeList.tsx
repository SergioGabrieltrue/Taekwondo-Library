import { FlatList, StyleSheet, Pressable, Linking, Alert } from "react-native";
import { ThemedText } from "./themed-text";
import type { PoomsaeItem } from "@/data/poomsae";
import { ThemedView } from "./themed-view";
import { useRouter } from "expo-router";



type PoomsaeListProps = {
    data: PoomsaeItem[],
    categoria: "pretas" | "coloridas"
}



export default function PoomsaeList({ data, categoria}: PoomsaeListProps) {

    const router = useRouter()

    const handleDetails =  (id: number, categoria: PoomsaeListProps["categoria"]) => {
    if(!id){
        throw new Error("Id não identificado.")
    }
    router.push(`/poomsae/${categoria}/${id}`)
}

    return (
        <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={data}

            renderItem={({ item }) => {
                const urlPoomsae = item.videoUrl
                // const idPoomsae = item.id

                return (<Pressable
                    onPress={() => handleDetails(item.id, categoria)} >
                    {({ pressed }) => (

                        <ThemedView style={[
                            styles.cardPoomsae,
                            pressed && styles.cardPoomsaePressed,
                            urlPoomsae && styles.cardPoomsaeActive
                        ]}>
                            <ThemedText type="subtitle">
                                {item.nome}
                            </ThemedText>
                            <ThemedText>
                                {`Significado: ${item.significado}`}
                            </ThemedText>
                            {urlPoomsae ?
                                <ThemedText>
                                    {`Vídeo do Poomsae \u25B6`}
                                </ThemedText> :
                                <ThemedText>{`\u26A0\uFE0F Vídeo ainda não disponível.`}</ThemedText>
                            }
                        </ThemedView>
                    )}
                </Pressable>
                )

            }}
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
        borderColor: '#8E8E93',
        backgroundColor: "#F2F2F7",
        borderRadius: 15,
    }
    ,
    cardPoomsaePressed: {
        backgroundColor: "#e9f87c"
    },
    cardPoomsaeActive: {
        backgroundColor: "#d3d3d3"
    }
});

