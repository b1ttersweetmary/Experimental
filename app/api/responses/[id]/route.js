import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getResponsesCollection } from "@/lib/mongodb";

export const runtime = "nodejs";

function parseBody(request) {
  return request
    .json()
    .catch(() => ({}));
}

export async function DELETE(request, context) {
  const params = await context.params;
  const id = params?.id;
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await parseBody(request);
  const userId = typeof body?.userId === "string" ? body.userId : null;
  const adminSecret = request.headers.get("x-admin-secret");
  const envSecret = process.env.RESPONSES_ADMIN_SECRET;

  const coll = await getResponsesCollection();
  if (!coll) {
    return NextResponse.json(
      { error: "Database not configured (MONGODB_URI missing)" },
      { status: 503 }
    );
  }

  const _id = new ObjectId(id);
  const existing = await coll.findOne({ _id });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isAdmin = Boolean(envSecret && adminSecret && adminSecret === envSecret);
  if (isAdmin) {
    await coll.deleteOne({ _id });
    return NextResponse.json({ ok: true });
  }

  if (!userId || userId !== existing.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await coll.deleteOne({ _id });
  return NextResponse.json({ ok: true });
}
