package com.devoxx.hipster.web.rest;

import com.devoxx.hipster.domain.Event;
import com.devoxx.hipster.service.EventService;
import com.devoxx.hipster.service.dto.EventDTO;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.net.HttpURLConnection;
import java.util.List;

@Path("api/events")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class EventResource {

    final static int HTTP_UNPROCESSABLE_ENTITY = 422;

    @Inject
    EventService eventService;

    /**
     * POST  /api/events : Create a new event.
     *
     * @param eventDTO the eventDTO to create
     * @return the new eventDTO, or with status 422 Unprocessable Entity.
     */
    @POST
    @Transactional
    public Response create(EventDTO eventDTO) {

        if (eventDTO.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", HTTP_UNPROCESSABLE_ENTITY);
        }

        eventService.save(eventDTO);

        return Response.ok(eventDTO).status(HttpURLConnection.HTTP_CREATED).build();
    }

    /**
     * PUT  /api/events : Updates an existing event.
     *
     * @param eventDTO the eventDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventDTO,
     * or with status 422 (Unprocessable Entity) if the eventDTO is not valid,
     * or with status 404 (Not Found) if the eventDTO does not exist in database.
     */
    @PUT
    @Transactional
    public EventDTO update(EventDTO eventDTO) {
        if (eventDTO.getId() == null) {
            throw new WebApplicationException("Event id was not set on request.", HTTP_UNPROCESSABLE_ENTITY);
        }

        Event event = Event.findById(eventDTO.getId());

        if (event == null) {
            throw new WebApplicationException("Event with id of " + eventDTO.getId() + " does not exist.", HttpURLConnection.HTTP_NOT_FOUND);
        }

        event.name = eventDTO.getName();
        event.description = eventDTO.getDescription();

        return eventDTO;
    }

    /**
     * GET  /api/event : Get all events.
     *
     * @return the related eventDTO, or with status 404 Not Found
     */
    @GET
    public List<EventDTO> getEvents() {
        List<EventDTO> allEvents = eventService.getAll();

        if (allEvents == null) {
            throw new WebApplicationException("No events available", HttpURLConnection.HTTP_NOT_FOUND);
        }

        return allEvents;
    }

    /**
     * GET  /api/event/{id} : Get event for id
     *
     * @param id the event identifier
     * @return the related eventDTO, or with status 404 Not Found
     */
    @GET
    @Path("{id}")
    public EventDTO getEvent(@PathParam Long id) {
        EventDTO entity = eventService.getEvent(id);
        if (entity == null) {
            throw new WebApplicationException("Event with id of " + id + " does not exist.", HttpURLConnection.HTTP_NOT_FOUND);
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response delete(@PathParam Long id) {
        Event event = Event.findById(id);

        if (event == null) {
            throw new WebApplicationException("Event with id of " + id + " does not exist.", HttpURLConnection.HTTP_NOT_FOUND);
        }

        event.delete();

        return Response.status(204).build();
    }

    @Provider
    public static class ErrorMapper implements ExceptionMapper<Exception> {

        @Override
        public Response toResponse(Exception exception) {
            int code = HttpURLConnection.HTTP_INTERNAL_ERROR;
            if (exception instanceof WebApplicationException) {
                code = ((WebApplicationException) exception).getResponse().getStatus();
            }
            return Response.status(code)
                    .entity(Json.createObjectBuilder().add("error", exception.getMessage()).add("code", code).build())
                    .build();
        }

    }
}
