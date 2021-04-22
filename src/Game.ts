export default class Game {
  private rolls: number[];

  public constructor() {
    this.rolls = [];
  }

  public roll(knockedPins: number): void {
    this.rolls.push(knockedPins);
  }

  public score(): number {
    let score = 0;

    let rollsIndex = 0;
    for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
      const frame = new Frame(this.rolls[rollsIndex], this.rolls[rollsIndex + 1]);
      if (frame.isStrike()) {
        score += this.scoreAStrike(rollsIndex);
        rollsIndex += 1;
      } else if (this.isSpare(rollsIndex)) {
        score += this.scoreASpare(rollsIndex);
        rollsIndex += 2;
      } else {
        score += this.scoreDefault(rollsIndex);
        rollsIndex += 2;
      }
    }

    return score;
  }

  private scoreAStrike(rollsIndex: number) {
    return this.rolls[rollsIndex] + this.rolls[rollsIndex + 1] + this.rolls[rollsIndex + 2];
  }

  private isStrike(rollsIndex: number) {
    return this.rolls[rollsIndex] === 10;
  }

  private scoreDefault(rollsIndex: number) {
    return this.rolls[rollsIndex] + this.rolls[rollsIndex + 1];
  }

  private isSpare(rollsIndex: number): boolean {
    return (this.rolls[rollsIndex] + this.rolls[rollsIndex + 1]) === 10;
  }

  private scoreASpare(rollsIndex: number): number {
    return this.rolls[rollsIndex] + this.rolls[rollsIndex + 1] + this.rolls[rollsIndex + 2];
  }

}

class Frame {

  public constructor(private firstRollKnokPins: number, private secondRollKnokPins: number) {}

  public isStrike(): boolean {
    return this.firstRollKnokPins === 10;
  }

}
