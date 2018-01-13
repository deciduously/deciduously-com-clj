FROM phusion/baseimage:0.9.22

CMD ["/sbin/my_init"]

COPY . /usr/src/deciduously-com
WORKDIR /usr/src/deciduously-com

RUN echo 80 > /etc/container_environment/PORT
RUN echo prod > /etc/container_environment/BUILD
RUN echo dist/ > /etc/container_environment/DIST
RUN echo yes > /etc/container_environment/BOOT_AS_ROOT

RUN apt-get update
RUN apt-get install -y build-essential curl default-jre
RUN make install
EXPOSE 80

CMD ["java", "-jar", "target/server.jar"]

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
