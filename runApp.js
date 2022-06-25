import { Controller } from './controller/Controller.js';
import { View } from './view/View.js';
import { Board } from './model/Board.js';

let TODO =
"VERSION: random play (v1.0)" + '\n' + '\n' +
"-- TODO --" + '\n' + '\n' +
"* points visualizer"


function initGame() {
  const controller = new Controller(new Board(), new View());
  controller.initController();
  console.log(TODO);
}

initGame();
