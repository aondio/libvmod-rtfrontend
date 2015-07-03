AM_CPPFLAGS = @VMOD_INCLUDES@ -Wall -Werror

vmoddir = @VMOD_DIR@
vmod_LTLIBRARIES = libvmod_libvmod-rtfrontend.la

libvmod_libvmod-rtfrontend_la_LDFLAGS = -module -export-dynamic -avoid-version -shared

libvmod_libvmod-rtfrontend_la_SOURCES = \
	vmod_libvmod-rtfrontend.c

nodist_libvmod_libvmod-rtfrontend_la_SOURCES = \
	vcc_if.c \
	vcc_if.h

vmod_libvmod-rtfrontend.lo: vcc_if.c vcc_if.h

vcc_if.c: vcc_if.h

vcc_if.h: @VMODTOOL@ $(top_srcdir)/src/vmod_libvmod-rtfrontend.vcc
	@VMODTOOL@ $(top_srcdir)/src/vmod_libvmod-rtfrontend.vcc

VMOD_TESTS = $(top_srcdir)/src/tests/*.vtc
.PHONY: $(VMOD_TESTS)

$(top_srcdir)/src/tests/*.vtc: libvmod_libvmod-rtfrontend.la
	@VARNISHTEST@ -Dvarnishd=@VARNISHD@ -Dvmod_topbuild=$(abs_top_builddir) $@

check: $(VMOD_TESTS)

EXTRA_DIST = \
	vmod_libvmod-rtfrontend.vcc \
	$(VMOD_TESTS)

CLEANFILES = \
	$(builddir)/vcc_if.c \
	$(builddir)/vcc_if.h \
	$(builddir)/vmod_libvmod-rtfrontend.rst \
	$(builddir)/vmod_libvmod-rtfrontend.man.rst
