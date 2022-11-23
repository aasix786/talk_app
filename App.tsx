import React from 'react';
import {NativeBaseProvider} from 'native-base';
import { UserProvider} from './app/lib/contexts/User';
import StackMain from './app/stacks/StackMain';


export default function App() {

  return (
    <UserProvider>
      <NativeBaseProvider>
        <StackMain/>
      </NativeBaseProvider>
    </UserProvider>
  );
}
