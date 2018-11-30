import { MonthNamePipe } from './month-name.pipe';

describe('MonthNamePipe', () => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  const pipe = new MonthNamePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return MONTH NAME [1, 3]', () => {
    const value = ['1', '3'];
    const valueFrom = value[0];
    const valueTo = value[1];

    expect(pipe.transform(value)).toEqual(`Jan`);
  });

  it('should return MONTH NAME \'2\'', () => {
    const value = '02';
    //const parseVal = parseInt(value, 10);
    expect(pipe.transform(value)).toEqual(`Feb`);
  });
});
