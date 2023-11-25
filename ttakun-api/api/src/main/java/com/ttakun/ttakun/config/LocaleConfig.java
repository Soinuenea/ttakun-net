package com.ttakun.ttakun.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.Locale;

import static com.ttakun.ttakun.constants.Constants.DEFAULT_LANG;

@Configuration
public class LocaleConfig {

    @Bean
    @Primary
    public LocaleResolver localeResolver() {
        AcceptHeaderLocaleResolver resolver = new AcceptHeaderLocaleResolver();
        resolver.setDefaultLocale(Locale.forLanguageTag(DEFAULT_LANG));

        return resolver;
    }
}
