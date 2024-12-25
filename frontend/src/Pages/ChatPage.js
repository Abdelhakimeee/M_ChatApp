import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";


function ChatPage() {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div>
            {user && <SideDrawer />}
            <div>
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </div>

        </div>
  )
}

export default ChatPage;