package com.ttakun.ttakun.security;

import com.ttakun.ttakun.security.extractor.TokenExtractor;
import com.ttakun.ttakun.security.filter.JwtTokenAuthenticationProcessingFilter;
import com.ttakun.ttakun.security.jwt.JwtAuthenticationProvider;
import com.ttakun.ttakun.security.util.SkipPathRequestMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.ttakun.ttakun.security.RouteConstants.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${url.files_matcher:}")
    private String filesUrlMatcher;

    @Autowired private RestAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired private AuthenticationFailureHandler failureHandler;
    @Autowired private TokenExtractor tokenExtractor;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        List<String> securedEndpoints = Collections.singletonList(API_ROOT);
        List<String> permitAllEndpoints = Arrays.asList(AUTH_URL, ERRORS_URL, API_DOC_URL);

        http
            .csrf().disable()
            .addFilterBefore(new CustomCorsFilter(API_ROOT, filesUrlMatcher), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
            .authenticationEntryPoint(authenticationEntryPoint)
            .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .authorizeRequests()
                .antMatchers(permitAllEndpoints.toArray(new String[permitAllEndpoints.size()]))
                .permitAll()
            .and()
                .authorizeRequests()
                .antMatchers(securedEndpoints.toArray(new String[securedEndpoints.size()])).authenticated()
            .and()
                .addFilterBefore(
                    buildJwtTokenAuthenticationProcessingFilter(permitAllEndpoints, securedEndpoints),
                    UsernamePasswordAuthenticationFilter.class
                )
                .headers().cacheControl();
    }

    private JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter(
        List<String> pathsToSkip, List<String> patterns
    ) {
        SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(pathsToSkip, patterns);
        JwtTokenAuthenticationProcessingFilter filter
            = new JwtTokenAuthenticationProcessingFilter(failureHandler, tokenExtractor, matcher);
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }
}
