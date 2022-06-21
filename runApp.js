import { Controller } from './controller/Controller.js';
import { View } from './view/View.js';
import { Board } from './model/Board.js';

let TODO =
"VERSION: random play (v1.0)" + '\n' + '\n' +
"-- TODO --" + '\n' + '\n' +
"1) make black and white discs (merge mesh)" + '\n' +
"2) disc flip animation" + '\n' + 
"3) fix camera" + '\n'  + 
"4) points visualizer"


function initGame() {
  const controller = new Controller(new Board(), new View());
  controller.initController();
  console.log(TODO);
}

initGame();
