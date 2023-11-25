package com.ttakun.ttakun.service;

public interface TimeService {

    Long getCurrentFirstMillisInServiceTimeZone();

    Long getFirstMillisInServiceTimeZone(Long date);

    Long getLastMillisInServiceTimeZone(Long date);

    Integer getHourInServiceTimeZone(Long date);

    Long getMillisFromDateAtHoursInServiceTimeZone(Long date, Integer hours);

    String getCurrentDateInFormatInServiceTimeZone(String format);

    String getDateInFormatInServiceTimeZone(Long date, String format);
}
