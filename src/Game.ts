enum Roll {
  First = 0,
  Second = 1,
}

const MAX_PINS = 10;

export class Game {
  private totalScore: number;
  private pinsUp: number;
  private currentRoll: Roll;
  private currentFrame: number;

  constructor() {
    this.totalScore = 0;
    this.pinsUp = MAX_PINS;
    this.currentRoll = 0;
    this.currentFrame = 0;
  }

  public isFinished(): boolean {
		return this.currentFrame > 9;
  }

  public roll(pins: number): void {
    if (pins < 0 || pins > MAX_PINS) {
      throw new Error(`Invalid number of pins: ${pins}`);
    }

    if (pins > this.pinsUp) {
      throw new Error(
        `Number of pins is more than pins up: ${pins} > ${this.pinsUp}`
      );
    }
    this.totalScore += pins;
    this.pinsUp -= pins;

    this.nextRoll();
  }

  public score(): number {
    return this.totalScore;
  }

  private resetPins() {
    this.pinsUp = MAX_PINS;
  }

  private nextRoll() {
    if (this.currentRoll === Roll.Second) {
      this.currentRoll = Roll.First;
      this.resetPins();
      this.currentFrame += 1;
    } else {
      this.currentRoll = Roll.Second;
    }
  }
}
