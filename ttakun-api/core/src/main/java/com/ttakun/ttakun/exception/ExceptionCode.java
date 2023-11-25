package com.ttakun.ttakun.exception;

public enum ExceptionCode {
    UNRECOGNIZED_ERROR(600, "UNRECOGNIZED_ERROR"),
    INVALID_FILE(602, "INVALID_FILE"),
    PASSWORD_MISMATCH(603, "'PASSWORD_MISMATCH'"),
    RECOVER_NOT_FOUND(604, "RECOVER_NOT_FOUND"),
    USER_NOT_FOUND(605, "USER_NOT_FOUND");

    private int code;
    private String key;

    ExceptionCode(int code, String key) {

        this.code = code;
        this.key = key;
    }

    public int code() {
        return code;
    }

    public String key() {
        return key;
    }
}
