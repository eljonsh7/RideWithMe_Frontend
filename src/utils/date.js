export default {
  getDate(datetime) {
    const dateObj = new Date(datetime);
    return `${dateObj.getFullYear()}-${("0" + (dateObj.getMonth() + 1)).slice(
      -2
    )}-${("0" + dateObj.getDate()).slice(-2)}`;
  },
  getTime(datetime) {
    const dateObj = new Date(datetime);
    return `${("0" + dateObj.getHours()).slice(-2)}:${(
      "0" + dateObj.getMinutes()
    ).slice(-2)}`;
  },
  formatDateTime(inputValue) {
    // Parse the input value to get Date object
    let dateTime = new Date(inputValue);

    // Extract year, month, day, hours, minutes, and seconds
    let year = dateTime.getFullYear();
    let month = String(dateTime.getMonth() + 1).padStart(2, "0");
    let day = String(dateTime.getDate()).padStart(2, "0");
    let hours = String(dateTime.getHours()).padStart(2, "0");
    let minutes = String(dateTime.getMinutes()).padStart(2, "0");
    let seconds = String(dateTime.getSeconds()).padStart(2, "0");

    // Return the formatted date-time string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
};
