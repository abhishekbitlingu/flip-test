import {TransactionDetails} from '@/routes/transaction-details/TransactionDetails';
import {TransactionList} from '@/routes/transaction-list/TransactionList';
import {RootStackParamList} from '@/types/types';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={'TransactionList'}>
      <Stack.Screen name="TransactionList" component={TransactionList} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
};
