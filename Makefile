.PHONY: clean deps help test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

version       = $(shell grep ^version version.properties | sed 's/.*=//')
verfile       = version.properties

help:
				@echo "version =" $(version)
				@echo "Usage: make {clean|deps|help|test}" 1>&2 && false

clean:
				(rm -Rfv bin)

mkdirs:
				mkdir -p bin

bin/boot: mkdirs
				curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh
				chmod 755 bin/boot

deps: bin/boot

.tested: bin/boot
				(export BOOT_VERSION=2.7.2 && ../../bin/boot midje)
				date > .tested

test: .tested
