import { DateTime, DateTimeFormat } from './DateTime'

describe('DateTime', () => {
  describe('fromDate', () => {
    test('Then should construct a DateTime from Date', () => {
      const dateTime = DateTime.fromDate(new Date())
      expect(dateTime instanceof DateTime).toBe(true)
    })
  })
  describe('isAfter', () => {
    test('Given other date is before When checking if date is after Then date is after', () => {
      const date = DateTime.fromISOString('2010-01-01')
      const isBeforeDate = DateTime.fromISOString('2009-01-01')

      const actual = date.isAfter(isBeforeDate)

      expect(actual).toBe(true)
    })

    test('Given other date is after When checking if date is after Then date is not after', () => {
      const date = DateTime.fromISOString('2010-01-01')
      const isAfterDate = DateTime.fromISOString('2011-01-01')

      const actual = date.isAfter(isAfterDate)

      expect(actual).toBe(false)
    })

    test('Given other date is after When checking if date is before Then date is before', () => {
      const date = DateTime.fromISOString('2010-01-01')
      const isAfterDate = DateTime.fromISOString('2011-01-01')

      const actual = date.isBefore(isAfterDate)

      expect(actual).toBe(true)
    })

    test('Given other date is before When checking if date is before Then date is not before', () => {
      const date = DateTime.fromISOString('2010-01-01')
      const isBeforeDate = DateTime.fromISOString('2009-01-01')

      const actual = date.isBefore(isBeforeDate)

      expect(actual).toBe(false)
    })

    test('Given other date is equal When checking if is equal Then dates are equal', () => {
      const date = DateTime.fromISOString('2010-01-01')
      const isEqualDate = DateTime.fromISOString('2010-01-01')

      const actual = date.isSame(isEqualDate)

      expect(actual).toBe(true)
    })

    test('Given other date is not equal When checking if is equal Then dates are not equal', () => {
      const date = DateTime.fromISOString('2010-01-01')
      const isNotEqualDate = DateTime.fromISOString('2009-01-01')

      const actual = date.isSame(isNotEqualDate)

      expect(actual).toBe(false)
    })
  })

  test('When formatting DateTime to ISO string Then iso string format is returned', () => {
    const dateTime = DateTime.fromISOString('2021-09-09T20:32:21.515Z')

    const actual = dateTime.toISOString()

    expect(actual).toBe('2021-09-09T20:32:21.515Z')
  })

  test('When adding minutes to date Then minutes are added', () => {
    const dateTime = DateTime.fromISOString('2021-09-09T20:32:21.515Z')

    const actual = dateTime.addMinutes(5).toISOString()

    expect(actual).toBe('2021-09-09T20:37:21.515Z')
  })

  test('When subtracting minutes to date Then minutes are subtracted', () => {
    const dateTime = DateTime.fromISOString('2021-09-09T20:32:21.515Z')

    const actual = dateTime.addMinutes(-5).toISOString()

    expect(actual).toBe('2021-09-09T20:27:21.515Z')
  })

  describe('startOf', () => {
    test('Given a date, then should return start of month', () => {
      const dateTime = DateTime.fromISOString('2021-09-09T20:32:21.515Z')
      const actual = dateTime.startOf('month').toISOString()
      expect(actual).toBe('2021-09-01T00:00:00.000Z')
    })
  })

  describe('endOf', () => {
    test('Given a date, then should return end of day', () => {
      const dateTime = DateTime.fromISOString('2021-09-09T20:32:21.515Z')
      const actual = dateTime.endOf('day').toISOString()
      expect(actual).toBe('2021-09-09T23:59:59.999Z')
    })
  })

  describe('setHour', () => {
    test('Given a date, then should set provided hour', () => {
      const dateTime = DateTime.fromISOString('2021-09-09T00:00:00.000Z')
      const actual = dateTime.setHour(12)
      expect(actual).toBe('2021-09-09T12:00:00.000Z')
    })
  })

  describe('toFormat', () => {
    test('Given a date, then should format by DateTimeFormat', () => {
      const dateTime = DateTime.fromISOString('2021-09-09T20:32:21.515Z')
      const actual = dateTime.toFormat(DateTimeFormat.YearMonthAndDay)
      expect(actual).toBe('2021-09-09')
    })
  })

  describe('startOfTime', () => {
    test('Given a date, then should return 0 date', () => {
      const startOfTimeDate = DateTime.startOfTime().toISOString()
      const firstOfTime = '1970-01-01T00:00:00.000Z'
      expect(startOfTimeDate).toBe(firstOfTime)
    })
  })

  describe('Given diff', () => {
    test('Then should return difference between 2 dates in minutes', () => {
      const date1 = DateTime.fromISOString('2021-09-09T20:32:21.515Z')
      const date2 = DateTime.fromISOString('2021-09-09T20:42:21.515Z')
      const diff = date2.diff(date1, 'minutes')
      expect(diff).toBe(10)
    })
    test('Then should return difference between 2 dates in hours', () => {
      const date1 = DateTime.fromISOString('2021-09-09T20:32:21.515Z')
      const date2 = DateTime.fromISOString('2021-09-09T21:02:21.515Z')
      const diff = date2.diff(date1, 'hours')
      expect(diff).toBe(0.5)
    })
  })
})
