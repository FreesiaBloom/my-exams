import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  const pipe = new EllipsisPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null for empty value', () => {
    expect(pipe.transform(null)).toEqual(null);
  })

  it('should return transformed string for long value', () => {
    expect(pipe.transform("one two three four five six seven")).toEqual("one two three four five...");
  })

  it('should return not transformed string for short value', () => {
    expect(pipe.transform("one two three four five")).toEqual("one two three four five");
  })
});
