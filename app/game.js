var utils = {
  updateElement: function(path, value) {
    if (element = document.querySelector(path, value)) {
      element.innerText = value;
    }
  },
  d: function(num){
    return Math.floor(Math.random() * num) + 1;
  },
  capitalize: function(str){
    return str[0].toUpperCase() + str.slice(1)
  }
}

var Character = function(selector, name, health, armor, attack, damageMultiplier, damageBase, damageModifier){
  this.selector = selector;
  this.name = name;
  this.health = health;
  this.armor = armor;
  this.attack = attack;
  this.damageMultiplier = damageMultiplier;
  this.damageBase = damageBase;
  this.damageModifier = damageModifier;
}

Character.prototype.performAttack = function(target, field, log) {
  var d = utils.d
  var cap = utils.capitalize

  var attackRoll = d(20) + this.attack;

  if (attackRoll < target.armor)
    log.write(`${cap(this.name)} fails to hit ${cap(target.name)}`)
  else {
    var dmg = this.damageMultiplier * d(this.damageBase) + this.damageModifier
    target.health = target.health - dmg
    if (field)
      field.update(target)
    if (log)
      log.write(`${cap(this.name)} hits ${cap(target.name)} with ${dmg} damage`)
  }
}

var Field = function(selector){
  this.selector = selector;
}

Field.prototype.update = function(character){
  var selector = this.selector;

  if (charSelector = character.selector) {
    var prefix = selector + ' #' + charSelector + '-';

    if (character.name)
      utils.updateElement(prefix + 'name', character.name)
    if (character.health)
      utils.updateElement(prefix + 'health', character.health)
    if (character.armor)
      utils.updateElement(prefix + 'armor', character.armor)
    if (character.attack)
      utils.updateElement(prefix + 'attack', '+' + character.attack)
    if (character.damageMultiplier && character.damageBase && character.damageModifier)
      utils.updateElement(prefix + 'damage', character.damageMultiplier + 'd' + character.damageBase + ' + ' + character.damageModifier)
  }
}

var Log = function(selector){
  this.selector = selector;
}

Log.prototype.write = function(text) {
  if (element = document.querySelector(this.selector)) {
    element.innerHTML = `<div class="${this.selector.slice(1)}Item">${text}</div>` + element.innerHTML
  }

}

module.exports = { Field, Character, Log }
