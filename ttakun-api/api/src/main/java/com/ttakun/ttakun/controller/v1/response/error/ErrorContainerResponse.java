package com.ttakun.ttakun.controller.v1.response.error;

import com.ttakun.ttakun.exception.BaseGlobalException;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.*;

public class ErrorContainerResponse {
    private ErrorCode global;
    private Map<String, ErrorCode> fields;

    private ErrorContainerResponse() {
        fields = new HashMap<>();
    }

    public static ErrorContainerResponse fromExceptionResult(BindingResult bindingResult) {
        ErrorContainerResponse response = new ErrorContainerResponse();
        response.fields = loadFieldErrors(bindingResult.getFieldErrors());

        return response;
    }

    public static ErrorContainerResponse fromGlobalExceptionResult(String key) {
        ErrorContainerResponse response = new ErrorContainerResponse();
        response.global = new SimpleErrorCode(key);

        return response;
    }

    public static ErrorContainerResponse fromGlobalExceptionResultWithValues(String key, Map<String, ?> values) {
        ErrorContainerResponse response = new ErrorContainerResponse();
        response.global = new ErrorCodeWithValues(key, values);

        return response;
    }

    public static ErrorContainerResponse fromCustomFieldErrors(Map<String, String> errors) {
        ErrorContainerResponse response = new ErrorContainerResponse();
        response.fields = loadCustomFieldErrors(errors);

        return response;
    }

    public static ErrorContainerResponse fromFieldAndError(String field, String error) {
        ErrorContainerResponse response = new ErrorContainerResponse();
        List<FieldError> fieldErrors = Arrays.asList(new FieldError("", field, error));
        response.fields = loadFieldErrors(fieldErrors);

        return response;
    }

    public static ErrorContainerResponse fromGlobalExceptionSummary(String field, String error, List<BaseGlobalException> exceptions) {
        ErrorContainerResponse response = new ErrorContainerResponse();
        response.fields = loadExceptionSummary(field, error, exceptions);

        return response;
    }

    public ErrorCode getGlobal() {
        return global;
    }

    public Map<String, ErrorCode> getFields() {
        return fields;
    }

    private static Map<String, ErrorCode> loadFieldErrors(List<FieldError> fieldErrors) {
        Map<String, ErrorCode> fields = new HashMap<>();
        if (!CollectionUtils.isEmpty(fieldErrors)) {
            for (FieldError fieldError : fieldErrors) {
                fields.put(fieldError.getField(), new SimpleErrorCode(fieldError.getDefaultMessage()));
            }
        }

        return fields;
    }

    private static Map<String, ErrorCode> loadCustomFieldErrors(Map<String, String> errors) {
        Map<String, ErrorCode> fields = new HashMap<>();
        if (errors != null) {
            for (Map.Entry<String, String> error : errors.entrySet()) {
                fields.put(error.getKey(), new SimpleErrorCode(error.getValue()));
            }
        }

        return fields;
    }

    private static Map<String, ErrorCode> loadExceptionSummary(String field, String error, List<BaseGlobalException> exceptions) {
        return Collections.singletonMap(field, new ErrorCodeWithErrors(error, loadSummaryErrors(exceptions)));
    }

    private static List<ErrorCode> loadSummaryErrors(List<BaseGlobalException> exceptions) {
        List<ErrorCode> errors = new ArrayList<>();
        if (!CollectionUtils.isEmpty(exceptions)) {
            for (BaseGlobalException exception : exceptions) {
                errors.add(new ErrorCodeWithValues(exception.getKey(), exception.getValues()));
            }
        }

        return errors;
    }
}
