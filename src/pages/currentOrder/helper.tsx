// Tkss, Slack 😍
const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export function enumToArray(enumme: { [x: string]: any }) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}
