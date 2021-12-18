import { Controller } from './controller/Controller.js';
import { View } from './view/View.js';
import { Board } from './model/Board.js';

function initGame() {
    const controller = new Controller(new Board(), new View());
    controller.initController();
}

initGame();
