import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  const pipe = new EllipsisPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null for empty value', () => {
    expect(pipe.transform(null)).toEqual(null);
  })
});
