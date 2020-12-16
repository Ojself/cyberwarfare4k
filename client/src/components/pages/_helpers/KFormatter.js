/* function kFormatter(value) {
  var newValue = value;
  if (value >= 1000) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const suffixNum = Math.floor(('' + value).length / 3);
    let shortValue = '';
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }

    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
} */

// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export default function kFormatter(n) {
  let [n2, n3] = [n, 0];
  while (n2 >= 1e3) {
    n2 /= 1e3;
    n3++;
  }
  let result = n2.toFixed(1) + ["", "k", "m", "G"][n3];
  if (result.includes(".0")) {
    result = result.replace(".0", "")
  }
  return result;
}