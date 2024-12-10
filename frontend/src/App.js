import './App.css'; 
import {Route, } from "react-router-dom"
import ChatPage from './components/ChatPage';
import Homepage from './Pages/Homepage';


function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} />
      <Route path="/chats" component={ChatPage } />

      
    </div>
  );
}

export default App;
