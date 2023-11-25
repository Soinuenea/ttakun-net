package com.ttakun.ttakun.entity.base;

import com.ttakun.ttakun.util.HashUtil;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

@MappedSuperclass
public abstract class Datehashable {
    @Column(name = "hash", nullable = false, updatable = false)
    protected String hash;

    @Column(name = "created", updatable = false)
    private Date createdAt;

    @Column(name = "updated")
    private Date updatedAt;

    public String getHash() {
        return hash;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.hash = HashUtil.createHash();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}
