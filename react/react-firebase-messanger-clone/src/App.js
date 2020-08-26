import React, { useEffect, useState } from 'react';
import CreateMessage from './comonents/CreateMessage';
import Header from './comonents/Header';
import Messages from './comonents/Messages';
import './css/App.css';
import { firebaseRef } from './utils/firebase';
import { Container } from '@material-ui/core';

function App() {
  const [userName, setUserName] = useState('');
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    setUserName(prompt('Enter the UserName:'));
  }, []);

  useEffect(() => {
    console.log('fetch');
    subscribe();
    return () => subscribe();
  }, []);

  const subscribe = () => {
    firebaseRef.orderBy('created', 'desc').onSnapshot(snapshot =>
      setMsgList(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  };

  return (
    <div className='App'>
      <Container>
        <Header userName={userName} />
        {msgList.length ? <Messages userName={userName} msg={msgList} /> : null}
      </Container>
      <CreateMessage userName={userName} />
    </div>
  );
}

export default App;
