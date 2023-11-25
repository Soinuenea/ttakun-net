package com.ttakun.ttakun.controller.v1.response.error;

import java.util.Map;
import java.util.Set;

public class ErrorCodeWithValues implements ErrorCode {
    private String code;
    private Map<String, ?> values;

    public ErrorCodeWithValues(String code, Map<String, ?> values) {
        this.code = code;
        this.values = values;
    }

    public String getCode() {
        return code;
    }

    public Set<? extends Map.Entry<String, ?>> getValues() {
        return (values != null) ? values.entrySet() : null;
    }
}
