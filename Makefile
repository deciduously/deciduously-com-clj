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

mkdirs:
	mkdir -p bin/ release/

bin/boot: mkdirs
	curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh
	chmod 755 bin/boot

deps: bin/boot

.build: bin/boot
				bin/boot build
				cp $(server) $(dist)
				date > .build

.installed: .build
	cp LICENSE $(dist)
	cp $(readme) $(dist)
	date > .installed

install: .installed

.released: .tested .installed
	$(shell tar -cf - $(dist) | xz -9e -c - > "$(release)$(project)-$(version).jar.tar.xz")
	date > .released

release: .released

.tested: bin/boot
	(export BOOT_VERSION=2.7.2 && bin/boot midje)
	date > .tested

test: .tested
