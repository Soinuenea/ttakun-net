package com.ttakun.ttakun.exception;

import org.springframework.security.core.AuthenticationException;

public class UnauthorizedException extends AuthenticationException {
    public UnauthorizedException() {
        super("Invalid JWT");
    }
}
