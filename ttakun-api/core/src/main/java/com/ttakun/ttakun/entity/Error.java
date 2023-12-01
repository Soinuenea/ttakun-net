package com.ttakun.ttakun.entity;


import com.ttakun.ttakun.entity.base.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "error")
public class Error extends BaseEntity {

    @Column(name = "message", columnDefinition = "text", nullable = false)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Error() {
    }

    public Error(String message, User user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
