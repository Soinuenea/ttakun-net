package com.ttakun.ttakun.security.jwt;

import com.ttakun.ttakun.security.extractor.JwtSettings;
import com.ttakun.ttakun.security.model.AccessJwtToken;
import com.ttakun.ttakun.security.model.JwtToken;
import com.ttakun.ttakun.security.model.UserContext;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

import static com.ttakun.ttakun.util.CollectionUtil.convertToList;

@Component
public class JwtTokenFactory {
    private final JwtSettings settings;

    @Autowired
    public JwtTokenFactory(JwtSettings settings) {
        this.settings = settings;
    }

    public AccessJwtToken createAccessJwtToken(UserContext userContext) {
        if (StringUtils.isEmpty(userContext.getHash()))
            throw new IllegalArgumentException("Cannot create JWT Token without username");

        Claims claims = Jwts.claims().setSubject(userContext.getHash());
        claims.put("firstName", userContext.getFirstName());
        claims.put("lastName", userContext.getLastName());
        if (!Collections.isEmpty(userContext.getAuthorities())) {
            claims.put("privileges", String.join(
                ",", convertToList(userContext.getAuthorities(), GrantedAuthority::toString)
            ));
        }

        LocalDateTime currentTime = LocalDateTime.now();

        String token = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant()))
            .setExpiration(Date.from(currentTime
                .plusMinutes(settings.getExpirationTime())
                .atZone(ZoneId.systemDefault()).toInstant()))
            .signWith(SignatureAlgorithm.HS512, settings.getSigningKey())
            .compact();

        return new AccessJwtToken(token, claims);
    }

    public JwtToken createRefreshToken(UserContext userContext) {
        if (StringUtils.isEmpty(userContext.getHash())) {
            throw new IllegalArgumentException("Cannot create JWT Token without username");
        }

        LocalDateTime currentTime = LocalDateTime.now();

        Claims claims = Jwts.claims().setSubject(userContext.getHash());
        claims.put("role", "REFRESH_TOKEN");

        String token = Jwts.builder()
            .setClaims(claims)
            .setId(UUID.randomUUID().toString())
            .setIssuedAt(Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant()))
            .setExpiration(Date.from(currentTime
                .plusMinutes(settings.getRefreshTokenExpTime())
                .atZone(ZoneId.systemDefault()).toInstant()))
            .signWith(SignatureAlgorithm.HS512, settings.getSigningKey())
            .compact();

        return new AccessJwtToken(token, claims);
    }
}
