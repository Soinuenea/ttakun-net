package com.ttakun.ttakun.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public ResponseEntity error() {
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
