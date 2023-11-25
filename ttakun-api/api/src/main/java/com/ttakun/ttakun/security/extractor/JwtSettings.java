package com.ttakun.ttakun.security.extractor;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtSettings {
    /**
     * {@link com.ttakun.ttakun.security.model.JwtToken} will expire after this time.
     */
    private Integer expirationTime;

    /**
     * Token issuer.
     */
    private String issuer;

    /**
     * Key is used to sign {@link com.ttakun.ttakun.security.model.JwtToken}.
     */
    private String signingKey;

    /**
     * {@link com.ttakun.ttakun.security.model.JwtToken} can be refreshed during this timeframe.
     */
    private Integer refreshTokenExpTime;

    public Integer getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Integer expirationTime) {
        this.expirationTime = expirationTime;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getSigningKey() {
        return signingKey;
    }

    public void setSigningKey(String signingKey) {
        this.signingKey = signingKey;
    }

    public Integer getRefreshTokenExpTime() {
        return refreshTokenExpTime;
    }

    public void setRefreshTokenExpTime(Integer refreshTokenExpTime) {
        this.refreshTokenExpTime = refreshTokenExpTime;
    }
}
