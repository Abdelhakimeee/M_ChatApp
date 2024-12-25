import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";

// /* Chat Header */
import "./styles.css";
// .chat-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 28px;
//   padding-bottom: 15px;
//   padding-left: 10px;
//   padding-right: 10px;
// }

// .back-button {
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// }

// /* Chat Container */
// .chat-container {
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   padding: 10px;
//   background-color: #e8e8e8;
//   width: 100%;
//   height: 100%;
//   border-radius: 10px;
//   overflow-y: hidden;
// }

// /* Messages Section */
// .messages {
//   margin-bottom: 20px;
// }

// /* Input Section */
// .input-container {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// .input-field {
//   width: 100%;
//   padding: 10px;
//   margin-top: 10px;
//   background-color: #e0e0e0;
//   border-radius: 5px;
//   font-size: 16px;
// }

// /* Spinner */
// .spinner {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 20px;
// }

// /* Typing Animation */
// .typing-animation {
//   display: flex;
//   justify-content: center;
// }

// /* No Chat Section */
// .no-chat {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
// }

// .no-chat h2 {
//   font-size: 24px;
//   text-align: center;
// }
const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert("Error occurred! Failed to load the messages");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        alert("Error occurred! Failed to send the message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="chat-header">
            <button
              className="back-button"
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIcon />
            </button>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <div>{getSender(user, selectedChat.users)}</div>
                  <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  <div>{selectedChat.chatName.toUpperCase()}</div>
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </div>
          <div className="chat-container">
            {loading ? (
              <div className="spinner">Loading...</div>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <div className="input-container">
              {istyping && (
                <div className="typing-animation">
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              )}
              <input
                className="input-field"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={sendMessage}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="no-chat">
          <h2>Click on a user to start chatting</h2>
        </div>
      )}
    </>
  );
};

export default SingleChat;