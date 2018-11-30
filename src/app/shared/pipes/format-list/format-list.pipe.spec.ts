import { FormatListPipe } from './format-list.pipe';

describe('FormatListPipe', () => {
  const pipe = new FormatListPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should return "abcd"', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'])).toEqual('a\nb\nc\nd');
  });

  it('Should return abc123', () => {
    expect(pipe.transform(['a', 'b', 'c', 1, 2, 3])).toEqual(
      'a\nb\nc\n1\n2\n3'
    );
  });

  it('Should return 1a2a3', () => {
    expect(pipe.transform([1, 2, 3])).not.toEqual('1\na\n2\na\n3');
  });

  it('Should return the value unchanged', () => {
    expect(pipe.transform('a')).toEqual('a');
  });

  it('Should return the value unchanged object', () => {
    expect(pipe.transform({ a: '1' })).toEqual({ a: '1' });
  });

  it('should return null', () => {
    expect(pipe.transform(null)).toBe(null);
  });

  it('should return not to return undefined', () => {
    expect(pipe.transform([])).toEqual('');
  });

  it('should return not to equal undefined', () => {
    expect(pipe.transform([])).not.toEqual(undefined);
  });
});
