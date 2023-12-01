package com.ttakun.ttakun.controller.v1;

import com.ttakun.ttakun.controller.v1.request.auth.LoginRequest;
import com.ttakun.ttakun.controller.v1.request.auth.RecoverPasswordRequest;
import com.ttakun.ttakun.controller.v1.request.auth.ResetPasswordRequest;
import com.ttakun.ttakun.controller.v1.response.auth.LoginResponse;
import com.ttakun.ttakun.dto.UserDTO;
import com.ttakun.ttakun.dto.UserPrivilegeDTO;
import com.ttakun.ttakun.exception.UnauthorizedException;
import com.ttakun.ttakun.exception.UserNotFoundException;
import com.ttakun.ttakun.security.extractor.JwtSettings;
import com.ttakun.ttakun.security.jwt.JwtTokenFactory;
import com.ttakun.ttakun.security.model.JwtToken;
import com.ttakun.ttakun.security.model.RawAccessJwtToken;
import com.ttakun.ttakun.security.model.RefreshToken;
import com.ttakun.ttakun.security.model.UserContext;
import com.ttakun.ttakun.security.verifier.TokenVerifier;
import com.ttakun.ttakun.useCase.user.getRecoverPassword.GetRecoverPasswordInput;
import com.ttakun.ttakun.useCase.user.getRecoverPassword.GetRecoverPasswordUseCase;
import com.ttakun.ttakun.useCase.user.getUser.GetUserInput;
import com.ttakun.ttakun.useCase.user.getUser.GetUserOutput;
import com.ttakun.ttakun.useCase.user.getUser.GetUserUseCase;
import com.ttakun.ttakun.useCase.user.getUserByCredentials.GetUserByCredentialsOutput;
import com.ttakun.ttakun.useCase.user.getUserByCredentials.GetUserByCredentialsUseCase;
import com.ttakun.ttakun.useCase.user.recoverPassword.RecoverPasswordUseCase;
import com.ttakun.ttakun.useCase.user.resetPassword.ResetPasswordUseCase;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.ttakun.ttakun.util.CollectionUtil.convertToList;

@RestController
@RequestMapping("/v1/auth")
@Api(tags = "Auth")
public class AuthController {

    @Autowired private JwtTokenFactory tokenFactory;
    @Autowired private JwtSettings jwtSettings;
    @Autowired private TokenVerifier tokenVerifier;
    @Autowired private GetRecoverPasswordUseCase getRecoverPasswordUseCase;
    @Autowired private GetUserUseCase getUserUseCase;
    @Autowired private GetUserByCredentialsUseCase getUserByCredentialsUseCase;
    @Autowired private RecoverPasswordUseCase recoverPasswordUseCase;
    @Autowired private ResetPasswordUseCase resetPasswordUseCase;

    @PostMapping("/login")
    @ApiOperation(value = "Login", notes = "Get the authentication JWT token and the refresh token.")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            GetUserByCredentialsOutput output = getUserByCredentialsUseCase.execute(request.toGetUserByCredentialsInput());

            return createLoginResponse(output.getUser(), output.getUserPrivileges());
        } catch (UserNotFoundException e) {
            throw new UnauthorizedException();
        }
    }

    @PostMapping(value = "/token")
    @ApiOperation(value = "Refresh token", notes = "Get a new authentication JWT token and new refresh token.")
    public LoginResponse refreshToken(
        @ApiParam(value = "'refreshToken' returned in previous login call.", name = "refresh_token", type = "String")
        @RequestParam(value = "refresh_token")
        String token
    ) {
        if (!tokenVerifier.verify(token)) {
            throw new UnauthorizedException();
        }

        RawAccessJwtToken rawToken = new RawAccessJwtToken(token);
        RefreshToken refreshToken = RefreshToken.create(rawToken, jwtSettings.getSigningKey());
        GetUserOutput output = getUserUseCase.execute(new GetUserInput(refreshToken.getSubject()));

        return createLoginResponse(output.getUser(), output.getUserPrivileges());
    }

    @PostMapping("/recover-password")
    @ApiOperation(value = "Recover password", notes = "Request a password change, calling this endpoint will send the user an email with the link to reset the password.")
    public void recoverPassword(@Valid @RequestBody RecoverPasswordRequest request) {
        recoverPasswordUseCase.execute(request.toRecoverPasswordInput());
    }

    @GetMapping("/recover-password/{hash}")
    @ApiOperation(value = "Check password recovering hash is valid", notes = "Get the validity of a given password recovering hash.")
    public void checkRecoverPassword(
        @ApiParam(value = "Hash received in the email sent after a previous call to Recover password endpoint.", name = "hash", type = "String")
        @PathVariable
        String hash
    ) {
        GetRecoverPasswordInput input = new GetRecoverPasswordInput(hash);
        getRecoverPasswordUseCase.execute(input);
    }

    @PostMapping("/reset-password")
    @ApiOperation(value = "Reset password", notes = "Change user password.")
    public void resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        resetPasswordUseCase.execute(request.toResetPasswordInput());
    }

    private LoginResponse createLoginResponse(UserDTO user, List<UserPrivilegeDTO> userPrivileges) {
        try {
            String privileges = getPrivileges(userPrivileges);
            List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(privileges);
            UserContext userContext = UserContext.create(user, authorityList);
            JwtToken accessToken = tokenFactory.createAccessJwtToken(userContext);
            JwtToken refreshToken = tokenFactory.createRefreshToken(userContext);

            return new LoginResponse(accessToken.getToken(), refreshToken.getToken());
        } catch (Exception e) {
            throw new UnauthorizedException();
        }
    }

    private static String getPrivileges(List<UserPrivilegeDTO> userPrivileges) {
        List<String> privileges = convertToList(userPrivileges, UserPrivilegeDTO::getCode);

        return String.join(",", privileges);
    }
}
