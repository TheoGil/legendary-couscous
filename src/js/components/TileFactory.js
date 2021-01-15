import Tile from "./Tile";

class TileFactory {
  constructor() {
    const tileEls = document.querySelectorAll(".js-tile");
    for (let i = 0; i < tileEls.length; i++) {
      new Tile({
        element: tileEls[i],
      });
    }
  }
}

export default TileFactory;
