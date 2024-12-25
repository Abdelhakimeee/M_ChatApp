import React from 'react';
import './styles.css';
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      style={{
        display: selectedChat ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #ccc',
        display: window.innerWidth >= 768 ? 'flex' : selectedChat ? 'flex' : 'none',
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;