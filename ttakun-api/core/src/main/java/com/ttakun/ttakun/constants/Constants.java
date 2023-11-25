package com.ttakun.ttakun.constants;

import java.util.TimeZone;

public class Constants {
    public static final String DEFAULT_LANG = "es";

    public static final Integer RECOVER_PASSWORD_EXPIRING_MINUTES = 30;

    public static final TimeZone TIME_ZONE = TimeZone.getTimeZone("Europe/Madrid");

    public static final TimeZone GMT = TimeZone.getTimeZone("GMT");

    public static final String EMPTY_VALUE = "";

    // USER
    public static final int USER_PASSWORD_MIN_LENGTH = 6;
    public static final int USER_PASSWORD_MAX_LENGTH = 16;
}
