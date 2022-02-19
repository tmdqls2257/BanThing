import Button from './button';
import styled from 'styled-components';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-width: 30vw;
  min-height: 715px;

  height: auto;
  img {
    width: var(--img-size);
  }
  article {
    margin: auto;
  }
  .JoinRoom-title {
    display: flex;
  }
  .JoinRoom-profile {
    p {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-bold);
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--orange-color);
  }
  .JoinRoom-profile-rate {
    background-color: var(--orange-color);
    color: var(--white-color);
    border-radius: var(--border-radius-base);
    width: 95px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .JoinRoom-content_p {
    height: auto;
    width: var(--sidebar-content-width);
  }
  h3 {
    font-size: var(--font-size-base);
  }
  div {
    display: inline-block;
    margin-top: var(--margine-base);
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
  margin: var(--margine-base) auto;
`;

const JoinRoom = () => {
  return (
    <Container id="JoinRoom">
      <section className="JoinRoom-profile">
        <img
          src="https://cdn.discordapp.com/attachments/934007459763326976/943866955880878120/unknown.png"
          alt=""
        />
        <p>방장의 평점</p>
        <div className="JoinRoom-profile-rate">9.6 (12)</div>
      </section>
      <article>
        <section className="JoinRoom-title">
          <div>
            <h3>제목</h3>
            <h3>카테고리</h3>
            <h3>역할</h3>
          </div>
          <div>
            <p>치킨 같이 드실 분?</p>
            <p>치킨</p>
            <p>가지러 가는 사람</p>
          </div>
        </section>
        <section className="JoinRoom-content">
          <h3>내용</h3>
          <p className="JoinRoom-content_p">
            치킨이 너무 먹고 싶은데 혼자 한 마리 다 못 먹어요.. 반반 시켜서
            양념만 가져가실 분 구합니다!
            <br></br>
            <br></br>
            웬만한 브랜드는 안 가리고 잘 먹어요.
            <br></br>
            바삭하게 튀긴게 먹고 싶어서 지코바 주문하시려는 분은 죄송해요.
            <br></br>
            <br></br>
            주문,배달비 둘 다 반반씩 부담해요
          </p>
        </section>
      </article>
      <ButtonContainer>
        <Button containerName={'JoinRoom'}>참여하기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default JoinRoom;
