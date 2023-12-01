package com.ttakun.ttakun.exception;

public class UserNotFoundException extends BaseNotFoundException {
    public UserNotFoundException() {
        super(ExceptionCode.USER_NOT_FOUND);
    }
}
