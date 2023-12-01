package com.ttakun.ttakun.exception;

import java.util.Map;

public class CustomFieldErrorsException extends RuntimeException {
    private Map<String, String> errors;

    public CustomFieldErrorsException(Map<String, String> errors) {
        super();
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
