package com.devoxx.hipster.service.mapper;

import com.devoxx.hipster.domain.Event;
import com.devoxx.hipster.service.dto.EventDTO;
import org.mapstruct.Mapper;

@Mapper(config = QuarkusMappingConfig.class)
public interface EventMapper {

    EventDTO toDto(Event event);

    Event toEntity(EventDTO eventDTO);
}
