import { Temporal } from 'temporal-polyfill';

export default function countdown(
  endDate,
  timerId,
  preDeathTagline,
  postDeathTagline
) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const endOfLife = Temporal.Instant.from(endDate).toZonedDateTimeISO(timeZone);

  setInterval(render, 1000);

  function getUiText() {
    const now = Temporal.Now.zonedDateTimeISO(timeZone);
    const duration = now.until(endOfLife).round({ relativeTo: now, largestUnit: 'year', smallestUnit: 'second' });

    const { sign } = duration;
    let { years, months, days, hours, minutes, seconds } = duration.abs();

    [years, months, days] = [years, months, days].map(String);
    [hours, minutes, seconds] = [hours, minutes, seconds].map(x => `${x}`.padStart(2, '0'));

    const tagline = sign > 0 ? preDeathTagline : postDeathTagline;

    return { tagline, years, months, days, hours, minutes, seconds };
  }

  function render() {
    for (const [key, val] of Object.entries(getUiText())) {
      document.querySelector(`#${timerId} .${key}`).textContent = val;
    }
  }
}
