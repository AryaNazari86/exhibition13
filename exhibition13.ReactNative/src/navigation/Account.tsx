import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from './App';
import { Register, SignIn } from '../screens';

const Stack = createStackNavigator();

export default function AccountStack() {
    console.log(AppNavigation);
    console.log(Register);
    console.log(SignIn);
    return (
        <Stack.Navigator>

            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    );
}