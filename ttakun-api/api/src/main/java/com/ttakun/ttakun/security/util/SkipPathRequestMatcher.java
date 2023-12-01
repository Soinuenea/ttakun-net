package com.ttakun.ttakun.security.util;

import com.ttakun.ttakun.util.CollectionUtil;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class SkipPathRequestMatcher implements RequestMatcher {
    private OrRequestMatcher matchers;
    private OrRequestMatcher processingMatcher;

    public SkipPathRequestMatcher(List<String> pathsToSkip, List<String> processingPaths) {
        List<RequestMatcher> skipPathMatchers = CollectionUtil.convertToList(pathsToSkip, AntPathRequestMatcher::new);
        List<RequestMatcher> processingPathMatchers = CollectionUtil.convertToList(processingPaths, AntPathRequestMatcher::new);
        matchers = new OrRequestMatcher(skipPathMatchers);
        processingMatcher = new OrRequestMatcher(processingPathMatchers);
    }

    @Override
    public boolean matches(HttpServletRequest request) {
        return !matchers.matches(request) && processingMatcher.matches(request);
    }
}
