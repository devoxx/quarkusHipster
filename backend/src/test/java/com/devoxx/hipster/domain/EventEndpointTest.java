package com.devoxx.hipster.domain;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import java.net.HttpURLConnection;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class EventEndpointTest {

    @Test
    void testGetOneEvent() {
        given()
                .when().get("/api/events/1")
                .then()
                .statusCode(HttpURLConnection.HTTP_OK)
                .assertThat()
                .body(containsString("Devoxx"),
                      containsString("for developers"));

    }

    @Test
    void testGetAllEvents() {
        //List all, the database has initially 2 events
        given()
                .when().get("/api/events")
                .then()
                .statusCode(HttpURLConnection.HTTP_OK)
                .assertThat()
                .body("size()", is(2));

    }
}
