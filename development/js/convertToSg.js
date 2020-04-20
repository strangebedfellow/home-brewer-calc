const convertToSg = (e) => {
    return (1 + (parseFloat(e) / (258.6 - ((parseFloat(e) / 258.2) * 227.1)))).toFixed(3)
};

export default convertToSg;