package com.ttakun.ttakun.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Map;

import static java.util.Objects.nonNull;

public class PersistUtil {

    private static final int DEFAULT_PAGE_SIZE = 10;

    public static Pageable getPagegable(
        Integer from,
        Integer count,
        String sort,
        Boolean reversed,
        Map<String, String[]> sortFields,
        String[] defaultSortField
    ) {
        return PageRequest.of(
            calculatePage(from, count),
            calculateCount(count),
            calculateSortDirection(reversed),
            calculateSortProperty(sort, sortFields, defaultSortField)
        );
    }

    static int calculatePage(int from, int count) {
        return (count == 0) ? 0 : (int) Math.floor((double) from / count);
    }

    private static int calculateCount(Integer count) {
        return nonNull(count) ? count : DEFAULT_PAGE_SIZE;
    }

    private static Sort.Direction calculateSortDirection(Boolean reversed) {
        return nonNull(reversed) && reversed ? Sort.Direction.DESC : Sort.Direction.ASC;
    }

    private static String[] calculateSortProperty(String sort, Map<String, String[]> sortFields, String[] defaultSortField) {
        return nonNull(sortFields) && nonNull(sortFields.get(sort))
            ? sortFields.get(sort)
            : defaultSortField;
    }
}
