FROM openjdk:9

WORKDIR /app

ADD . /app

RUN make install

EXPOSE 80

ENV PORT 80

CMD ["java", "-jar", "target/server.jar"]
