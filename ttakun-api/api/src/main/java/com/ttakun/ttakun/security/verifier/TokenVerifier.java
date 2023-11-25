package com.ttakun.ttakun.security.verifier;

public interface TokenVerifier {
    public boolean verify(String jti);
}
