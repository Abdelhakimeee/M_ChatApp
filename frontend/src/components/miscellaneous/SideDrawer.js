import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userListItems from '../userAvatar/UserListItems'
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  //  useDisclosure() don't use .

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const navigate = useNavigate();

  const logoutHandleer = () => {
    localStorage.removeItem("userInfo");
    navigate("/")
  }

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Enter something in search", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
        toast.error("Error Occured! Failed to Load the Search Results", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      const onOpen = () => setIsOpen(true);
    } catch (error) {
      toast.error(`Error fetching the chat: ${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,

      });
    }
  };

  return (
    <div>
      {/* setIsOpen ?? work's  */}
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>  
        <div>
          <input
            type="text"
            placeholder="Search for users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
      </div>
       <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResult.map((user) => (
            <div key={user._id}>
              <button onClick={() => accessChat(user._id)}>
                {user.name}
              </button>
            </div>
          ))
        )}
      </div>
    
      {isOpen && (
        <div className="side-drawer">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <div>
            {/* محتوى الشريط الجانبي يمكن أن يتم هنا */}
            {loadingChat ? (
              <p>Loading chat...</p>
            ) : (
              <p>Chat opened successfully!</p>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default SideDrawer;