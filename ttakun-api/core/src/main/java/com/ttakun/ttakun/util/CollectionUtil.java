package com.ttakun.ttakun.util;

import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static java.util.Collections.*;

public class CollectionUtil {

    public static <T> List<T> toList(final Iterable<T> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false)
            .collect(Collectors.toList());
    }

    public static <T> Set<T> toSet(final Iterable<T> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false)
            .collect(Collectors.toSet());
    }

    public static <T, V> List<V> convertToList(Collection<T> original, Function<T, V> conversion) {
        return (CollectionUtils.isEmpty(original))
            ? emptyList()
            : convertToStream(original, conversion).collect(Collectors.toList());
    }

    public static <T, V> Set<V> convertToSet(Collection<T> original, Function<T, V> conversion) {
        return (CollectionUtils.isEmpty(original))
            ? emptySet()
            : convertToStream(original, conversion).collect(Collectors.toSet());
    }

    public static <T, V, C extends Collection<V>> C convertToCollection(Collection<T> original, Function<T, V> conversion, Supplier<C> collectable) {
        return (CollectionUtils.isEmpty(original))
            ? collectable.get()
            : convertToStream(original, conversion).collect(Collectors.toCollection(collectable));
    }

    public static <T> int findIndex(List<T> collection, T target) {
        return IntStream.range(0, collection.size())
            .filter(i -> target.equals(collection.get(i)))
            .findFirst()
            .orElse(-1);
    }

    public static <T> T findOrNull(Collection<T> collection, Predicate<T> filter) {
        return (CollectionUtils.isEmpty(collection))
            ? null
            : collection.stream().filter(filter).findAny().orElse(null);
    }

    public static <T, V> Map<V, List<T>> groupBy(List<T> collection, Function<T, V> keyFunction) {
        return (CollectionUtils.isEmpty(collection))
            ? emptyMap()
            : collection.stream().collect(Collectors.groupingBy(keyFunction));
    }

    public static <T, V> Map<V, T> mapUnique(Collection<T> collection, Function<T, V> uniqueFunction) {
        return (CollectionUtils.isEmpty(collection))
            ? emptyMap()
            : collection.stream().collect(Collectors.toMap(uniqueFunction, Function.identity(), (a, b) -> b));
    }

    public static <T> List<T> filter(Collection<T> collection, Predicate<T> filterBy) {
        return (CollectionUtils.isEmpty(collection))
            ? emptyList()
            : collection.stream().filter(filterBy).collect(Collectors.toList());
    }

    public static <T> int count(Collection<T> collection) {
        return (CollectionUtils.isEmpty(collection)) ? 0 : collection.size();
    }

    public static <T> List<T> sort(Collection<T> collection, Comparator<T> comparator) {
        return (CollectionUtils.isEmpty(collection))
            ? emptyList()
            : collection.stream().sorted(comparator).collect(Collectors.toList());
    }

    public static <T> T first(Collection<T> collection) {
        return (CollectionUtils.isEmpty(collection))
            ? null
            : toList(collection).get(0);
    }

    public static <T> T last(Collection<T> collection) {
        return (CollectionUtils.isEmpty(collection))
            ? null
            : toList(collection).get(collection.size() - 1);
    }

    public static <T, V> List<V> convertToFlatList(Collection<T> original, Function<T, Collection<V>> conversion) {
        return (CollectionUtils.isEmpty(original))
            ? emptyList()
            : convertToStream(original, conversion)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    public static <T> List<T> join(Collection<T> first, Collection<T> second) {
        List<T> joining = new ArrayList<>(first);
        joining.addAll(second);

        return joining;
    }

    public static <T> List<T> limit(List<T> collection, int count) {
        return (CollectionUtils.isEmpty(collection))
            ? emptyList()
            : collection.subList(0, NumberUtil.min(count, collection.size()));
    }

    private static <T, V> Stream<V> convertToStream(Collection<T> original, Function<T, V> conversion) {
        return original.stream().map(conversion);
    }

    public static <T> boolean anyMatch(Collection<T> collection, Predicate<T> predicate) {
        return !CollectionUtils.isEmpty(collection) && collection.stream().anyMatch(predicate);
    }

    public static<T> List<T> concat(Collection<T> list1, Collection<T> list2) {
        return Stream.concat(
            CollectionUtils.isEmpty(list1) ? Stream.empty() : list1.stream(),
            CollectionUtils.isEmpty(list2) ? Stream.empty() : list2.stream()
        ).collect(Collectors.toList());
    }

    public static <T> T min(Collection<T> collection, Comparator<T> comparator) {
        return (CollectionUtils.isEmpty(collection))
            ? null
            : collection.stream().min(comparator).orElse(null);
    }

    public static <T> T max(Collection<T> collection, Comparator<T> comparator) {
        return (CollectionUtils.isEmpty(collection))
            ? null
            : collection.stream().max(comparator).orElse(null);
    }
}
