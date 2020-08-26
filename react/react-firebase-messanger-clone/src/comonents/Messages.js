import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import FlipMove from 'react-flip-move';

const CreateCards = forwardRef(({ userName, message }, ref) => {
  const isUser = userName === message.userName;
  return (
    <div
      ref={ref}
      key={message.id}
      className={`message ${isUser && 'message_user'}`}
    >
      <Typography
        className='message_cardContent_title'
        color='textSecondary'
        gutterBottom
      >
        {!isUser && `${message.userName || 'Unknown User'}`}
      </Typography>
      <Card className={isUser ? 'message_userCard' : 'message_card'}>
        <CardContent className='message_cardContent'>
          <Typography>{message.msg}</Typography>
        </CardContent>
      </Card>
    </div>
  );
});

function Messages({ userName, msg }) {
  return (
    <div>
      <FlipMove>
        {msg.map(message => (
          <CreateCards key={message.id} userName={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Messages;
