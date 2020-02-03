const toCurrency = value => {
  return (
    parseFloat(value)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " ₮"
  );
};
export default toCurrency;
