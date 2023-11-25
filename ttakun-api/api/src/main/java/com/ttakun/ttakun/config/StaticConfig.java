package com.ttakun.ttakun.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
public class StaticConfig implements WebMvcConfigurer {
    @Value("${url.files_matcher:}")
    private String filesUrlMatcher;

    @Value("${path.files:}")
    private String filesPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(filesUrlMatcher)
            .addResourceLocations("file:" + filesPath)
            .setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).mustRevalidate());
    }
}
