package com.ttakun.ttakun.exception;

public class RecoverPasswordNotFoundException extends BaseNotFoundException {
    public RecoverPasswordNotFoundException() {
        super(ExceptionCode.RECOVER_NOT_FOUND);
    }
}
