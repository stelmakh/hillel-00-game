var { Field, Character, Log } = require('game')

document.addEventListener('DOMContentLoaded', function() {
  var field = new Field('.GameField')
  var log = new Log('.Log')

  log.write('Game initialized')

  var hero = new Character('hero', 'Tandar', 24, 16, 4, 1, 8, 2);
  field.update(hero)
  var villain = new Character('villain', 'Corgak', 28, 14, 5, 1, 6, 3);
  field.update(villain)

  var makeTurn = function() {
    hero.performAttack(villain, field, log)
    villain.performAttack(hero, field, log)
  }
  document.querySelector('#button-turn').addEventListener("click", makeTurn)

});
