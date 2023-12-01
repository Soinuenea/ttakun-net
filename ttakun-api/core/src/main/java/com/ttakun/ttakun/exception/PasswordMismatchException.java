package com.ttakun.ttakun.exception;

public class PasswordMismatchException extends BaseGlobalException {
    public PasswordMismatchException() {
        super(ExceptionCode.PASSWORD_MISMATCH);
    }
}
