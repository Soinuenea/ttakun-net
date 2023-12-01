package com.ttakun.ttakun.service.impl;

import com.ttakun.ttakun.entity.Error;
import com.ttakun.ttakun.repository.ErrorRepository;
import com.ttakun.ttakun.service.ErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ErrorServiceImpl implements ErrorService {

    private ErrorRepository errorRepository;

    @Autowired
    public ErrorServiceImpl(ErrorRepository errorRepository) {
        this.errorRepository = errorRepository;
    }

    public void save(Error error) {
        this.errorRepository.save(error);
    }
}
