package com.ttakun.ttakun.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

public class NumberUtil {
    private static final Logger logger = LoggerFactory.getLogger(NumberUtil.class);

    public static Integer min(Integer... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .min(Integer::compareTo)
            .orElse(null);
    }

    public static Integer max(Integer... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .max(Integer::compareTo)
            .orElse(null);
    }

    public static Double min(Double... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .min(Double::compareTo)
            .orElse(null);
    }

    public static Long max(Long... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .max(Long::compareTo)
            .orElse(null);
    }

    public static Long min(Long... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .min(Long::compareTo)
            .orElse(null);
    }

    public static Double max(Double... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .max(Double::compareTo)
            .orElse(null);
    }

    public static Double sum(Number... numbers) {
        return Arrays.stream(numbers)
            .filter(Objects::nonNull)
            .mapToDouble(Number::doubleValue)
            .sum();
    }

    public static Boolean isValueInRange(Double min, Double max, Double value) {
        return (nonNull(value) && value.compareTo(min) >= 0 && value.compareTo(max) <= 0);
    }

    public static Boolean isValueInRange(int minValueInclusive, int maxValueInclusive, int value) {
        return (value >= minValueInclusive && value <= maxValueInclusive);
    }

    public static Long parseLong(String value) {
        try {
            return (nonNull(value)) ? Long.parseLong(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static Integer parseInt(String value) {
        try {
            return (nonNull(value)) ? Integer.parseInt(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static Double parseDouble(String value) {
        try {
            return (nonNull(value)) ? Double.parseDouble(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static Double getRatio(Number dividend, Number divisor) {
        if (isNull(dividend) || isNull(divisor) || Objects.equals(divisor.doubleValue(), 0D)) {
            return 0D;
        }

        BigDecimal bd = new BigDecimal(dividend.doubleValue() / divisor.doubleValue());
        bd = bd.setScale(5, RoundingMode.HALF_DOWN);

        return bd.doubleValue();
    }

    public static List<Integer> parseIntegerList(String value, String separator) {
        try {
            Predicate<String> isEmpty = StringUtils::isEmpty;
            return Arrays.stream(value.split(separator))
                .map(String::trim)
                .filter(isEmpty.negate())
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public static String formatNumber(Number value, Integer decimalDigits) {
        NumberFormat formatter = DecimalFormat.getInstance(Locale.forLanguageTag("es"));
        formatter.setMaximumFractionDigits(decimalDigits);
        formatter.setMinimumFractionDigits(decimalDigits);
        formatter.setRoundingMode(RoundingMode.FLOOR);

        return formatter.format(value);
    }

    public static Double parseCommaSeparatedDouble(String value) {
        NumberFormat formatter = DecimalFormat.getInstance(Locale.forLanguageTag("es"));
        try {
            return formatter.parse(value).doubleValue();
        } catch (Exception e) {
            logger.error("Error parsing number", e);
            return null;
        }
    }

    public static Integer ceilDivision(Number dividend, Number divisor) {
        double units = Math.ceil(getRatio(dividend, divisor));

        return (int) units;
    }
}
