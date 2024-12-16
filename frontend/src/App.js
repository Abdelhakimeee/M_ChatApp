import './App.css'; 
import { Routes, Route, } from "react-router-dom"
import ChatPage from './Pages/ChatPage';
import Homepage from './Pages/Homepage';
import ChatProvider from './Context/ChatProvider';


function App() {
  return (
    <div className="App">

      <ChatProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </ChatProvider>

      
    </div>
  );
}

export default App;
