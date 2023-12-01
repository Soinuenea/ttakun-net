package com.ttakun.ttakun.util;

import java.util.List;
import java.util.Random;

public class RandomUtil {

    public static <T> T random(List<T> collection) {
        Random rand = new Random();

        return collection.get(rand.nextInt(collection.size()));
    }
}
