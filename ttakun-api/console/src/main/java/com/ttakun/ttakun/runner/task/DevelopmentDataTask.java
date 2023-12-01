package com.ttakun.ttakun.runner.task;

import com.ttakun.ttakun.loader.PrivilegeLoader;
import com.ttakun.ttakun.loader.UserLoader;
import com.ttakun.ttakun.loader.UserPrivilegeLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class DevelopmentDataTask {

    private Logger logger = LoggerFactory.getLogger(DevelopmentDataTask.class);

    private PrivilegeLoader privilegeLoader;
    private UserLoader userLoader;
    private UserPrivilegeLoader userPrivilegeLoader;

    @Autowired
    public DevelopmentDataTask(
        PrivilegeLoader privilegeLoader,
        UserLoader userLoader,
        UserPrivilegeLoader userPrivilegeLoader
    ) {
        this.privilegeLoader = privilegeLoader;
        this.userLoader = userLoader;
        this.userPrivilegeLoader = userPrivilegeLoader;
    }

    @Transactional
    public void run() {
        logger.info("Start inserting entities");
        privilegeLoader.insert();
        userLoader.insert();
        userPrivilegeLoader.insert();
        logger.info("Ended inserting entities");
    }
}
