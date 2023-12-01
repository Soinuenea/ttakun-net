package com.ttakun.ttakun.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {
    public static boolean matches(String password, String hash) {
        return getPasswordEncoder().matches(password, hash);
    }

    public static String encode(String password) {
        return getPasswordEncoder().encode(password);
    }

    private static BCryptPasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
