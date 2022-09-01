import Phaser from "phaser";
import { maps } from "../constants/maps";

import imageWall from "../assets/wall.png";
import imageTarget from "../assets/target.png";
import imageBox from "../assets/box.png";
import imagePlayer from "../assets/player.png";

const BLOCK_SIZE = 32;
export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Game", active: true });

    this.currentMap = 0;
  }

  init(data) {}

  preload() {
    // Load box image
    this.load.image("box", imageBox);
    // Load target image
    this.load.image("target", imageTarget);
    // Load player image
    this.load.image("player", imagePlayer);
    // Load wall image
    this.load.image("wall", imageWall);
  }

  create() {
    this.playerDirection = "up";

    // Create map
    this.createMap();
  }

  mapXToScreen = (x) => {
    return x * BLOCK_SIZE;
  };

  mapYToScreen = (y) => {
    return y * BLOCK_SIZE;
  };

  createMap() {
    const map = maps[this.currentMap];
    map.forEach((row, y) => {
      const rowArray = row.split("");
      rowArray.forEach((block, x) => {
        if (block === "#") {
          // Create wall
          const wall = this.add.image(this.mapXToScreen(x), this.mapYToScreen(y), "wall");
          // Set wall origin to top left
          wall.setOrigin(0, 0);
          // scale the wall to the block size
          wall.setScale(BLOCK_SIZE / wall.width);
        } else if (block === ".") {
          // Create target
          const target = this.add.image(this.mapXToScreen(x), this.mapYToScreen(y), "target");
          // Set target origin to top left
          target.setOrigin(0, 0);
          // scale the target to the block size
          target.setScale(BLOCK_SIZE / target.width);

        } else if (block === "@") {
          // Create player
          this.player = this.add
            .image(this.mapXToScreen(x), this.mapYToScreen(y), "player")
            .setOrigin(0);
          // scale the player to the block size
          this.player.setScale(BLOCK_SIZE / this.player.width);

        } else if (block === "$") {
          // Create box
          const box = this.add.image(this.mapXToScreen(x), this.mapYToScreen(y), "box");
          // Set box origin to top left
          box.setOrigin(0, 0);
          // scale the box to the block size
          box.setScale(BLOCK_SIZE / box.width);

        } else if (block === "+") {
          // Create box on target
          const target = this.add.image(this.mapXToScreen(x), this.mapYToScreen(y), "target");
          // Set target origin to top left
          target.setOrigin(0, 0);
          // scale the target to the block size
          target.setScale(BLOCK_SIZE / target.width);

          const box = this.add.image(this.mapXToScreen(x), this.mapYToScreen(y), "box");
          // Set box origin to top left
          box.setOrigin(0, 0);
          // scale the box to the block size
          box.setScale(BLOCK_SIZE / box.width);

        } else if (block === "*") {
          // Create player on target
          const target = this.add.image(this.mapXToScreen(x), this.mapYToScreen(y), "target");
          // Set target origin to top left
          target.setOrigin(0, 0);
          // scale the target to the block size
          target.setScale(BLOCK_SIZE / target.width);

          this.player = this.add
            .image(this.mapXToScreen(x), this.mapYToScreen(y), "player")
            .setOrigin(0);
          // scale the player to the block size
          this.player.setScale(BLOCK_SIZE / this.player.width);
          
        }
      });
    });
  }

  update() {}
}
