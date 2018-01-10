.PHONY: clean deps help install release test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

version       = $(shell grep ^version version.properties | sed 's/.*=//')
verfile       = version.properties
dist          = $(PWD)/$(DIST)
server				= target/server.jar

help:
				@echo "version =" $(version)
				@echo "Usage: make {clean|deps|help|install|release|test}" 1>&2 && false

clean:
				(rm -Rfv bin)
				(rm -Rfv dist)
				(rm -fv .installed .tested .released)

mkdirs:
				mkdir -p bin

bin/boot: mkdirs
				curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh
				chmod 755 bin/boot

deps: bin/boot

$(server): $(verfile) bin/boot build

.installed: mkdirs $(server)
				cp $(server) $(dist)
				date > .installed

.released: .installed
				mkdir -p dist

release: .released

.tested: bin/boot
				(export BOOT_VERSION=2.7.2 && bin/boot midje)
				date > .tested

test: .tested
