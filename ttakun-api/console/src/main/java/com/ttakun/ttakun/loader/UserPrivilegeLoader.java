package com.ttakun.ttakun.loader;

import com.ttakun.ttakun.entity.Privilege;
import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.entity.UserPrivilege;
import com.ttakun.ttakun.repository.PrivilegeRepository;
import com.ttakun.ttakun.repository.UserPrivilegeRepository;
import com.ttakun.ttakun.repository.UserRepository;
import com.ttakun.ttakun.util.CollectionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserPrivilegeLoader implements Loader {
    private Logger logger = LoggerFactory.getLogger(UserPrivilegeLoader.class);

    private UserPrivilegeRepository userPrivilegeRepository;
    private UserRepository userRepository;
    private PrivilegeRepository privilegeRepository;

    @Autowired
    public UserPrivilegeLoader(
        UserPrivilegeRepository userPrivilegeRepository,
        UserRepository userRepository,
        PrivilegeRepository privilegeRepository
    ) {
        this.userPrivilegeRepository = userPrivilegeRepository;
        this.userRepository = userRepository;
        this.privilegeRepository = privilegeRepository;
    }

    @Override
    public void delete() {
        userPrivilegeRepository.deleteAll();
        logger.info("Deleted all user privileges.");
    }

    @Override
    public void insert() {
        List<User> users = CollectionUtil.toList(userRepository.findAll());
        List<Privilege> privileges = CollectionUtil.toList(privilegeRepository.findAll());

        List<UserPrivilege> userPrivileges = new ArrayList<>();
        userPrivileges.add(new UserPrivilege(users.get(0), privileges.get(0)));
        for (int i = 1; i < users.size(); i++) {
            userPrivileges.add(new UserPrivilege(users.get(i), privileges.get(1)));
        }

        userPrivilegeRepository.saveAll(userPrivileges);
        logger.info(String.format("Saved %d user privileges.", userPrivileges.size()));
    }
}
