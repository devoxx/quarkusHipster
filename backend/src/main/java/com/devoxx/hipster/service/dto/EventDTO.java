package com.devoxx.hipster.service.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

/**
 * @author <a href="mailto:sja@devoxx.com">Stephan Janssen</a>
 */
public class EventDTO {

    private Long id;

    @Max(100)
    @NotNull
    private String name;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
