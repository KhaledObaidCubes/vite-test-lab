const numSum = (...args: number[]): number => {
  let sum: number = 0;
  for (const arg of args) {
    sum = sum + arg;
  }
  return sum;
};
export { numSum };
