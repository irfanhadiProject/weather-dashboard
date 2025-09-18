export function convertTemp(tempC, unit) {
  if (unit === 'F') {
    return (tempC * 9) / 5 + 32;
  }
  return tempC;
}
