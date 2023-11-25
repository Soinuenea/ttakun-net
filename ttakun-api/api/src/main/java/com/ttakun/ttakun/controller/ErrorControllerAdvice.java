package com.ttakun.ttakun.controller;

import com.ttakun.ttakun.constants.ErrorConstants;
import com.ttakun.ttakun.controller.v1.response.error.ErrorResponse;
import com.ttakun.ttakun.exception.*;

import com.ttakun.ttakun.exception.BaseGlobalException;
import com.ttakun.ttakun.exception.BaseNotFoundException;
import com.ttakun.ttakun.exception.CustomFieldErrorsException;
import com.ttakun.ttakun.exception.ErrorSummaryException;
import com.ttakun.ttakun.exception.ExceptionCode;
import com.ttakun.ttakun.exception.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@ControllerAdvice
public class ErrorControllerAdvice {

    private static Logger logger = org.slf4j.LoggerFactory.getLogger(ErrorControllerAdvice.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleFieldException(MethodArgumentNotValidException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromExceptionResult(exception.getBindingResult());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestParameterException(MissingServletRequestParameterException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromFieldAndError(exception.getParameterName(), ErrorConstants.REQUIRED);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestPartException(MissingServletRequestPartException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromFieldAndError(exception.getRequestPartName(), ErrorConstants.REQUIRED);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ UnauthorizedException.class, JwtException.class, ExpiredJwtException.class })
    public ResponseEntity<ErrorResponse> handleJwtException(RuntimeException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromGlobalExceptionResult(exception.getMessage());

        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(CustomFieldErrorsException.class)
    public ResponseEntity<ErrorResponse> handleCustomFieldException(CustomFieldErrorsException exception) {
        logger.info(String.join(",", exception.getErrors().keySet()), exception);
        ErrorResponse error = ErrorResponse.fromCustomFieldErrors(exception.getErrors());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ErrorSummaryException.class)
    public ResponseEntity<ErrorResponse> handleErrorSummaryException(ErrorSummaryException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse
            .fromGlobalExceptionSummary(exception.getField(), exception.getKey(), exception.getExceptions());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BaseNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(BaseNotFoundException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromGlobalExceptionResultWithValues(exception.getKey(), exception.getValues());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BaseGlobalException.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(BaseGlobalException exception) {
        logger.info(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromGlobalExceptionResultWithValues(exception.getKey(), exception.getValues());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception exception) {
        logger.error(exception.getMessage(), exception);
        ErrorResponse error = ErrorResponse.fromGlobalExceptionResult(ExceptionCode.UNRECOGNIZED_ERROR.key());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
