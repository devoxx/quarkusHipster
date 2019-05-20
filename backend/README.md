# Quarkus Hipster demo

This is a minimal CRUD service exposing a couple of endpoints over REST,
with a front-end based on Angular so you can play with it from your browser.

While the code is surprisingly simple, under the hood this is using:
 - RESTEasy to expose the REST endpoints
 - Hibernate ORM with Panache to perform the CRUD operations on the database
 - A PostgreSQL database; see below to run one via Docker
 - ArC, the CDI inspired dependency injection tool with zero overhead
 - The high performance Agroal connection pool
 - Infinispan based caching
 - All safely coordinated by the Narayana Transaction Manager

## Requirements

To compile and run this demo you will need:
- GraalVM `1.0 rc12`
- Apache Maven `3.5.3+`

In addition, you will need either a PostgreSQL database, or Docker to run one.

If you don't have GraalVM installed, you can download it here:

<https://github.com/oracle/graal/releases>

Installing GraalVM is very similar to installing any other JDK:
just unpack it, add it to your path, and point the `JAVA_HOME`
and `GRAALVM_HOME` environment variables to it.

You should then use this JDK to run the Maven build.


## Building the demo

After having set GraalVM as your JVM, launch the Maven build on
the checked out sources of this demo:

> mvn package

## Running the demo

### Prepare a PostgreSQL instance

First we will need a PostgreSQL database; you can launch one easily if you have Docker installed:

> docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name quarkus_test -e POSTGRES_USER=quarkus_test -e POSTGRES_PASSWORD=quarkus_test -e POSTGRES_DB=quarkus_test -p 5432:5432 postgres:10.5

Alternatively you can setup a PostgreSQL instance in any another way.

The connection properties of the Agroal datasource are configured in the standard Quarkus configuration file, which you will find in
`src/main/resources/application.properties`.

### Run Quarkus in developer mode

To run the application in interactive mode (developer mode):

>  mvn compile quarkus:dev

In this mode you can make changes to the code and have the changes immediately applied, by just refreshing your browser.

    Hot reload works even when modifying your JPA entities.
    Try it! Even the database schema will be updated on the fly.

### Run Quarkus in JVM mode

When you're done playing with "dev-mode" you can run it as a standard Java application.

First compile it:

> mvn package

Then run it:

> java -jar ./target/hibernate-orm-panache-resteasy-1.0-SNAPSHOT-runner.jar

    Have a look at how fast it boots.
    Or measure total native memory consumption...

### Run Quarkus as a native application

This same demo can be compiled into native code: no modifications required.

This implies that you no longer need to install a JVM on your production environment, as the runtime technology is included in the produced binary, and optimized to run with minimal resource overhead.

Compilation will take a bit longer, so this step is disabled by default;
let's build again by enabling the `native` profile:

> mvn package -Dnative

After getting a cup of coffee, you'll be able to run this binary directly:

> ./target/hibernate-orm-panache-resteasy-1.0-SNAPSHOT-runner

    Please brace yourself: don't choke on that fresh cup of coffee you just got.
    
    Now observe the time it took to boot, and remember: that time was mostly spent to generate the tables in your database and import the initial data.
    
    Next, maybe you're ready to measure how much memory this service is consuming.

N.B. This implies all dependencies have been compiled to native;
that's a whole lot of stuff: from the bytecode enhancements that Panache
applies to your entities, to the lower level essential components such as the PostgreSQL JDBC driver, the Undertow webserver.

## See the demo in your browser

Navigate to:

<http://localhost:8080/index.html>

Have fun, and join the team of contributors!

---
## Setup GraalVM path

Download GraalVM 1.0 RC16 from Oracle.  Quarkus (for now) only supports GraalVM 1.0 RC16.

```
$ export PATH=/Library/Java/JavaVirtualMachines/graalvm-ce-1.0.0-rc16/Contents/Home/bin:$PATH

$ java -version
openjdk version "1.8.0_202"
OpenJDK Runtime Environment (build 1.8.0_202-20190206132754.buildslave.jdk8u-src-tar--b08)
OpenJDK GraalVM CE 1.0.0-rc16 (build 25.202-b08-jvmci-0.59, mixed mode)
```

The native image functionality is not available by default, but it can easily be added using:

```
$ gu install native-image
```

In the IDEA you need to also set the GRAALVM_HOME environment variable

```
$ export GRAALVM_HOME=/Library/Java/JavaVirtualMachines/graalvm-ce-1.0.0-rc16/Contents/Home 

```
## Run webapp

```
$ mvm clean package
```

Then run the project in dev mode :

```
$ ./mvnw clean compile quarkus:dev 
```

## First native build

```
$ mvn package -Dnative
```

And run it 

```
$ target/QuarkusHipster-1.0-SNAPSHOT-runner

2019-05-19 12:14:48,114 INFO  [org.fly.cor.int.lic.VersionPrinter] (main) Flyway Community Edition 5.2.4 by Boxfuse
2019-05-19 12:14:53,132 INFO  [org.fly.cor.int.dat.DatabaseFactory] (main) Database: jdbc:postgresql:quarkus_hipster (PostgreSQL 10.5)
2019-05-19 12:14:53,146 INFO  [org.fly.cor.int.com.DbValidate] (main) Successfully validated 1 migration (execution time 00:00.004s)
2019-05-19 12:14:53,161 INFO  [org.fly.cor.int.com.DbMigrate] (main) Current version of schema "public": 1.0.0
2019-05-19 12:14:53,162 INFO  [org.fly.cor.int.com.DbMigrate] (main) Schema "public" is up to date. No migration necessary.
2019-05-19 12:14:53,169 INFO  [io.quarkus] (main) Quarkus 0.15.0 started in 5.062s. Listening on: http://[::]:8080
2019-05-19 12:14:53,170 INFO  [io.quarkus] (main) Installed features: [agroal, cdi, flyway, hibernate-orm, jdbc-postgresql, narayana-jta, resteasy, resteasy-jsonb]
```



