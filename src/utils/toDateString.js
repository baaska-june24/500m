const toDateString = value => {
  var d = new Date(value);
  var datestring =
    d.getFullYear() +
    "." +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + d.getDate()).slice(-2) +
    ", " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2);

  return datestring;
};
export default toDateString;
