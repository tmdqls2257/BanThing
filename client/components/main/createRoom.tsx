import styled from 'styled-components';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 30vw;
  height: auto;
  margin: auto;
  min-height: 715px;

  img {
    width: 4.75rem;
  }
  p {
    font-size: var(--font-size-base);
    color: #8e8e8e;
  }
`;

const Button = styled.div`
  display: flex;
  margin: auto;
  margin: var(--margine-base) auto;
  div {
    margin: var(--margine-small);
  }
`;

const CreateRoom = () => {
  return (
    <Container id="CreateRoom">
      <img
        src="https://cdn.discordapp.com/attachments/934007459763326976/943504292072026153/unknown.png"
        alt=""
      />
      <p>원하는 마크를 선택하거나 방을 만들어주세요.</p>
      <Button>
        <button>방 만들기</button>
      </Button>
    </Container>
  );
};

export default CreateRoom;
