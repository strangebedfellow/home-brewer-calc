export const convertToSg = (value) => {
  return (1 + parseFloat(value) / (258.6 - (parseFloat(value) / 258.2) * 227.1)).toFixed(3);
};

export const convertToPlato = (value) => {
  return (-616.868 + 1111.14 * value - 630.272 * Math.pow(value, 2) + 135.997 * Math.pow(value, 3)).toFixed(2);
};
