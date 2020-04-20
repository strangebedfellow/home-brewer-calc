const convertToPlato = (e) => {
    return ((-1 * 616.868) + (1111.14 * e) - (630.272 * Math.pow(e , 2)) + (135.997 * Math.pow(e , 3))).toFixed(2)
};

export default convertToPlato;