const helper = {
  // Shuffle items in an array, from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle: (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  // Capitalize first letter in string, from: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
  capitalize: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

export default helper