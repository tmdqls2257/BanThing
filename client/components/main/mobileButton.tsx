import { useState } from 'react';
import styled from 'styled-components';
import { BasicButtonProp, Direction } from '../type';

const Button = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 181px;
    height: 70px;
    border: none;
    border-radius: 20px 20px 0 0;
    background-color: var(--color-white);
    z-index: 2;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const MobileButton = () => {
  const [mobile, setMobile] = useState<Direction>('down');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    const sidebarContainer = document.querySelector(
      '#sidebarContainer',
    )! as HTMLElement;
    if (mobile === 'down') {
      sidebarContainer.style.top = '90vh';
      setMobile('up');
    } else if (mobile === 'up') {
      sidebarContainer.style.top = '10vh';
      setMobile('down');
    }
  };
  return (
    <Button>
      <button onClick={handleClick}>
        <i className="fa-solid fa-arrow-up"></i>
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </Button>
  );
};

export default MobileButton;
