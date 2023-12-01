package com.ttakun.ttakun.builder.impl;

import com.ttakun.ttakun.builder.PrivilegeBuilder;
import com.ttakun.ttakun.constants.PrivilegeType;
import com.ttakun.ttakun.dto.PrivilegeDTO;
import com.ttakun.ttakun.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

import com.ttakun.ttakun.util.CollectionUtil;

@Service
public class PrivilegeBuilderImpl implements PrivilegeBuilder {
    private MessageSource messageSource;

    @Autowired
    public PrivilegeBuilderImpl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public PrivilegeDTO convertToPrivilegeDTO(Privilege privilege) {
        String translatedDisplay = getTranslatedPrivilegeName(privilege);
        return new PrivilegeDTO(privilege, translatedDisplay);
    }

    @Override
    public List<PrivilegeDTO> convertToPrivilegeDTOs(List<Privilege> privileges) {
        return CollectionUtil.convertToList(privileges, this::convertToPrivilegeDTO);
    }

    private String getTranslatedPrivilegeName(Privilege privilege) {
        PrivilegeType privilegeType = PrivilegeType.getByCode(privilege.getCode());
        Locale locale = LocaleContextHolder.getLocale();

        return messageSource.getMessage(privilegeType.getDisplay(), null, locale);
    }
}
