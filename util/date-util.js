/**
 * Created by xbh 2019-07-03
 */
function dateFormat(date, format) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    let day = date.getDate();
    day = day > 9 ? day : `0${day}`;
    if (format) {
        let hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        let second = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    return `${year}-${month}-${day}`;
}

module.exports = dateFormat;