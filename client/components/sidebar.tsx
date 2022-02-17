import styled from 'styled-components'
import Button from './button'

const CreateRoom = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  p {
    font-size: 16px;
    color: #8e8e8e;
  }
`
const JoinRoom = styled.div`
  display: none;
  margin: 0 auto;
  width: 30vw;
  justify-content: space-between;
  position: relative;
  header {
    display: flex;
    justify-content: center;
  }
  i {
    position: absolute;
    left: 8px;
    margin: auto;
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
        <i className="fa-solid fa-angle-left"></i>
        <header>
          <h1>방 만들기</h1>
        </header>
      </JoinRoom>
    </>
  )
}

export default Sidebar
