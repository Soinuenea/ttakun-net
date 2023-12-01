package com.ttakun.ttakun.security.extractor;

public interface TokenExtractor {
    String extract(String payload);
}
