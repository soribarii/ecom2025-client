import moment from "moment/min/moment-with-locales";

export const dateformat = (date) => {
  return moment(date).locale("th").format("lll");
};
