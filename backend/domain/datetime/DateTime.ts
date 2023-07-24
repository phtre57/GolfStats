import dayjs, { Dayjs, ManipulateType, OpUnitType } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(utc)

export enum DateTimeFormat {
  YearMonthAndDay = 'YYYY-MM-DD',
}

export class DateTime {
  date: Dayjs

  constructor(date: Dayjs) {
    this.date = date
  }

  public static fromISOString = (isoString: string): DateTime => new DateTime(dayjs(isoString).utcOffset(0))

  public static fromDate = (date: Date): DateTime => new DateTime(dayjs(date))

  public static now = (): DateTime => new DateTime(dayjs())

  public static startOfTime = (): DateTime => new DateTime(dayjs(0))

  public toISOString = (): string => this.date.toISOString()

  public isAfter = (other: DateTime): boolean => this.date.isAfter(other.date)

  public isBefore = (other: DateTime): boolean => this.date.isBefore(other.date)

  public isSame = (other: DateTime): boolean => this.date.isSame(other.date)

  public isSameOrAfter = (other: DateTime): boolean => this.date.isSameOrAfter(other.date)

  public isSameOrBefore = (other: DateTime): boolean => this.date.isSameOrBefore(other.date)

  public addMinutes = (value: number): DateTime => new DateTime(this.date.add(value, 'minutes'))

  public startOf = (unit: OpUnitType): DateTime => new DateTime(this.date.utcOffset(0).startOf(unit))

  public endOf = (unit: OpUnitType): DateTime => new DateTime(this.date.utcOffset(0).endOf(unit))

  public setHour = (hour: number): string => this.date.hour(hour).toISOString()

  public subtract = (number: number, unit: ManipulateType): DateTime => new DateTime(this.date.subtract(number, unit))

  public diff = (dateTime: DateTime, unit: ManipulateType): number => this.date.diff(dateTime.date, unit, true)

  public toFormat = (format: DateTimeFormat): string => this.date.format(format)

  public static isISO8601DateTime = (dateTimeString: string): boolean => {
    // ISO 8601 datetime format regex
    const iso8601DateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,6})?(Z|([+-]\d{2}:\d{2}))?$/

    return iso8601DateTimeRegex.test(dateTimeString)
  }
}
