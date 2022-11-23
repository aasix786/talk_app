import {useEffect, useState} from 'react';
import {fetchRoomsList} from '../services/connect';

export const useRooms = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const rooms = await fetchRoomsList();
    setData(rooms);
  };
  useEffect(() => {
    fetch();
  }, []);
  return {data, fetch};
};
