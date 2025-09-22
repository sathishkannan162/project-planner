import { StyleSheet, Text, View } from 'react-native';

import { useSession } from '../lib/auth-client';

export default function HomeScreen() {
  const { data: session } = useSession();

  return (
    <View style={styles.container}>
      <Text>Welcome, {session?.user?.email || 'User'}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});