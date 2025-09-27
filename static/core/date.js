import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = "YYYY-MM-DD";
const HOUR_FORMAT = "HH:mm:ss";

// Replace this with your localized translation map if needed
const TRANSLATE_DATE = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default {
  subtractTime() {
    return dayjs().format("YYYY-MM-DD, HH:mm:ss");
  },
  getCurrentHour() {
    return dayjs().format(HOUR_FORMAT);
  },
  getCurrentDay() {
    const TODAY = new Date();
    return TRANSLATE_DATE[TODAY.getDay()];
  },
  getCurrentDate() {
    return dayjs().format(DATE_FORMAT);
  },
  getCurrentDateTime() {
    return dayjs().format("YYYY-MM-DD HH:mm:ss");
  },
  getCurrentDateTimeWithDay() {
    return dayjs().tz("Asia/Makassar").format("dddd, YYYY-MM-DD HH:mm:ss");
  },
  getCurrentDateMonth() {
    return dayjs().tz("Asia/Makassar").format("YYYY-MM");
  },
  getCurrentDateFirstDayOfMonth(dateString) {
    return dayjs(dateString).startOf("month").format(DATE_FORMAT);
  },
  getCurrentDateLastDayOfMonth(dateString) {
    return dayjs(dateString).endOf("month").format(DATE_FORMAT);
  },
};
