package com.devoxx.hipster.repository;

import com.devoxx.hipster.domain.User;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<User,Integer> {

    public User findByName(String name){
        return find("first_name", name).firstResult();
    }

}
