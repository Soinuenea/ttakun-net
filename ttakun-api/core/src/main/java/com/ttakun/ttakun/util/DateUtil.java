package com.ttakun.ttakun.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

import static com.ttakun.ttakun.constants.Constants.GMT;
import static com.ttakun.ttakun.constants.Constants.TIME_ZONE;
import static java.util.Calendar.*;

public class DateUtil {

    public static Long getCurrentTimeInMillis() {
        return getInstance().getTimeInMillis();
    }

    public static String getDateInFormat(Date date, String format) {
        DateFormat formatter = new SimpleDateFormat(format);

        return formatter.format(date);
    }

    public static String getDateInFormat(Long date, String format, String timeZoneId) {
        DateFormat formatter = new SimpleDateFormat(format);
        formatter.setTimeZone(TimeZone.getTimeZone(timeZoneId));

        return formatter.format(date);
    }

    public static String getDateInFormat(Date date, String format, String timeZoneId) {
        DateFormat formatter = new SimpleDateFormat(format);
        formatter.setTimeZone(TimeZone.getTimeZone(timeZoneId));

        return formatter.format(date);
    }

    public static String getCurrentDateInFormat(String format) {
        return getDateInFormat(new Date(), format);
    }

    public static String getCurrentDateInFormat(String format, String timeZoneId) {
        return getDateInFormat(new Date(), format, timeZoneId);
    }

    public static Date getDateFromMillis(Long millis) {
        Calendar calendar = getInstance();
        calendar.setTimeInMillis(millis);
        return calendar.getTime();
    }

    public static Long getCurrentFirstMillisInTimeZone(String timeZoneId) {
        return getFirstMillisInTimeZone(null, timeZoneId);
    }

    public static Long getFirstMillisInTimeZone(Long millis, String timeZoneId) {
        TimeZone timeZone = TimeZone.getTimeZone(timeZoneId);
        Calendar calendar = getInstance(timeZone);
        if (millis != null) {
            calendar.setTimeInMillis(millis);
        }
        calendar.set(HOUR_OF_DAY, 0);
        calendar.set(MINUTE, 0);
        calendar.set(SECOND, 0);
        calendar.set(MILLISECOND, 0);

        return calendar.getTimeInMillis();
    }

    public static Long getLastMillisInTimeZone(Long millis, String timeZoneId) {
        TimeZone timeZone = TimeZone.getTimeZone(timeZoneId);
        Calendar calendar = getInstance(timeZone);
        if (millis != null) {
            calendar.setTimeInMillis(millis);
        }
        calendar.set(HOUR_OF_DAY, 23);
        calendar.set(MINUTE, 59);
        calendar.set(SECOND, 59);
        calendar.set(MILLISECOND, 999);

        return calendar.getTimeInMillis();
    }

    public static boolean isInDaylight(Long millis) {
        return TIME_ZONE.inDaylightTime(getDateFromMillis(millis));
    }

    public static Long getFirstMillisOfDate(Long date) {
        return getMillisFromDateByHoursMinutesSecondsAndMillis(date, 0, 0, 0, 0);
    }

    public static Long getFirstMillisOfHour(Long date) {
        return getMillisFromDateByMinutesSecondsAndMillis(date, 0, 0, 0);
    }

    public static Long getLastMillisOfHour(Long date) {
        return getMillisFromDateByMinutesSecondsAndMillis(date, 59, 59, 999);
    }

    public static List<Long> getSharpHoursBetweenDates(Long start, Long end) {
        List<Long> hours = new ArrayList<>();
        for (long date = getFirstMillisOfHour(start); date <= end ; date = addOneHourToDate(date)) {
            hours.add(date);
        }

        return hours;
    }

    public static Long addOneHourToDate(long date) {
        Calendar calendar = getInstance(GMT);
        calendar.setTimeInMillis(date);
        calendar.add(HOUR_OF_DAY, 1);

        return calendar.getTimeInMillis();
    }

    public static Long getFromYearMonthDayHourMinutesSecond(int years, int months, int days, int hours, int minutes, int seconds) {
        Calendar calendar = getInstance(GMT);
        calendar.set(YEAR, years);
        calendar.set(MONTH, months);
        calendar.set(DATE, days);
        calendar.set(HOUR_OF_DAY, hours);
        calendar.set(MINUTE, minutes);
        calendar.set(SECOND, seconds);

        return calendar.getTimeInMillis();
    }

    public static Long getMillisFromDateAtHoursMinutesSecondsAndMillisInTimeZone(Long date, int hours, int minutes, int seconds, int millis, String timeZoneId) {
        TimeZone timeZone = TimeZone.getTimeZone(timeZoneId);
        Calendar calendar = getInstance(timeZone);
        if (date != null) {
            calendar.setTimeInMillis(date);
        }
        calendar.set(HOUR_OF_DAY, hours);
        calendar.set(MINUTE, minutes);
        calendar.set(SECOND, seconds);
        calendar.set(MILLISECOND, millis);

        return calendar.getTimeInMillis();
    }

    public static Integer getHoursFromDateInTimeZone(Long date, String timeZoneId) {
        TimeZone timeZone = TimeZone.getTimeZone(timeZoneId);
        Calendar calendar = getInstance(timeZone);
        if (date != null) {
            calendar.setTimeInMillis(date);
        }

        return calendar.get(HOUR_OF_DAY);
    }

    public static Integer getMinutesFromDateInTimeZone(Long date, String timeZoneId) {
        TimeZone timeZone = TimeZone.getTimeZone(timeZoneId);
        Calendar calendar = getInstance(timeZone);
        if (date != null) {
            calendar.setTimeInMillis(date);
        }

        return calendar.get(MINUTE);
    }

    public static Long addDaysToDate(int days, Long millis) {
        Calendar calendar = getInstance();
        if (millis != null) {
            calendar.setTimeInMillis(millis);
        }
        calendar.add(DATE, days);

        return calendar.getTimeInMillis();
    }

    public static Long subtractDaysToCurrentDate(int days) {
        return subtractDaysToDate(days, null);
    }

    public static Long subtractDaysToDate(int days, Long millis) {
        return addDaysToDate(-days, millis);
    }

    public static Long subtractHoursToCurrentDate(int hours) {
        return subtractHoursToDate(hours, null);
    }

    public static Long subtractHoursToDate(int hours, Long millis) {
        return addHoursToDate(-hours, millis);
    }

    public static Long addHoursToDate(int hours, Long millis) {
        Calendar calendar = getInstance();
        if (millis != null) {
            calendar.setTimeInMillis(millis);
        }
        calendar.add(HOUR_OF_DAY, hours);

        return calendar.getTimeInMillis();
    }

    public static Long subtractMinutesToCurrentDate(int minutes) {
        return subtractMinutesToDate(minutes, null);
    }

    public static Long subtractMinutesToDate(int minutes, Long millis) {
        Calendar calendar = getInstance();
        if (millis != null) {
            calendar.setTimeInMillis(millis);
        }
        calendar.add(MINUTE, -minutes);

        return calendar.getTimeInMillis();
    }

    public static Long subtractSecondsToCurrentDate(int seconds) {
        return subtractSecondsToDate(seconds, null);
    }

    public static Long subtractSecondsToDate(int seconds, Long millis) {
        Calendar calendar = getInstance();
        if (millis != null) {
            calendar.setTimeInMillis(millis);
        }
        calendar.add(SECOND, -seconds);

        return calendar.getTimeInMillis();
    }

    public static long getHourDifference(Long start, Long end) {
        Duration difference = Duration.between(Instant.ofEpochMilli(start), Instant.ofEpochMilli(end));

        return Math.abs(difference.toHours());
    }

    public static long getMinuteDifference(Long start, Long end) {
        Duration difference = Duration.between(Instant.ofEpochMilli(start), Instant.ofEpochMilli(end));

        return Math.abs(difference.toMinutes());
    }

    public static boolean isLongerThanADay(Long start, Long end) {
        return (end - start) > 86400000;
    }

    private static Long getMillisFromDateByHoursMinutesSecondsAndMillis(Long date, int hours, int minutes, int seconds, int millis) {
        Calendar calendar = getInstance(GMT);
        if (date != null) {
            calendar.setTimeInMillis(date);
        }
        calendar.set(HOUR_OF_DAY, hours);
        calendar.set(MINUTE, minutes);
        calendar.set(SECOND, seconds);
        calendar.set(MILLISECOND, millis);

        return calendar.getTimeInMillis();
    }

    private static Long getMillisFromDateByMinutesSecondsAndMillis(Long date, int minutes, int seconds, int millis) {
        Calendar calendar = getInstance(GMT);
        if (date != null) {
            calendar.setTimeInMillis(date);
        }
        calendar.set(MINUTE, minutes);
        calendar.set(SECOND, seconds);
        calendar.set(MILLISECOND, millis);

        return calendar.getTimeInMillis();
    }
}
