AM_CPPFLAGS = @VMOD_INCLUDES@ -Wall -Werror

vmoddir = @VMOD_DIR@
vmod_LTLIBRARIES = libvmod_rtfrontend.la

libvmod_rtfrontend_la_LDFLAGS = -module -export-dynamic -avoid-version -shared

libvmod_rtfrontend_la_SOURCES = \
	vmod_rtfrontend.c

nodist_libvmod_rtfrontend_la_SOURCES = \
	vcc_if.c \
	vcc_if.h

vmod_rtfrontend.lo: vcc_if.c vcc_if.h

vcc_if.c: vcc_if.h

vcc_if.h: @VMODTOOL@ $(top_srcdir)/src/vmod_rtfrontend.vcc
	@VMODTOOL@ $(top_srcdir)/src/vmod_rtfrontend.vcc

VMOD_TESTS = $(top_srcdir)/src/tests/*.vtc
.PHONY: $(VMOD_TESTS)

$(top_srcdir)/src/tests/*.vtc: libvmod_rtfrontend.la
	@VARNISHTEST@ -Dvarnishd=@VARNISHD@ -Dvmod_topbuild=$(abs_top_builddir) $@

check: $(VMOD_TESTS)

EXTRA_DIST = \
	vmod_rtfrontend.vcc \
	$(VMOD_TESTS)

CLEANFILES = \
	$(builddir)/vcc_if.c \
	$(builddir)/vcc_if.h \
	$(builddir)/vmod_rtfrontend.rst \
	$(builddir)/vmod_rtfrontend.man.rst
