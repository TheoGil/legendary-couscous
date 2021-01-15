import Tile from "./Tile";

class TileFactory {
  constructor() {
    this.sound = true;
    this.tiles = [];

    const tileEls = document.querySelectorAll(".js-tile");
    for (let i = 0; i < tileEls.length; i++) {
      this.tiles.push(
        new Tile({
          element: tileEls[i],
        })
      );
    }
  }

  onToggleSound() {
    this.sound = !this.sound;
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].setSound(this.sound);
    }
  }
}

export default TileFactory;
