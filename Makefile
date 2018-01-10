.PHONY: clean clean-deps deps help install test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

project				= deciduously-com
version       = $(shell grep ^version version.properties | sed 's/.*=//')
verfile       = version.properties
dist          = $(PWD)/$(DIST)
server				= target/server.jar
readme        = README.md

help:
				@echo "version =" $(version)
				@echo "Usage: make {clean|clean-deps|deps|help|install|test}" 1>&2 && false

clean:
				 (rm -fv .installed .tested .released .pom .server)

clean-deps:
				(rm -Rfv bin)

bin/boot:
				mkdir -p bin
				curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh
				chmod 755 bin/boot

deps: bin/boot

.pom :  bin/boot pom -v $(version)
				date > .pom

.server: .pom
				bin/boot build
				date > .server

.installed: .server
				cp $(server) "$(dist)target"
				cp $(readme) $(dist)
				date > .installed

install: .installed

.released: .installed .tested
				$(shell tar -cf - $(dist) | xz -9e -c - > "$(project)-$(version).bin.tar.xz")
				.released

release: .released

.tested: bin/boot
				(export BOOT_VERSION=2.7.2 && bin/boot midje)
				date > .tested

test: .tested
