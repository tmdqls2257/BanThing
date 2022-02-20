import styles from '../../styles/main/RateButton.module.css';

import { RateButtonProp } from '../type';

function RateButton({ containerName, children }: RateButtonProp) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
  };
  return (
    <button
      className={styles.rate_button}
      onClick={handleClick}
      value={containerName}
    >
      {children}
    </button>
  );
}

export default RateButton;
