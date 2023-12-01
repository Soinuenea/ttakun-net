package com.ttakun.ttakun.controller.v1;

import com.ttakun.ttakun.controller.v1.request.error.ErrorRequest;
import com.ttakun.ttakun.security.extractor.JwtSettings;
import com.ttakun.ttakun.security.extractor.TokenExtractor;
import com.ttakun.ttakun.security.model.RawAccessJwtToken;
import com.ttakun.ttakun.useCase.error.saveError.SaveErrorUseCase;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.util.StringUtils.isEmpty;

@RestController
@RequestMapping("v1/errors")
@Api(tags = "Error")
public class ErrorController {

    @Autowired private JwtSettings jwtSettings;
    @Autowired private SaveErrorUseCase saveErrorUseCase;
    @Autowired private TokenExtractor tokenExtractor;

    @PostMapping()
    @ApiOperation(value = "Save error", notes = "Saves an error occurred in any client. Both authorized and unauthorized calls are permitted to this endpoint.")
    public void saveError(
        @Valid @RequestBody ErrorRequest request,
        @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        String hash = getUserFromAuthorizationOrNull(authorization);

        saveErrorUseCase.execute(request.toSaveErrorInput(hash));
    }

    private String getUserFromAuthorizationOrNull(String authorization) {
        if (isEmpty(authorization)) return null;

        RawAccessJwtToken rawAccessToken = new RawAccessJwtToken(tokenExtractor.extract(authorization));
        Jws<Claims> jwsClaims = rawAccessToken.parseClaims(jwtSettings.getSigningKey());

        return jwsClaims.getBody().getSubject();
    }
}
