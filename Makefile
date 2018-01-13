.PHONY: help clean deps install release test

SHELL       := /bin/bash
export PATH := bin:$(PATH)

project     = deciduously-com
verfile     = version.properties
version     = $(shell grep ^version $(verfile) | sed 's/.*=//')
atom        = "$(project)-$(version)"
release     = release/
server      = target/server.jar
readme      = README.md
license     = LICENSE

help:
	@echo "version =" $(version)
	@echo "Usage: make {clean|deps|help|install|release|test}" 1>&2 && false

clean:
	(rm -Rfv $(project) $(release) target/ $(DIST) bin/)
	(rm -fv $(server) .installed .tested .released .built .deps)

bin/boot:
	(mkdir -p bin/                                                                              && \
	curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh  && \
	chmod 755 bin/boot)

$(server): boot.properties
	bin/boot build && \
	date > .built

deps: bin/boot

.installed: $(server)
	mkdir -p "$(project)/target"       &&  \
	cp -r $(DIST) $(project)           &&  \
	cp $(license) $(project)           &&  \
	cp $(readme) $(project)            &&  \
	cp $(verfile) $(project)		   &&  \
	cp $(server) "$(project)/target/"  &&  \
	date > .installed

install: .installed

.released: .installed
	$(shell mkdir $(release) && tar -cf - $(project) | xz -9e -c - > "$(release)$(atom)-bundle.bin.tar.xz")
	date > .released

release: .released

.tested: .released
	(export BOOT_VERSION=2.7.2 && bin/boot midje)
	date > .tested

test: .tested
