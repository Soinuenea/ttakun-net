package com.ttakun.ttakun.exception;

import java.util.Collections;
import java.util.List;

public class ErrorSummaryException extends BaseGlobalException {
    private static final String ERROR_KEY = "errors";

    private String field;

    public ErrorSummaryException(String field, ExceptionCode exceptionCode, List<BaseGlobalException> exceptions) {
        super(exceptionCode, Collections.singletonMap(ERROR_KEY, exceptions));
        this.field = field;
    }

    @SuppressWarnings("unchecked")
    public List<BaseGlobalException> getExceptions() {
        return (List<BaseGlobalException>) getValues().get(ERROR_KEY);
    }

    public String getField() {
        return field;
    }
}
