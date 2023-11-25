package com.ttakun.ttakun.loader;

import com.ttakun.ttakun.entity.Privilege;
import com.ttakun.ttakun.repository.PrivilegeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PrivilegeLoader implements Loader {
    private Logger logger = LoggerFactory.getLogger(PrivilegeLoader.class);

    private PrivilegeRepository privilegeRepository;

    @Autowired
    public PrivilegeLoader(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    }

    @Override
    public void delete() {
        privilegeRepository.deleteAll();
        logger.info("Deleted all privileges.");
    }

    @Override
    public void insert() {
        List<Privilege> privileges = Arrays.asList(
            new Privilege("ADMIN"),
            new Privilege("USER")
        );

        privilegeRepository.saveAll(privileges);
        logger.info(String.format("Saved %d privileges.", privileges.size()));
    }
}
