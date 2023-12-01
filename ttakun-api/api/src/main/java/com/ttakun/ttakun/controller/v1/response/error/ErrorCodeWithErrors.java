package com.ttakun.ttakun.controller.v1.response.error;

import java.util.List;

public class ErrorCodeWithErrors implements ErrorCode {
    private String code;
    private List<ErrorCode> values;

    public ErrorCodeWithErrors(String code, List<ErrorCode> values) {
        this.code = code;
        this.values = values;
    }

    public String getCode() {
        return code;
    }

    public List<ErrorCode> getValues() {
        return values;
    }
}
