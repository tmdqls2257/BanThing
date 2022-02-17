import styled from 'styled-components'
import Button from './button'
import SidebarHeader from './sidebarHeader'

const CreateRoom = styled.div`
  display: none;
  flex-direction: column;
  width: 30vw;
  margin: auto;
  p {
    font-size: 16px;
    color: #8e8e8e;
  }
`
const MakeRoom = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;

  main {
    display: flex;
    flex-direction: column;
    width: 332px;
    justify-content: space-between;
    margin: auto;
  }
  .flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    input,
    select {
      display: flex;
      width: 200px;
      font-size: 16px;
    }
  }
  .radio {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-direction: flex-start;
    input {
      margin-right: 16px;
    }
  }
  .content {
    border: none;
    border-radius: 25px;
    background-color: #f4f4f4;
    width: 332px;
    height: 380px;
  }
`

const JoinRoom = styled.div``

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
`
const Sidebar = () => {
  return (
    <>
      <CreateRoom>
        <img
          src="https://cdn.discordapp.com/attachments/934007459763326976/943504292072026153/unknown.png"
          alt=""
        />
        <p>원하는 마크를 선택하거나 방을 만들어주세요.</p>
        <Button disabled>방 만들기</Button>
      </CreateRoom>
      <MakeRoom>
        <SidebarHeader>방 만들기</SidebarHeader>
        <main>
          <section className="flex">
            <p>제목</p>
            <input type="text" />
          </section>
          <section className="flex">
            <p>카테고리</p>
            <select id="choise-foods">
              <option value=""></option>
              <option value="치킨">치킨</option>
              <option value="햄버거">햄버거</option>
              <option value="피자">피자</option>
            </select>
          </section>
          <p>역할</p>
          <section className="radio">
            <input type="radio" />
            <p>받는 사람</p>
          </section>
          <section className="radio">
            <input type="radio" />
            <p>가지러 가는 사람</p>
          </section>
          <section>
            <p>내용</p>
            <input className="content" type="text" />
          </section>
        </main>
        <ButtonContainer>
          <Button disabled>생성하기</Button>
        </ButtonContainer>
      </MakeRoom>
      <JoinRoom></JoinRoom>
    </>
  )
}

export default Sidebar
