const { NotImplementedError } = require("../lib");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const digits = String(n).split("");
  let maxNumber = 0;

  for (let i = 0; i < digits.length; i++) {
    const candidate = Number(digits.filter((_, index) => index !== i).join(""));
    if (candidate > maxNumber) {
      maxNumber = candidate;
    }
  }

  return maxNumber;
}

module.exports = {
  deleteDigit,
};
