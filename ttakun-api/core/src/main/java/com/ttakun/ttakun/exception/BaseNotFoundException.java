package com.ttakun.ttakun.exception;

import java.util.Map;

public abstract class BaseNotFoundException extends BaseGlobalException {
    public BaseNotFoundException(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public BaseNotFoundException(ExceptionCode exceptionCode, Map<String, ?> values) {
        super(exceptionCode, values);
    }
}
