import styles from './loading.module.css';
import { loadingState } from '../../type';

const Loading = ({ state }: loadingState) => {
  if (state === true) {
    const loadingClose = document.querySelector('#loader')! as HTMLElement;
    loadingClose.style.display = 'none';
  }
  return <section className={styles.loader} id="loader"></section>;
};

export default Loading;
