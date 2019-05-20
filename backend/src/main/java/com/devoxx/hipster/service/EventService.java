package com.devoxx.hipster.service;

import com.devoxx.hipster.domain.Event;
import com.devoxx.hipster.service.dto.EventDTO;
import com.devoxx.hipster.service.mapper.EventMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author <a href="mailto:sja@devoxx.com">Stephan Janssen</a>
 */
@ApplicationScoped
public class EventService {

    @Inject
    EventMapper eventMapper;

    /**
     * Get event by id.
     * @param id the event identifier
     * @return return the eventDTO
     */
    public EventDTO getEvent(Long id) {
        return eventMapper.toDto(Event.findById(id));
    }

    /**
     * Get all events.
     *
     * @return list of event DTOs.
     */
    public List<EventDTO> getAll() {
        Stream<Event> events = Event.streamAll();
        return events.map(event -> eventMapper.toDto(event) )
                     .collect(Collectors.toList());
    }

    /**
     * Save a event.
     *
     * @param eventDTO the entity to save
     * @return the persisted entity
     */
    public void save(EventDTO eventDTO) {
        Event event = eventMapper.toEntity(eventDTO);
        event.persist();
    }
}
