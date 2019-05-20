package com.devoxx.hipster.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Cacheable
@Entity(name = "hipster_event")
public class Event extends PanacheEntity {

    @NotNull
    @Size(min = 3, max = 100)
    @Column(nullable = false)
    public String name;

    public String description;
}
