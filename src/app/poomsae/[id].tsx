import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams } from "expo-router";
import { PoomsaeSections } from "@/data/poomsae";

export default function PoomsaeDetails() {
    const { id } = useLocalSearchParams()

    const poomsaeColorData = PoomsaeSections.coloridas.data
    const idNumber = typeof id === "string" ? parseInt(id, 10) : NaN


    
    const poomsaeFound = Number.isNaN(idNumber) ? undefined : poomsaeColorData.find((poomsae) => poomsae.id === idNumber)
    

    return (
         poomsaeFound === undefined ?
            <ThemedText>Poomsae não listado</ThemedText> :
            <ThemedView>
                <ThemedText>{poomsaeFound.nome}</ThemedText>
                <ThemedText>{poomsaeFound.significado}</ThemedText>
                <ThemedText>{poomsaeFound.videoUrl}</ThemedText>
            </ThemedView>
    )
}
