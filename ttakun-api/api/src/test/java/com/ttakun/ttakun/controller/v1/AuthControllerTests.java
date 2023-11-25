package com.ttakun.ttakun.controller.v1;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void tokenWhenCredentialsAreCorrect() throws Exception {
        String loginRequest = "{\"email\": \"admin@ttakun.com\", \"password\": \"admin\" }";
        this.mockMvc
            .perform(
                post("/v1/auth/login")
                    .content(loginRequest)
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("token").exists())
            .andExpect(jsonPath("refreshToken").exists());
    }

    @Test
    public void unauthorizedWhenCredentialsAreNotCorrect() throws Exception {
        String loginRequest = "{\"email\": \"admin@ttakun.com\", \"password\": \"notcorrectpassword\" }";
        this.mockMvc
            .perform(
                post("/v1/auth/login")
                    .content(loginRequest)
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andDo(print())
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("errors.global.code").exists());
    }
}
