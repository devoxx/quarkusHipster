package com.devoxx.hipster.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;

@Cacheable
@Entity(name = "hipster_user")
public class User extends PanacheEntity {

    public String login;

    private String password;

    @Column(name = "first_name")
    public String firstName;

    @Column(name = "last_name")
    public String lastName;

    public String email;

}
