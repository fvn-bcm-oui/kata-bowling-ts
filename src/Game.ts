type Spare = {
    kind: "spare";
    pinsDownAtFirstThrow: number;
    pinsDownAtSecondThrow: number;
};

type Strike = {
    kind: "strike";
};

type Normal = {
    kind: "normal";
    pinsDownAtFirstThrow: number;
    pinsDownAtSecondThrow: number;
};

type Frame = Normal | Strike | Spare;

const createFrame = (rolls: number[], rollsIndex: number): Frame => {
	if (rolls[rollsIndex] === 10)
		return { kind: "strike"}
	if (rolls[rollsIndex] + rolls[rollsIndex + 1] === 10) {
		return {
			kind: "spare",
			pinsDownAtFirstThrow: rolls[rollsIndex],
			pinsDownAtSecondThrow: rolls[rollsIndex + 1]
		}
	}
	return {
		kind: "normal",
		pinsDownAtFirstThrow: rolls[rollsIndex],
		pinsDownAtSecondThrow: rolls[rollsIndex + 1]
	};
}

const frameScore =
	(rolls: number[], rollsIndex: number, frame: Frame) => {
		switch (frame.kind) {
			case "strike":
				return rolls[rollsIndex + 1] + rolls[rollsIndex + 2];
			case "spare":
				return rolls[rollsIndex] + rolls[rollsIndex + 1] + rolls[rollsIndex + 2];
			case "normal":
				return rolls[rollsIndex] + rolls[rollsIndex + 1];
		}
	};

const nextTurn = (frame: Frame, rollsIndex: number) => {
	switch(frame.kind) {
		case 'strike': return rollsIndex + 1;
		default: return rollsIndex + 2;
	}
}

export class Game {
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
    	const frame = createFrame(this.rolls, rollsIndex);
    	score += frameScore(this.rolls, rollsIndex, frame);
			rollsIndex = nextTurn(frame, rollsIndex)
    }

    return score;
  }
}
