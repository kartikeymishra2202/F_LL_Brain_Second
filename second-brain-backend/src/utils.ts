export function Random(len: number) {
  const str = "qwerrjgdjkfhgsfhkjdgsu65364762387420";
  const size = str.length;
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += str[Math.floor(Math.random() * size)];
  }
  return ans;
}
