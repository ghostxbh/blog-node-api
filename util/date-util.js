/**
 * Created by xbh 2019-07-03
 */
function dateFormat(date, format) {
    let ymd = '-';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (format) {
        let hms = ':';
        let hourse = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return year + ymd + month + ymd + day + ' ' + hourse + hms + minute + hms + second;
    }
    return year + ymd + month + ymd + day;
}

module.exports = dateFormat;