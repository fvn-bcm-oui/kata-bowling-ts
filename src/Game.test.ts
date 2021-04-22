import Game from './Game';

describe('Game', () => {
  const rollHelper = (
    game: Game,
    rounds: number,
    pinsKnocked: number
  ): void => {
    for (let i = 0; i < rounds; i++) {
      game.roll(pinsKnocked);
    }
  };
  it('should score 0 when rolling all gutters', () => {
    const game = new Game();

    rollHelper(game, 20, 0);

    expect(game.score()).toEqual(0);
  });

  it('Should score 20 when knocking all ones', () => {
    const game = new Game();

    rollHelper(game, 20, 1);

    expect(game.score()).toEqual(20);
  });

  it('Should score ?? when all gutters but last frame is a spare ', () => {
    const game = new Game();

    game.roll(5); // score(0) = 5 // scoreCumul(0) = 5
    game.roll(5); // score(1) = 5 + x // scoreCumul(1) = ???
    game.roll(6); // score(2) = x = 6 // scoreCumul(2) = 22
    rollHelper(game, 17, 0);

    expect(game.score()).toEqual(22);
  });

  it('Should score ?? when 2 rolls in a row makes 10 but there is no spare (not in same frame)', () => {
    const game = new Game();

    game.roll(0);
    game.roll(5);
    game.roll(5);
    game.roll(4);
    rollHelper(game, 16, 0);

    expect(game.score()).toEqual(14);
  });

  it('Should score 10 when 1 strike and all gutters', () => {
    const game = new Game();

    game.roll(10);
    rollHelper(game, 18, 0);

    expect(game.score()).toEqual(10);
  });

  it('Should score ?? when 1 strike and all ones', () => {
    const game = new Game();

    game.roll(10);
    rollHelper(game, 18, 1);

    expect(game.score()).toEqual(10 + 2 * 2 + 16 * 1);
  });
});
