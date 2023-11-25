package com.ttakun.ttakun.runner.task;

import com.ttakun.ttakun.loader.PrivilegeLoader;
import com.ttakun.ttakun.loader.RecoverPasswordLoader;
import com.ttakun.ttakun.loader.UserLoader;
import com.ttakun.ttakun.loader.UserPrivilegeLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class TruncateDataTask {

    private Logger logger = LoggerFactory.getLogger(TruncateDataTask.class);

    private PrivilegeLoader privilegeLoader;
    private RecoverPasswordLoader recoverPasswordLoader;
    private UserLoader userLoader;
    private UserPrivilegeLoader userPrivilegeLoader;

    @Autowired
    public TruncateDataTask(
        PrivilegeLoader privilegeLoader,
        RecoverPasswordLoader recoverPasswordLoader,
        UserLoader userLoader,
        UserPrivilegeLoader userPrivilegeLoader
    ) {
        this.privilegeLoader = privilegeLoader;
        this.recoverPasswordLoader = recoverPasswordLoader;
        this.userLoader = userLoader;
        this.userPrivilegeLoader = userPrivilegeLoader;
    }

    @Transactional
    public void run() {
        logger.info("Start deleting entities");
        privilegeLoader.delete();
        recoverPasswordLoader.delete();
        userLoader.delete();
        userPrivilegeLoader.delete();
        logger.info("Ended deleting entities");
    }
}
