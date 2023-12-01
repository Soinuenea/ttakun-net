package com.ttakun.ttakun.security.verifier;

import com.ttakun.ttakun.security.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenVerifier implements TokenVerifier {
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public RefreshTokenVerifier(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public boolean verify(String token) {
        return !jwtTokenUtil.isTokenExpired(token);
    }
}
