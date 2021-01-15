import "./../scss/styles.scss";
import TileFactory from "./components/TileFactory";

const TF = new TileFactory();

const toggleSoundBtnEl = document.querySelector(".js-toggle-sound");
toggleSoundBtnEl.addEventListener("click", () => {
  toggleSoundBtnEl.classList.toggle("toggle-sound-button--muted");
  TF.onToggleSound();
});
