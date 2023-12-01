package com.ttakun.ttakun.controller.v1.response.error;

import java.util.Map;
import java.util.Set;

public class SimpleErrorCode implements ErrorCode {
    private String code;

    public SimpleErrorCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public Set<? extends Map.Entry<String, ?>> getValues() {
        return null;
    }
}
