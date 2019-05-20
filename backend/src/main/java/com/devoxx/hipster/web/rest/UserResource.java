package com.devoxx.hipster.web.rest;

import com.devoxx.hipster.service.UserService;
import com.devoxx.hipster.service.dto.UserDTO;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;

/**
 * A JHipster mock for user & account REST methods.
 *
 * TODO Implement the methods
 *
 * @author <a href="mailto:sja@devoxx.com">Stephan Janssen</a>
 */
@Path("api")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class UserResource {

    @Inject
    UserService userService;

    @GET
    @Path("user/{id}")
    public UserDTO getUser(@PathParam Long id) {
        return userService.getUser(id);
    }

    @POST
    @Path("authenticate")
    public void login() {
        System.out.println("TODO : Authenticate");
    }

    @GET
    @Path("account")
    public UserDTO getAccount() {

        System.out.println("TODO : get current account");

        return userService.getUser(1L);
    }
}

