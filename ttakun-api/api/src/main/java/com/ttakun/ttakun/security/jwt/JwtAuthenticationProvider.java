package com.ttakun.ttakun.security.jwt;

import com.ttakun.ttakun.exception.UnauthorizedException;
import com.ttakun.ttakun.security.extractor.JwtSettings;
import com.ttakun.ttakun.security.model.RawAccessJwtToken;
import com.ttakun.ttakun.security.model.UserContext;
import com.ttakun.ttakun.security.util.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {
    private final JwtSettings jwtSettings;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public JwtAuthenticationProvider(JwtSettings jwtSettings, JwtTokenUtil jwtTokenUtil) {
        this.jwtSettings = jwtSettings;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        RawAccessJwtToken rawAccessToken = (RawAccessJwtToken) authentication.getCredentials();

        Jws<Claims> jwsClaims = rawAccessToken.parseClaims(jwtSettings.getSigningKey());
        String subject = jwsClaims.getBody().getSubject();
        String privileges = jwsClaims.getBody().get("privileges").toString();
        List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(privileges);

        UserContext context = UserContext.create(subject, authorities);
        if (jwtTokenUtil.isTokenExpired(rawAccessToken.getToken())) {
            throw new UnauthorizedException();
        }

        return new JwtAuthenticationToken(context, context.getAuthorities(), jwtTokenUtil.isTokenExpired(rawAccessToken.getToken()));
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
