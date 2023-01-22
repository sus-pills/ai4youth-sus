import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MOJA POGGERS APPKA</Text>
      <Text> </Text>
      <Text> </Text>
      <Text>KIEDY MENTORKA POWIE, ŻEBY</Text>
      <Image 
        source={
          require("./images/image.png")
        }/>
        <Text>ŻEBY WBIĆ 3,000 ZŁ I 30,000</Text>
        <Text>FOLLOWÓW NA FB</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
