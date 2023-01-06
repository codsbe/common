import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';

/**
 * ~~~
 * getWeekdaysNames() // [Mon, Tue, Wed, ..., Sun]
 * getWeekdaysNames({ longFormat: true }) // [Monday, Tuesday, ..., Sunday]
 * ~~~
 */
export function getWeekdaysNames(options: { longFormat?: boolean } = {}): string[] {
  const week = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) });
  return week.map(day => format(day, options.longFormat ? 'iiii' : 'E'));
}
