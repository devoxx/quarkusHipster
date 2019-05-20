package com.devoxx.hipster.domain;

import io.quarkus.test.junit.QuarkusTest;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.*;

@QuarkusTest
class UserEndpointTest {

    @Test
    void testGetOneUser() {
        //List all, the database has initially 5 authorities
        given()
                .when().get("/api/user/1")
                .then()
                .statusCode(HttpStatus.SC_OK)
                .assertThat()
                .body(containsString("Stephan"),
                      containsString("Janssen"),
                      not(containsString("sja@devoxx.com")));

    }
}
