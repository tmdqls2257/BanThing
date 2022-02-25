import styled from 'styled-components';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  font-family: 'Nanum Gothic', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  min-width: 400px;
  height: auto;
  margin: auto;
  min-height: 715px;

  img {
    width: 4.75rem;
  }
  p {
    font-size: var(--font-size-base);
    font-family: 'Nanum Gothic', sans-serif;
    color: #8e8e8e;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
  margin: var(--margine-base) auto;
  div {
    margin: var(--margine-small);
  }
  button {
    margin: 0;
    border: none;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    padding: 12px 16px;
    border-radius: 6px;
    color: #ffffff;
    width: 181px;
    background-color: #ff8a3d;
    @media screen and (max-width: 768px) {
      width: 10rem;
    }
  }
`;

const CreateRoom = () => {
  const onClick = () => {
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    createElement.style.display = 'none';
    makeRoom.style.display = 'flex';
  };
  return (
    <Container id="CreateRoom">
      <img
        src="https://cdn.discordapp.com/attachments/934007459763326976/943504292072026153/unknown.png"
        alt=""
      />
      <p>원하는 마크를 선택하거나 방을 만들어주세요.</p>
      <ButtonContainer>
        <button onClick={onClick}>방 만들기</button>
      </ButtonContainer>
    </Container>
  );
};

export default CreateRoom;
