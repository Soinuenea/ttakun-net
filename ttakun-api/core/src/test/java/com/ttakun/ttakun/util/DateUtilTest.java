package com.ttakun.ttakun.util;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class DateUtilTest {

    @Test
    public void isInDaylightReturnsFalseWhenWinterDateIsGiven() {
        long date = 1521500400000L; // 20/03/2018 00:00:00

        boolean inDaylight = DateUtil.isInDaylight(date);

        assertFalse(inDaylight);
    }

    @Test
    public void isInDaylightReturnsFalseWhenDateBeforeTimeChangeIsGiven() {
        long date = 1521939599999L; // 25/03/2018 01:59:59.999

        boolean inDaylight = DateUtil.isInDaylight(date);

        assertFalse(inDaylight);
    }

    @Test
    public void isInDaylightReturnsTrueWhenChangeDateIsGiven() {
        long date = 1521939600000L; // 25/03/2018 02:00:00.000

        boolean inDaylight = DateUtil.isInDaylight(date);

        assertTrue(inDaylight);
    }

    @Test
    public void getFirstMillisOfDateReturnsFirstMillisOfGivenDate() {
        long date = 1522828800000L; // 04/04/2018 10:00:00.000 Europe/Madrid
        long first = DateUtil.getFirstMillisOfDate(date);

        long expected = 1522800000000L; // 04/04/2018 00:00:00.000 GMT

        assertEquals(expected, first);
    }

    @Test
    public void getSharpHoursBetweenDatesReturnsTwoHours() {
        long start = 1557205700000L;
        long end = 1557209420000L;

        List<Long> expected = Arrays.asList(1557205200000L, 1557208800000L);

        List<Long> result = DateUtil.getSharpHoursBetweenDates(start, end);

        assertEquals(expected.size(), result.size());
        assertEquals(expected.get(0), result.get(0));
        assertEquals(expected.get(1), result.get(1));
    }

    @Test
    public void getFirstMillisInTimeZoneReturnsFirstMillisInArgentina() {
        long date = 1574681400000L; // 25/11/2019 08:30:00 GMT-0300
        String timeZone = "America/Buenos_Aires";
        long expected = 1574650800000L; // 25/11/2019 00:00:00 GMT-0300

        long result = DateUtil.getFirstMillisInTimeZone(date, timeZone);

        assertEquals(expected, result);
    }

    @Test
    public void getFirstMillisInTimeZoneReturnsFirstMillisInDubai() {
        long date = 1574681400000L; // 25/11/2019 15:30:00 GMT+0400
        String timeZone = "Asia/Dubai";
        long expected = 1574625600000L; // 25/11/2019 00:00:00 GMT+0400

        long result = DateUtil.getFirstMillisInTimeZone(date, timeZone);

        assertEquals(expected, result);
    }

    @Test
    public void getHoursFromDateInTimeZoneReturnsProperHoursInTimeZone() {
        long date = 1575101971538L; // 30/11/2019 9:19:31 GMT+0100
        String timeZone = "Europe/Madrid";
        int expected = 9;

        long result = DateUtil.getHoursFromDateInTimeZone(date, timeZone);

        assertEquals(expected, result);
    }
}
