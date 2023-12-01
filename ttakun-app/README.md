# Ttakun App

===========

**Dependencies**

* OpenJDK 11 (In order to have multiple SDKs installed, checkout [SDKMan](https://sdkman.io/))
* EditorConfig plugin installed

**Project configuration**

Run the following command in a terminal
````
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
````

###Running

**Build project**
````
./mvnw clean package
````

**Start API server**

Run from terminal:
````
./mvnw spring-boot:run
````

######Alternatives:

* Start server:
````
Run api/src/main/java/com/ttakun/base/Application as Java Application.
````

**Bundle up application**

````
./mvnw clean install
````

**Build a .jar compilation for specific profile**

````
    Run ./mvnw clean package -P[profile], for example: ./mvnw clean package -Ptest
````

