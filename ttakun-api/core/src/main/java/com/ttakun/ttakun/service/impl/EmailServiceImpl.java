package com.ttakun.ttakun.service.impl;

import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.service.EmailService;
import com.ttakun.ttakun.util.MailSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
public class EmailServiceImpl implements EmailService {

    private static Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    private JavaMailSender emailSender;
    private TemplateEngine templateEngine;
    private MailSettings mailSettings;
    private MessageSource messageSource;

    @Autowired
    public EmailServiceImpl(
        JavaMailSender emailSender,
        TemplateEngine templateEngine,
        MailSettings mailSettings,
        MessageSource messageSource
    ) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
        this.mailSettings = mailSettings;
        this.messageSource = messageSource;
    }

    public void sendRecoverPasswordEmail(RecoverPassword recoverPassword) {
        Context context = new Context();
        context.setVariable("resetUrl", mailSettings.getResetPasswordUrl() + recoverPassword.getHash());
        context.setVariable("name", recoverPassword.getUser().getFirstName());
        String mailHtml = templateEngine.process("recoverPasswordMail", context);
        Locale locale = LocaleContextHolder.getLocale();
        String subject = messageSource.getMessage("mail.recoverPassword.subject", null, locale);

        send(recoverPassword.getUser().getEmail(), subject, mailHtml, true);
    }

    private String getEmailTo(String email) {
        return mailSettings.isFakeTo() ? mailSettings.getFakeEmail() : email;
    }

    private void send(String to, String subject, String text, boolean isHtml) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
            );
            messageHelper.setFrom(mailSettings.getFrom(), mailSettings.getFromName());
            messageHelper.setTo(getEmailTo(to));
            messageHelper.setSubject(subject);
            messageHelper.setText(text, isHtml);
            emailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            logger.error(e.getMessage());
        }
    }
}
