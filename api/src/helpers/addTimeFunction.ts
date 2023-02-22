export default function addMinutes(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() + minutes);

  const data = date.toLocaleString('pl');

  return data;
}
