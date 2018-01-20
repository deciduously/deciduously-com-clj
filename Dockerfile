FROM phusion/baseimage:0.9.22

CMD ["/sbin/my_init"]

COPY . /usr/src/deciduously-com
WORKDIR /usr/src/deciduously-com

ENV PORT 80
ENV BUILD prod
ENV DIST dist/

RUN apt-get update
RUN apt-get install -y make curl default-jre
RUN BOOT_AS_ROOT=yes make install
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
EXPOSE 80

CMD ["java", "-jar", "target/server.jar"]

