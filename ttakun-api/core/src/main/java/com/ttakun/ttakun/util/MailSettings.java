package com.ttakun.ttakun.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailSettings {

    @Value("${mail.from}")
    private String from;

    @Value("${mail.fromName}")
    private String fromName;

    @Value("${mail.fakeTo}")
    private Boolean fakeTo;

    @Value("${mail.fakeEmail}")
    private String fakeEmail;

    @Value("${mail.recoverPassword.url}")
    private String resetPasswordUrl;

    public String getFrom() {
        return from;
    }

    public String getFromName() {
        return fromName;
    }

    public Boolean isFakeTo() {
        return fakeTo;
    }

    public String getFakeEmail() {
        return fakeEmail;
    }

    public String getResetPasswordUrl() {
        return resetPasswordUrl;
    }
}
