const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  transform(message, key, isEncrypt) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const upperMessage = message.toUpperCase();
    const upperKey = key.toUpperCase();
    let keyIndex = 0;
    const result = [];

    for (const char of upperMessage) {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
        const offset = isEncrypt ? shift : -shift;
        const newCode = ((code - 65 + offset + 26) % 26) + 65;
        result.push(String.fromCharCode(newCode));
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    if (!this.isDirect) {
      result.reverse();
    }

    return result.join('');
  }

  encrypt(message, key) {
    return this.transform(message, key, true);
  }

  decrypt(message, key) {
    return this.transform(message, key, false);
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
