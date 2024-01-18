/**
 * Generates a random string of a specified length.
 * @param {number} length - The length of the string to generate.
 * @returns {string} The generated string.
 */
const random_string = (length) => {
   let result = ''
   let characters =
       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   let charactersLength = characters.length
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return result
}

/**
 * Generates a random number of a specified numbers of digits.
 * @param {number} length - The number of digits of the number to generate.
 * @throws {Error} Will throw an error if the number of digits is not greater than 0.
 * @returns {number} The generated number.
 */
const random_number = (length) => {
   if (length <= 0) {
      throw new Error('Number of digits must be greater than 0')
   }
   const min = Math.pow(10, length - 1)
   const max = Math.pow(10, length) - 1
   return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
   random_string,
   random_number,
}
