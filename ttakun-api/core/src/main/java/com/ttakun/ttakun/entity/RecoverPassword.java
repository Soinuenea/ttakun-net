package com.ttakun.ttakun.entity;

import com.ttakun.ttakun.constants.Constants;
import com.ttakun.ttakun.entity.base.BaseEntity;
import com.ttakun.ttakun.util.DateUtil;

import javax.persistence.*;
import java.util.Calendar;

@Entity
@Table(name = "recover_password")
public class RecoverPassword extends BaseEntity {

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user;

    @Column(name = "used", nullable = false)
    private Boolean used;

    @Column(name = "expiring_time")
    private Long expiringTime;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }

    public Long getExpiringTime() {
        return expiringTime;
    }

    public void setExpiringTime(Long expiringTime) {
        this.expiringTime = expiringTime;
    }

    public RecoverPassword() {}

    public RecoverPassword(User user) {
        this.user = user;
    }

    @PrePersist
    public void onCreate() {
        super.onCreate();

        used = false;
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, Constants.RECOVER_PASSWORD_EXPIRING_MINUTES);
        expiringTime = calendar.getTimeInMillis();
    }

    public boolean isExpired() {
        return expiringTime < DateUtil.getCurrentTimeInMillis();
    }
}
