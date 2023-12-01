package com.ttakun.ttakun.loader;

import com.ttakun.ttakun.repository.RecoverPasswordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecoverPasswordLoader implements Loader {
    private Logger logger = LoggerFactory.getLogger(RecoverPasswordLoader.class);

    private RecoverPasswordRepository recoverPasswordRepository;

    @Autowired
    public RecoverPasswordLoader(RecoverPasswordRepository recoverPasswordRepository) {
        this.recoverPasswordRepository = recoverPasswordRepository;
    }

    public void delete() {
        recoverPasswordRepository.deleteAll();
        logger.info("Deleted all recover passwords.");
    }

    public void insert() {
        // NONE
    }
}
