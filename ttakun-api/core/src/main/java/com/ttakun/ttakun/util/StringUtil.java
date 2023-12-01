package com.ttakun.ttakun.util;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import static com.ttakun.ttakun.constants.Constants.EMPTY_VALUE;

public class StringUtil {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static boolean matches(String pattern, String value) {
        return Pattern.matches(pattern, value);
    }

    public static String slugify(String input) {
        String noWhiteSpace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public static boolean isNumeric(String value) {
        return !StringUtils.isEmpty(value) && value.matches("[-+]?\\d*\\.?\\d+");
    }

    public static String limitStringLength(String value, int maxLength) {
        return (!StringUtils.isEmpty(value) && value.length() > maxLength)
            ? value.substring(0, maxLength)
            : value;
    }

    public static String limitStringContainingCharacter(String value, String character, int maxLengthContaining, int maxLengthOtherwise) {
        return (!StringUtils.isEmpty(value) && value.contains(character))
            ? limitStringLength(value, maxLengthContaining)
            : limitStringLength(value, maxLengthOtherwise);
    }

    public static List<String> extractRangeElements(String value, String separator, String rangeSeparator) {
        if (StringUtils.isEmpty(value)) {
            return Collections.emptyList();
        }

        String[] splittedElements = value.split(separator);
        return Arrays.stream(splittedElements)
            .map(splittedElement -> extractRangeElement(splittedElement, rangeSeparator))
            .collect(
                Collector.of(ArrayList::new, List::addAll, (left, right) -> { left.addAll(right); return left; })
            );
    }

    public static String valueOf(Object object) {
        return valueOf(object, null);
    }

    public static String valueOfOrEmpty(Object object) {
        return valueOf(object, EMPTY_VALUE);
    }

    public static String valueOf(Object object, String defaultValue) {
        return (object != null) ? object.toString() : defaultValue;
    }

    public static <T> String join(String delimiter, Collection<T> collection) {
        return CollectionUtils.isEmpty(collection)
            ? null
            : collection.stream()
                .map(Object::toString)
                .collect(Collectors.joining(delimiter));
    }

    private static List<String> extractRangeElement(String value, String rangeSeparator) {
        List<String> rangeElements = Collections.emptyList();
        String[] rangeSeparatedValue = value.split(rangeSeparator);
        if (rangeSeparatedValue.length == 1) {
            rangeElements = Collections.singletonList(rangeSeparatedValue[0].trim());
        } else if (rangeSeparatedValue.length > 1) {
            boolean numericValues = StringUtil.isNumeric(rangeSeparatedValue[0].trim()) && StringUtil.isNumeric(rangeSeparatedValue[1].trim());
            String trimmedFrom = rangeSeparatedValue[0].trim();
            String trimmedTo = rangeSeparatedValue[1].trim();

            rangeElements = (numericValues)
                ? extractNumbers(Integer.valueOf(trimmedFrom), Integer.valueOf(trimmedTo))
                : extractChars(trimmedFrom, trimmedTo);
        }

        return rangeElements;
    }

    private static List<String> extractNumbers(int from, int to) {
        List<String> numbers = new ArrayList<>();
        for (int i = from; i <= to; i++) {
            numbers.add(String.valueOf(i));
        }

        return numbers;
    }

    private static List<String> extractChars(String from, String to) {
        char fromChar = from.toUpperCase().charAt(0);
        char toChar = to.toUpperCase().charAt(0);

        List<String> chars = new ArrayList<>();
        for (char i = fromChar; i <= toChar; i++) {
            chars.add(String.valueOf(i));
        }

        return chars;
    }

}
