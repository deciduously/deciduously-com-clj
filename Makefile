.PHONY: help clean deps install release test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

project		= deciduously-com
verfile		= version.properties
version		= $(shell grep ^version $(verfile) | sed 's/.*=//')
atom		= "$(project)-$(version)"
release		= release/
server		= target/server.jar
readme		= README.md

help:
	@echo "version =" $(version)
	@echo "Usage: make {clean|deps|help|install|release|test}" 1>&2 && false

clean:
	(rm -Rfv $(project) $(release) bin/)
	(rm -fv .boot-chk .installed .tested .released .built .deps)

bin/boot:
	(mkdir -p bin/)
	(curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh)
	(chmod 755 bin/boot)
	(date > .boot-chk)

$(server): bin/boot
	(export VERSION=$(version) && bin/boot build)
	(date > .built)

deps: bin/boot

.installed: $(server)
	(mkdir -p "$(project)/target")
	(cp -r $(DIST) $(project))
	(cp LICENSE $(project) && cp $(readme) $(project) && cp $(server) "$(project)/target")
	(date > .installed)

install: .installed

.released: .installed
	(mkdir -p $(release))
	$(shell tar -cf - $(project) | xz -9e -c - > "$(atom)-bundle.bin.tar.xz")
	(date > .released)

release: .released

.tested: bin/boot
	(export BOOT_VERSION=2.7.2 && bin/boot midje)

test: .tested
