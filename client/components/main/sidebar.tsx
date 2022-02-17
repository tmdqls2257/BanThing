import styled from 'styled-components'
import Button from './button'

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
const JoinRoom = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  header {
    display: flex;
    justify-content: center;
    text-align: center;
  }
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
      <JoinRoom>
        <header>
          <div>
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div>
            <h1>방 만들기</h1>
          </div>
          <div>1</div>
        </header>
        <main>
          <section>
            <p>제목</p>
            <input type="text" />
          </section>
          <section>
            <p>카테고리</p>
            <input type="text" />
          </section>
          <section>
            <p>역할</p>
            <input type="radio" />
            <p>받는 사람</p>
            <input type="radio" />
            <p>가지러 가는 사람</p>
          </section>
          <section>
            <p>내용</p>
            <input type="text" />
          </section>
          <Button disabled>생성하기</Button>
        </main>
      </JoinRoom>
    </>
  )
}

export default Sidebar
