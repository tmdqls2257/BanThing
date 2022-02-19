import styled from 'styled-components';
import { loadingState } from '../type';

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid var(--white-color);
  border-radius: 50%;
  border-top: 16px solid var(--orange-color);
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ state }: loadingState) => {
  if (state === true) {
    const loadingClose = document.querySelector('.loader')! as HTMLElement;
    loadingClose.style.display = 'none';
  }
  return (
    <>
      <Loader className="loader"></Loader>
    </>
  );
};

export default Loading;
