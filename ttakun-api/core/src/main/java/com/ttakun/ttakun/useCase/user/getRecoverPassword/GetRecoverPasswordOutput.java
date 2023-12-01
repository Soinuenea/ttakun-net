package com.ttakun.ttakun.useCase.user.getRecoverPassword;

import com.ttakun.ttakun.dto.RecoverPasswordDTO;

public class GetRecoverPasswordOutput {
    private RecoverPasswordDTO recoverPassword;

    public GetRecoverPasswordOutput(RecoverPasswordDTO recoverPassword) {
        this.recoverPassword = recoverPassword;
    }

    public RecoverPasswordDTO getRecoverPassword() {
        return recoverPassword;
    }
}
