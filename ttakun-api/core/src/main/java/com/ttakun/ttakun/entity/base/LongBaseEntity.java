package com.ttakun.ttakun.entity.base;

import javax.persistence.*;

@MappedSuperclass
public abstract class LongBaseEntity extends Datehashable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    protected Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
