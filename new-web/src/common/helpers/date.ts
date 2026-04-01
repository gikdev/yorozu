import DateObject from "react-date-object"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"

export function toPersianDateEn(input: string | Date) {
  return new DateObject(input).convert(persian, persian_en).format("ddd DD MMM")
}
