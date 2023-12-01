package com.ttakun.ttakun.exception;

import java.util.Map;

public abstract class BaseGlobalException extends RuntimeException {
    private Integer code;
    private String key;
    private Map<String, ?> values;

    public BaseGlobalException(ExceptionCode exceptionCode) {
        super();
        this.code = exceptionCode.code();
        this.key = exceptionCode.key();
    }

    public BaseGlobalException(ExceptionCode exceptionCode, Map<String, ?> values) {
        this(exceptionCode);
        this.values = values;
    }

    public Integer getCode() {
        return code;
    }

    public String getKey() {
        return key;
    }

    public Map<String, ?> getValues() {
        return values;
    }
}
