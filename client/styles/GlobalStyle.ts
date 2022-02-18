import { createGlobalStyle } from 'styled-components'
// 변수명 앞에 두 개의 대시(--)를 붙여서 사용합니다.
// :root 의사 클래스는 문서 트리의 루트 요소를 선택합니다. <html> 요소와 동일합니다.
const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-large: 2rem;
    --font-size-md: 1.5rem;
    --font-size-base: 1rem;
    
    --color-white: white; // 간단하게 white로 설정했지만, 보통은 rgb값이나 hex값으로 설정합니다.
    --color-orange: #FF8A3D;

    --padding-large: 4rem;
    --padding-base: 1rem;
    --padding-small: 0.5rem;

    --margine-small:0.5rem;
    --margine-base: 1rem;
    --margine-large: 1.5rem;

    --border-radius-base: 25px;
    --border-radius-small: 10px;

    --sidebar-content-width: 332px;

    --img-size:113px;

    --orange-color:#ff8a3d;
    --chat-by-me-color:#FFB381;
    --chat-background-color:#FFEEDE;
    --white-color:#FFFFFF;
    --gary-color:#E3E3E3;

    --font-weight-bold: 800;
    --font-weight-normal: 400;
  }
`
export default GlobalStyle
