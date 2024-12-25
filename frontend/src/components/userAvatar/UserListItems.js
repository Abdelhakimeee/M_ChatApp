import React from "react";
import { ChatState } from "../../Context/ChatProvider";

    // dd the style in this make in his one  folder 
const UserListItem = ({ handleFunction }) => {
    const { user } = ChatState();

    return (
        <div
      onClick={handleFunction}
      style={{
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        padding: '10px 15px',
        marginBottom: '10px',
        borderRadius: '8px',
        width: '100%',
        transition: 'background 0.3s, color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#38B2AC';
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#E8E8E8';
        e.target.style.color = 'black';
      }}
    >
      <img
        src={user.pic}
        alt={user.name}
        style={{
          marginRight: '10px',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
        }}
      />
            <div>
                {/* dd all this style to folder Scss */}
        <p style={{ margin: 0 }}>{user.name}</p>
        <p style={{ fontSize: '12px', margin: 0 }}>
          <strong>Email: </strong>
          {user.email}
        </p>
      </div>
    </div>
    )
}

export default UserListItem;