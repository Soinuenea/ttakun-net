package com.ttakun.ttakun.entity.base;

import javax.persistence.*;

@MappedSuperclass
public abstract class BaseEntity extends Datehashable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    protected Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
