package com.ttakun.ttakun.exception;

public class InvalidFileException extends BaseGlobalException {
    public InvalidFileException() {
        super(ExceptionCode.INVALID_FILE);
    }
}
