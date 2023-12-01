package com.ttakun.ttakun;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
public class Application {
    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));   // It will set UTC timezone
        logger.info("Timezone set to UTC: {}", new Date());
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
