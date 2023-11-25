package com.ttakun.ttakun.security.model;

import com.ttakun.ttakun.exception.UnauthorizedException;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RawAccessJwtToken implements JwtToken {
    private static final Logger logger = LoggerFactory.getLogger(RawAccessJwtToken.class);

    private String token;

    public RawAccessJwtToken(String token) {
        this.token = token;
    }

    public Jws<Claims> parseClaims(String signingKey) throws UnauthorizedException {
        try {
            return Jwts.parser().setSigningKey(signingKey).parseClaimsJws(this.token);
        } catch (UnsupportedJwtException | MalformedJwtException | IllegalArgumentException | SignatureException ex) {
            logger.error("Invalid JWT Token");
            throw new UnauthorizedException();
        } catch (ExpiredJwtException expiredEx) {
            logger.info("JWT Token is expired");
            throw new UnauthorizedException();
        }
    }

    @Override
    public String getToken() {
        return token;
    }
}
