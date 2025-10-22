import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalculatorScreen from './src/screens/CalculatorScreen';
import SavedPeptidesScreen from './src/screens/SavedPeptidesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName = 'calculate';
            if (route.name === 'Calculator') {
              iconName = 'calculate';
            } else if (route.name === 'Saved Peptides') {
              iconName = 'save';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}>
        <Tab.Screen 
          name="Calculator" 
          component={CalculatorScreen}
          options={{title: 'EvoX Biolabs'}}
        />
        <Tab.Screen 
          name="Saved Peptides" 
          component={SavedPeptidesScreen}
          options={{title: 'Saved Peptides'}}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{title: 'Settings'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
