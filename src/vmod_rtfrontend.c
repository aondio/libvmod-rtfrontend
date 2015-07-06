#include <stdlib.h>

#include "cache/cache.h"
#include "vmod_html.h"
#include "vrt.h"

VCL_STRING
vmod_html(const struct vrt_ctx *ctx)
{
	struct vsb *vsb;
	unsigned u;
	u = WS_Reserve(ctx->ws, 0);
	vsb = VSB_new(NULL, ctx->ws->f, u, VSB_AUTOEXTEND);
	VSB_cat(vsb, html);
	VSB_finish(vsb);
	if (VSB_error(vsb)) {
	    VSLb(ctx->vsl, SLT_VCL_Error, "VSB error");
	    WS_Release(ctx->ws, VSB_len(vsb) + 1);
	    return "{}";
	}
	WS_Release(ctx->ws, VSB_len(vsb) + 1);
	return (vsb->s_buf);
}
