import {Button, Text, View} from 'native-base';
import {useEffect} from 'react';
import {DB} from '../../lib/database';

const WatermelonDB = ({navigation}) => {
const db = new DB();


  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    const fetchData = await db.database.get('posts').query().fetch()

    console.log('fetchData:::',fetchData)
  }

  const test = async () => {

    const postsCollection = db.database.get('posts');

    db.database.write(async () => {
      const inserted = await postsCollection.create((post: any) => {
        post.title = 'test';
        post.subtitle = 'test';
        post.body = 'test';
      });
      console.log('inserted:::', inserted)
    });
  };


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>WatermelonDB Screen</Text>

      <Button onPress={test}>Test</Button>
    </View>
  );
};

export default WatermelonDB;
