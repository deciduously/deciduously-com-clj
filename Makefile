.PHONY: help clean deps install release test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

boot		= $(shell which boot)
project		= deciduously-com
version		= $(shell grep ^version version.properties | sed 's/.*=//')
verfile		= version.properties
dist		= $(DIST)
release		= release/
server		= target/server.jar
readme		= README.md

help:
				@echo "version =" $(version)
				@echo "Usage: make {clean|deps|help|install|release|test}" 1>&2 && false

clean:
				 (rm -Rfv $(release) bin/)
				 (rm -fv .installed .tested .released .build)

bin/boot:
	mkdir -p b
	curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh
	chmod 755 bin/boot

deps: bin/boot

.build:
				$(boot) build
				cp $(server) $(dist)
				date > .build

.installed: .build
	cp LICENSE $(dist)
	cp $(readme) $(dist)
	date > .installed

install: .installed

.released: .tested .installed
	mkdir -p $(release)
	$(shell tar -cf - $(dist) | xz -9e -c - > "$(PWD)/$(release)$(project)-$(version)-jar.tar.xz")
	date > .released

release: .released

.tested:
	(export BOOT_VERSION=2.7.2 && $(boot) midje -l 2)
	date > .tested

test: .tested
