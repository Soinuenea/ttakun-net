package com.ttakun.ttakun.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TimeUtil {

    public static Integer parseMillisFromHourMinuteSecond(String value) {
        Pattern pattern = Pattern.compile("(\\d+)\\:(\\d{2})\\:(\\d{2})");
        Matcher matcher = pattern.matcher(value);

        Integer millis = null;
        if (matcher.matches()) {
            try {
                int hours = Integer.parseInt(matcher.group(1));
                int minutes = Integer.parseInt(matcher.group(2));
                int seconds = Integer.parseInt(matcher.group(3));

                millis = getMillis(hours, minutes, seconds);
            } catch (NumberFormatException e) {
                millis = null;
            }
        }

        return millis;
    }

    public static int getMillis(int hours, int minutes, int seconds) {
        return (((hours * 60) + minutes) * 60 + seconds) * 1000;
    }
}
