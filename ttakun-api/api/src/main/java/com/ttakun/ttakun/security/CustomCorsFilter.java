package com.ttakun.ttakun.security;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

public class CustomCorsFilter extends CorsFilter {

    public CustomCorsFilter(String... paths) {
        super(configurationSource(paths));
    }

    private static UrlBasedCorsConfigurationSource configurationSource(String... paths) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.setMaxAge(36000L);
        config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        for (String path: paths) {
            source.registerCorsConfiguration(path, config);
        }

        return source;
    }
}
