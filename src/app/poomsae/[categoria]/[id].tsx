import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable, Linking, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PoomsaeSections } from "@/data/poomsae";


export default function PoomsaeDetails() {
    const { id, categoria } = useLocalSearchParams()


    const poomsaeData = categoria === "coloridas" ?
        PoomsaeSections.coloridas.data :
        PoomsaeSections.pretas.data

    const idNumber = typeof id === "string" ? parseInt(id, 10) : NaN

    const poomsaeFound = Number.isNaN(idNumber) ? undefined : poomsaeData.find((poomsae) => poomsae.id === idNumber)

    const handlePress = async (url: string | undefined) => {
        try {
            if (!url) {
                Alert.alert("Vídeo indisponível", "Este conteúdo ainda não possui um vídeo.");
                return;
            }
            await Linking.openURL(url);
        }
        catch (err) {
            Alert.alert(`A URL deste conteúdo não está ativa ou disponível: ${url}`);
        }
    }

    return (
        poomsaeFound === undefined ?
            <ThemedText>Poomsae não listado</ThemedText> :
            <ThemedView>
                <ThemedText>{poomsaeFound.nome}</ThemedText>
                <ThemedText>{poomsaeFound.significado}</ThemedText>
                {poomsaeFound.videoUrl
                    ? (
                        <Pressable
                            style={styles.poomsaeLink}
                            onPress={() => handlePress(poomsaeFound.videoUrl)}>
                            <ThemedText>
                                {`Veja o vídeo do Poomsae ${poomsaeFound.nome}, passo a passo. \u25B6`}
                            </ThemedText>
                        </Pressable>) :
                    (<ThemedText>Vídeo indisponível</ThemedText>
                    )}

            </ThemedView>
    )
}

const styles = StyleSheet.create({
    poomsaeLink: {
        padding: 16,
        margin: 8,
        backgroundColor: "#FF6B6B"
    }

});

