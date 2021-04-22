import { Game } from './Game';

describe('Game', () => {
  it("should give 0 score when player hasn't played yet", () => {
    // Arrange
    const game = new Game();

    // Act
    const answer = game.score();

    // Assert
    expect(answer).toBe(0);
  });

  it('should give > 0 score when pins have fell', () => {
    // Arrange
    const game = new Game();

    // Act
    game.roll(5);
    const answer = game.score();

    // Assert
    expect(answer).toBe(5);
  });

  it('should sum pins down when player rolls twice', () => {
    // Arrange
    const game = new Game();

    // Act
    game.roll(4);
    game.roll(5);
    const answer = game.score();

    // Assert
    expect(answer).toBe(9);
  });

  it('should throw exception when number of pins is negative', () => {
    // Arrange
    const game = new Game();

    // Act
    expect(() => game.roll(-1)).toThrow('Invalid number of pins: -1');
  });

  it('should throw exception when number of pins is greater than 10', () => {
    // Arrange
    const game = new Game();

    // Act
    expect(() => game.roll(11)).toThrow('Invalid number of pins: 11');
  });

  it('should throw exception when number of pins is greater than number of pins up', () => {
    // Arrange
    const game = new Game();

    // Act
    game.roll(5);
    expect(() => game.roll(6)).toThrow(
      'Number of pins is more than pins up: 6 > 5'
    );
  });

  it('should throw exception when number of pins is greater than number of pins up', () => {
    // Arrange
    const game = new Game();

    // Act
    game.roll(4);
    game.roll(4);
    game.roll(4);

    // Assert
    expect(game.score()).toBe(12);
  });

  it('should continue the game when last roll has not been played', () => {
    // Arrange
    const game = new Game();

    // Act
    game.roll(4);

    // Assert
    expect(game.isFinished()).toBeFalsy();
  });

  it('should finish the game when last roll has been played', () => {
    // Arrange
    const game = new Game();

    // Act
    for (let i = 0; i < 10; i++) {
      game.roll(4);
      game.roll(4);
    }

    // Assert
    expect(game.isFinished()).toBeTruthy();
  });
});
