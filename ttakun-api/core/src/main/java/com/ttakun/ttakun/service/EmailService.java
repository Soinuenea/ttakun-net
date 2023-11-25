package com.ttakun.ttakun.service;

import com.ttakun.ttakun.entity.RecoverPassword;

public interface EmailService {

    void sendRecoverPasswordEmail(RecoverPassword recoverPassword);

}
