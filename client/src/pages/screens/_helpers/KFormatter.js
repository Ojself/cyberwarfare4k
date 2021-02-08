// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export default function kFormatter(n) {
  let [n2, n3] = [n, 0];
  while (n2 >= 1e3) {
    n2 /= 1e3;
    n3++;
  }
  let result = n2.toFixed(1) + ["", "k", "m", "G"][n3];
  if (result.includes(".0")) {
    result = result.replace(".0", "");
  }
  return result;
}
