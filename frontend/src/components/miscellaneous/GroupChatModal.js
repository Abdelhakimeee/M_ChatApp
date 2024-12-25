import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../userAvatar/UserListItems";
import UserBadgetItem from "../userAvatar/UserBadgeItem";

const GroupChatModal = ({ Children }) => {
    const [groupChatName, setGroupChatName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { user, chats, setChats } = ChatState();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            alert("User already added");
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };
    
    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Failed to load the Search Results");
            setLoading(false);
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleSubmit = async () => {
        if (!groupChatName || selectedUsers.length === 0) {
            alert("Please Fill all the fields");
            return;
        }
    
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            closeModal();
            alert("New Group Chat Created!");
        } catch (error) {
            alert("Failed to Create the Chat!");
        }
    };
    return (
        <>
            <span onClick={openModal}>{children}</span>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Create Group Chat</h2>
                            <button className="close-button" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Chat Name"
                                    value={groupChatName}
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Add Users eg: John, Piyush, Jane"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div className="selected-users">
                                {selectedUsers.map((u) => (
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleDelete(u)}
                                    />
                                ))}
                            </div>
                            <div className="search-results">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    searchResult?.slice(0, 4).map((user) => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleGroup(user)}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSubmit} className="submit-button">
                                Create Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GroupChatModal;