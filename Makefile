.PHONY: help clean deps install release test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

boot		= $(shell which boot)
project		= deciduously-com
atom="$(project)-$(version)"
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
				 (rm -fv .installed .tested .released .build .dload)

mkdirs:
	mkdir -p release

.dload: mkdir -p bin/
	curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh
	chmod 755 bin/boot

.build: mkdirs
				$(boot) build
				date > .build

.deps: .dload
	date > .deps

deps: .deps

.installed: .build
	cp LICENSE $(dist)
	cp $(readme) $(dist)
	date > .installed

install: .installed

.released: .installed
	(mv  $(dist) $(release) &&
	cp $(server) $(release)target/server.jar &&
	mv $(release) $(atom))
	$(shell tar -cf - $(atom) | xz -9e -c - > $(atom)$(atom).jar.tar.xz)
	rm -rf $(atom)
	date > .released

release: .released

.tested: .deps
	(export BOOT_VERSION=2.7.2 && bin/boot midje)
	date > .tested

test: .tested
