package com.ttakun.ttakun.repository;

import com.ttakun.ttakun.entity.RecoverPassword;
import org.springframework.data.repository.CrudRepository;

public interface RecoverPasswordRepository extends CrudRepository<RecoverPassword, Long> {
    RecoverPassword findByHash(String hash);

    RecoverPassword findByHashAndUsed(String hash, Boolean used);
}
