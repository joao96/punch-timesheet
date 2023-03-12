import { Moment } from './moment';

describe('Moment', () => {
  it('should be able to create a moment', () => {
    const moment = new Moment('2023-03-11T08:00:00');

    expect(moment).toBeTruthy();
  });

  it('should not be able to create a moment with invalid format', () => {
    expect(() => new Moment('11-03-2023T08:00:00')).toThrow(
      'Data e hora em formato inválido.',
    );
  });
});
