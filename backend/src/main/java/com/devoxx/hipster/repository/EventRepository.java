package com.devoxx.hipster.repository;

import com.devoxx.hipster.domain.Event;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EventRepository implements PanacheRepositoryBase<Event,Integer> {

    public Event findByName(String name){
        return find("name", name).firstResult();
    }
}
