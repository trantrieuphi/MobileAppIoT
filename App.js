import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

// import AdafruitIO from './src/AdafruitIO';
import HomeScreen from './src/Views/HomeScreen';
import ControlScreen from './src/Views/ControlScreen';
import ChartScreen from './src/Views/ChartScreen';


const Tab = createBottomTabNavigator();
console.log("test");
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name="Control" component={ControlScreen} 
          options={{
            tabBarLabel: 'Điều khiển',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="game-controller" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen name="Chart" component={ChartScreen} 
          options={{
            tabBarLabel: 'Theo dõi',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="linechart" color={color} size={size} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});