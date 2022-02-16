import styles from "../../styles/Progress.module.css";

export default function Progress() {
  if (typeof window !== "undefined") {
    window.onscroll = function () {
      myFunction();
    };
  }

  function myFunction() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    const myBar = document.getElementById("myBar") as HTMLParagraphElement;
    if (myBar !== null) {
      myBar.style.width = scrolled + "%";
    }
  }

  return (
    <>
      <div className={styles.progress_container}>
        <div className={styles.progress_bar} id="myBar"></div>
      </div>
    </>
  );
}
