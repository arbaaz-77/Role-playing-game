import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

class Character {
  constructor(data) {
    Object.assign(this, data);
    this.diceArray = getDicePlaceholderHtml(this.diceCount);
    this.maxHealth = this.health;
  }

  getDiceHtml = () => {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((num) => {
        return `<div class="dice">${num}</div>`;
      })
      .join("");
  };

  getCharacterHtml = () => {
    const { name, avatar, health, diceCount, diceArray } = this;
    const healthBar = this.getHealthBarHtml();

    return `<div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}"/>
        <p class="health">health: <b> ${health} </b></p>
        ${healthBar}
        <div class="dice-container"> ${diceArray} </div>
    </div>`;
  };

  getHealthBarHtml = () => {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
    <div class="health-bar-inner ${percent <= 25 ? "danger" : ""} " 
        style="width: ${percent}%;">
    </div>
</div>`;
  };

  takeDamage = (attackScoreArray) => {
    const totalAttackScore = attackScoreArray.reduce(
      (acc, score) => acc + score
    );

    this.health -= totalAttackScore;

    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  };
}

export default Character;
