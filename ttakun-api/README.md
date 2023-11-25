Ttakun API
===========

**Dependencies**

* docker
* docker compose
* JDK 11

**Project configuration**

Run the following command in a terminal
````
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
````


###Running

Start DB & SMTP docker containers:

````
cd .docker && docker compose up -d
````

**Fixtures**

Run console from terminal:
````
./mvnw spring-boot:run -pl console -am
(select number 2)
````

######Alternatives:

* Insert fixtures:
````
Run console/src/main/java/com/ttakun/ttakun/Application --fixtures as Java Application.
````

* Delete fixtures:
````
Run console/src/main/java/com/ttakun/ttakun/Application --truncate as Java Application.
````

**Build project**
````
./mvnw clean package
````

**Start API server**

Run console from terminal:
````
./mvnw spring-boot:run -pl api -am
````

######Alternatives:

* Start API server:
````
Run api/src/main/java/com/ttakun/ttakun/Application as Java Application.
````

* Start API server saving logs into ELK:
````
Run api/src/main/java/com/ttakun/ttakun/Application --logging.file=.logs/api.log as Java Application.
````

**Bundle up application**

````
./mvnw clean install
````

**Swagger API documentation**

[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

**Local mail inbox**

Access [http://localhost:1080](http://localhost:1080) to check mail sending.
