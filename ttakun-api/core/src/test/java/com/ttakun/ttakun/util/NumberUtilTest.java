package com.ttakun.ttakun.util;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class NumberUtilTest {
    private static final Integer DECIMAL_DIGITS = 3;

    @Test
    public void formatNumberReturnsThreeDigitsWhenValueHasMoreDigits() {
        double value = 1.23456;
        String expected = "1,234";

        String result = NumberUtil.formatNumber(value, DECIMAL_DIGITS);

        assertEquals(expected, result);
    }

    @Test
    public void formatNumberReturnsThreeDigitsWhenValueHasLessDigits() {
        double value = 1.2;
        String expected = "1,200";

        String result = NumberUtil.formatNumber(value, DECIMAL_DIGITS);

        assertEquals(expected, result);
    }

    @Test
    public void formatNumberReturnsThreeDigitsWhenValueIsInteger() {
        int value = 1;
        String expected = "1,000";

        String result = NumberUtil.formatNumber(value, DECIMAL_DIGITS);

        assertEquals(expected, result);
    }

    @Test
    public void parseCommaSeparatedDoubleReturnsNullIfGivenFormatIsNotCorrect() {
        String value = "ab.cd";
        Double expected = null;

        Double result = NumberUtil.parseCommaSeparatedDouble(value);

        assertEquals(expected, result);
    }

    @Test
    public void parseCommaSeparatedDoubleReturnsNullIfNullIsGiven() {
        String value = null;
        Double expected = null;

        Double result = NumberUtil.parseCommaSeparatedDouble(value);

        assertEquals(expected, result);
    }

    @Test
    public void parseCommaSeparatedDoubleReturnsExpectedDoubleIfGivenFormatIsCorrect() {
        String value = "1,368";
        Double expected = 1.368;

        Double result = NumberUtil.parseCommaSeparatedDouble(value);

        assertEquals(expected, result);
    }
}
