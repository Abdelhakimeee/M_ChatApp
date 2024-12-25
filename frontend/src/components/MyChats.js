import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";
// import './styles.css';   using  scss
// /* MyChats Styles */    changet to Scss
// .my-chats {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: white;
//   width: 100%;
//   border-radius: 8px;
//   border: 1px solid #ccc;
// }

// .my-chats.no-chat {
//   display: none;
// }

// .header {
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   font-size: 30px;
//   font-family: 'Work sans', sans-serif;
// }

// .new-chat-btn {
//   font-size: 17px;
//   display: flex;
//   align-items: center;
//   padding: 8px;
//   background-color: #38B2AC;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .new-chat-btn:hover {
//   background-color: #2c8b7d;
// }

// .chats-list {
//   display: flex;
//   flex-direction: column;
//   padding: 15px;
//   background-color: #f8f8f8;
//   width: 100%;
//   height: 100%;
//   border-radius: 8px;
//   overflow-y: hidden;
// }

// .chats-stack {
//   overflow-y: scroll;
// }

// .chat-item {
//   padding: 10px;
//   margin: 5px;
//   background-color: #e8e8e8;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s;
// }

// .chat-item.selected {
//   background-color: #38B2AC;
//   color: white;
// }

// .message-preview {
//   font-size: 12px;
//   color: gray;
// }

// .chat-item:hover {
//   background-color: #d0d0d0;
// }
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      alert("Error Occurred! Failed to Load the chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className={`my-chats ${selectedChat ? 'no-chat' : ''}`}>
      <div className="header">
        <span>My Chats</span>
        <GroupChatModal>
          <button className="new-chat-btn">
            New Group Chat
          </button>
        </GroupChatModal>
      </div>

      <div className="chats-list">
        {chats ? (
          <div className="chats-stack">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`chat-item ${selectedChat === chat ? "selected" : ""}`}
                key={chat._id}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
                {chat.latestMessage && (
                  <p className="message-preview">
                    <strong>{chat.latestMessage.sender.name} : </strong>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;