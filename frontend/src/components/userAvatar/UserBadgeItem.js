import React from 'react';

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    // dd the style in this make in his one  folder 
  return (
    <div
      style={{
        padding: '5px 10px',
        borderRadius: '12px',
        margin: '5px',
        marginBottom: '10px',
        backgroundColor: '#9b59b6',
        color: 'white',
        fontSize: '12px',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={handleFunction}
    >
      <span>{user.name}</span>
      {admin === user._id && <span> (Admin)</span>}
      <button
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          marginLeft: '5px',
          cursor: 'pointer',
        }}
        onClick={handleFunction}
      >
        &#10005; {/* This is the Close icon */}
      </button>
    </div>
  );
};


export default UserBadgeItem;
