package com.ttakun.ttakun.service.impl;

import com.ttakun.ttakun.service.TimeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ttakun.ttakun.util.DateUtil;

@Service
public class TimeServiceImpl implements TimeService {
    @Value("${service.timezone}")
    private String serviceTimeZone;

    @Override
    public Long getCurrentFirstMillisInServiceTimeZone() {
        return DateUtil.getCurrentFirstMillisInTimeZone(serviceTimeZone);
    }

    @Override
    public Long getFirstMillisInServiceTimeZone(Long date) {
        return DateUtil.getFirstMillisInTimeZone(date, serviceTimeZone);
    }

    @Override
    public Long getLastMillisInServiceTimeZone(Long date) {
        return DateUtil.getLastMillisInTimeZone(date, serviceTimeZone);
    }

    @Override
    public Integer getHourInServiceTimeZone(Long date) {
        return DateUtil.getHoursFromDateInTimeZone(date, serviceTimeZone);
    }

    @Override
    public Long getMillisFromDateAtHoursInServiceTimeZone(Long date, Integer hours) {
        return DateUtil.getMillisFromDateAtHoursMinutesSecondsAndMillisInTimeZone(date, hours, 0, 0, 0, serviceTimeZone);
    }

    @Override
    public String getCurrentDateInFormatInServiceTimeZone(String format) {
        return DateUtil.getCurrentDateInFormat(format, serviceTimeZone);
    }

    @Override
    public String getDateInFormatInServiceTimeZone(Long date, String format) {
        return DateUtil.getDateInFormat(date, format, serviceTimeZone);
    }
}
