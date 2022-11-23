import {Avatar, Badge, Button, Center, Text, View} from 'native-base';
import {useEffect, useState} from 'react';
import {useAuth} from '../../lib/hooks/useAuth';
import * as Progress from 'react-native-progress';
import {useRooms} from '../../lib/hooks/userRooms';
import {DB} from '../../lib/database';
import Rooms, {TABLE_SUBSCRIPTIONS} from '../../lib/database/models/Rooms';
import EnhancedRoomsComponent from './RoomsComponent';

const RoomsScreen = ({navigation}: any) => {
  //@ts-ignore
  const [state, dispatch] = useAuth();
  const {data, fetch} = useRooms();
  const database = new DB().database;

  const sync = async () => {
    await Rooms.syncSubscriptions(database, data);
  };
 

  useEffect(() => {
    sync();
  }, []);

  return (
    <View>
      {!state.connected && (
        <Center style={{margin: 8}}>
          <Text>Connection...</Text>
          <Progress.Bar
            color={'green'}
            useNativeDriver={true}
            animationType={'timing'}
            indeterminate
            width={200}
          />
        </Center>
      )}
      <Button onPress={sync}>sync</Button>
      <Button onPress={fetch}>fetch</Button>
      <EnhancedRoomsComponent />
    </View>
  );
};

export default RoomsScreen;
