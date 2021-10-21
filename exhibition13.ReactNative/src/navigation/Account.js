import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from '..//navigation/App';
import { Register, SignIn } from '../screens';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="App" component={AppNavigation} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={SignIn} />
        </Stack.Navigator>
    );
}