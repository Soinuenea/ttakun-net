package com.ttakun.ttakun.util;

import org.junit.Test;

import java.util.Arrays;
import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class CollectionUtilTest {
    @Test
    public void findOrNullReturnsNullWhenNullCollectionIsGiven() {
        Object found = CollectionUtil.findOrNull(null, Objects::isNull);

        assertNull(found);
    }

    @Test
    public void findOrNullReturnsNullWhenNonExistingElementIsBeingFound() {
        Object found = CollectionUtil.findOrNull(Arrays.asList(1, 2, 3), Objects::isNull);

        assertNull(found);
    }

    @Test
    public void findOrNullReturnsElementWhenIsFound() {
        Integer expected = 1;
        Integer found = CollectionUtil.findOrNull(Arrays.asList(1, 2, 3), element -> Objects.equals(expected, element));

        assertEquals(expected, found);
    }
}
