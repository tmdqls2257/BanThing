import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  .reply__column {
    display: flex;
    position: relative;
    padding: var(--padding-small);
    background-color: var(--gary-color);
  }
  input {
    height: 46px;
    width: 100%;
    border-radius: var(--border-radius-small);
    outline: none;
    border: none;
  }
  .input-button {
    color: var(--white-color);
    font-weight: var(--font-weight-bold);
  }
  .reply__column button {
    position: absolute;
    right: 0px;
    background-color: var(--orange-color);
    border: none;
    width: 77px;
    height: 46px;
    border-radius: var(--border-radius-small);
    padding: 0;
  }
`;
const NewChat = ({ onError }: any) => {
  const [tweet, setTweet] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('http://localhost:80/rooms/chat', {
      body: {
        rooms_id: 4,
        chat: tweet,
      },
    });
    setTweet('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(event.target.value);
  };
  return (
    <Container>
      <form className="reply__column" onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
        <button className="input-button">Enter</button>
      </form>
    </Container>
  );
};

export default NewChat;
