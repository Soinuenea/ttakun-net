package com.ttakun.ttakun.util;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PersistUtilTest {

    @Test
    public void returnsZeroIfCountIsZero() {
        int result = PersistUtil.calculatePage(1, 0);
        int expected = 0;

        assertEquals(expected, result);
    }

    @Test
    public void returnsZeroIfFromIsZero() {
        int result = PersistUtil.calculatePage(0, 7);
        int expected = 0;

        assertEquals(expected, result);
    }

    @Test
    public void returnsZeroIfFromIsLessThanCount() {
        int result = PersistUtil.calculatePage(6, 7);
        int expected = 0;

        assertEquals(expected, result);
    }

    @Test
    public void returnsOneIfFromIsEqualsCount() {
        int result = PersistUtil.calculatePage(7, 7);
        int expected = 1;

        assertEquals(expected, result);
    }

    @Test
    public void returnsOneIfFromIsGreaterThanCount() {
        int result = PersistUtil.calculatePage(10, 7);
        int expected = 1;

        assertEquals(expected, result);
    }
}
