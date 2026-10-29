import { Platform, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';

import { PoomsaeSections } from '@/data/poomsae';
import PoomsaeList from '@/components/PoomsaeList';

export default function HomeScreen() {

  const [faixaColoridaAberta, setFaixaColoridaAberta] = useState(false);
  const [faixaPretaAberta, setFaixaPretaAberta] = useState(false);


  const openPoomsae = (poomsaeType : "coloridas" | "pretas") => {
   
      if(poomsaeType === "coloridas"){
        setFaixaColoridaAberta((prev)=>!prev)
      }
      else if(poomsaeType === "pretas"){
        setFaixaPretaAberta((prev)=>!prev)
      }
    
  }

    const dadosColoridas = PoomsaeSections.coloridas
    const dadosPretas = PoomsaeSections.pretas

    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.heroSection}>
            <ThemedText type="title" style={styles.title}>
              Biblioteca de Poomsae
            </ThemedText>

            <ThemedText type="default">
              Demonstração em vídeo de todos os Poomsae reconhecidos pela Kukkiwoon
            </ThemedText>
          </ThemedView>

          <ThemedText type="code" style={styles.code}>
            Lista de Poomsae
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <Pressable
              onPress={() => openPoomsae("coloridas")}
              style={({ pressed }) => [
                styles.poomsaeCategoryColofur,
                {
                  backgroundColor: pressed ? "yellow" : "transparent"
                },
              ]}>
              <ThemedText type="default">Poomsae Faixa Colorida (10° - 1° Gub)</ThemedText>

            </Pressable>
            {faixaColoridaAberta && (
              <PoomsaeList data ={dadosColoridas.data}>

              </PoomsaeList>
            )}

            <Pressable
              onPress={() => openPoomsae("pretas")}
              style={({ pressed }) => [
                styles.poomsaeCategoryBlack,
                {
                  backgroundColor: pressed ? "yellow" : "transparent"
                },
              ]}>
              <ThemedText type="default">Poomsae Faixa Preta (1° - 9° DAN)</ThemedText>

            </Pressable>

            {faixaPretaAberta && (
              <PoomsaeList data ={dadosPretas.data}>

              </PoomsaeList>
            )}
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </SafeAreaView>
      </ThemedView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: Spacing.four,
      alignItems: 'center',
      gap: Spacing.three,
      paddingBottom: BottomTabInset + Spacing.three,
      maxWidth: MaxContentWidth,
    },
    heroSection: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingHorizontal: Spacing.four,
      gap: Spacing.four,
    },
    title: {
      textAlign: 'center',
    },
    code: {
      textTransform: 'uppercase',
    },
    stepContainer: {
      gap: Spacing.three,
      alignSelf: 'stretch',
      paddingHorizontal: Spacing.three,
      paddingVertical: Spacing.four,
      borderRadius: Spacing.four,
    },
    poomsaeCategoryColofur: {
      borderStyle: "solid",
      borderColor: "red",
      borderWidth: 2
    },
    poomsaeCategoryBlack: {
      borderStyle: "solid",
      borderColor: "black",
      borderWidth: 2
    }
  });
