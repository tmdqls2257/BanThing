import styled from 'styled-components'
const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 32px;
  margin: var(--margine-base) 0;
  div {
    display: flex;
    text-align: center;
  }
  h1 {
    font-size: var(--font-size-base);
    margin: auto;
  }
  i {
    position: absolute;
    top: 30%;
    left: 16px;
  }
`

type SidebarHeaderType = {
  children: string
}

const SidebarHeader = ({ children }: SidebarHeaderType) => {
  return (
    <Header>
      <div>
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div>
        <h1>{children}</h1>
      </div>
    </Header>
  )
}

export default SidebarHeader
