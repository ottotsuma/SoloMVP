import React from 'react'


const MessagesList = (props) => {
  const array = props.numbers;
  const listItems = array.map((items) =>
  <li key={items.toString()}>
  {items}
  </li>
  );
  return (
    <ul>{listItems}</ul>
  )
}

export default MessagesList
