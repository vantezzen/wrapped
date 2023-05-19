// Lookup of the closest lower value in an object by a key
// E.g. lookup(100, { 50: "Hello", 200: "World" }) => "Hello"

export default function lookup<T>(
  value: number,
  object: { [key: number]: T }
): T {
  const keys = Object.keys(object)
    .map((key) => parseInt(key))
    .sort((a, b) => a - b);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (value < key) {
      return object[key];
    }
  }
  return object[keys[keys.length - 1]];
}
