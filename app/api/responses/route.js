import { NextResponse } from "next/server";
import { getResponsesCollection } from "@/lib/mongodb";
import { isAllowedQuestionId } from "@/lib/questionIds";

export const runtime = "nodejs";

const MAX_RESPONSE_LENGTH = 500;

export async function GET(request) {
  const questionId = request.nextUrl.searchParams.get("questionId");
  if (!questionId || !isAllowedQuestionId(questionId)) {
    return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
  }

  const coll = await getResponsesCollection();
  if (!coll) {
    return NextResponse.json({ responses: [], disabled: true });
  }

  const docs = await coll
    .find({ questionId: questionId.trim() })
    .sort({ createdAt: 1 })
    .toArray();

  const responses = docs.map((d) => ({
    id: d._id.toString(),
    questionId: d.questionId,
    text: d.text,
    userId: d.userId,
    createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
  }));

  return NextResponse.json({ responses });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { questionId, text, userId } = body;

  if (!questionId || !isAllowedQuestionId(questionId)) {
    return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
  }
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }
  if (typeof userId !== "string" || userId.length < 4 || userId.length > 200) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const trimmed = text.trim().slice(0, MAX_RESPONSE_LENGTH);
  const coll = await getResponsesCollection();
  if (!coll) {
    return NextResponse.json(
      { error: "Database not configured (MONGODB_URI missing)" },
      { status: 503 }
    );
  }

  const doc = {
    questionId: questionId.trim(),
    text: trimmed,
    userId,
    createdAt: new Date(),
  };

  const result = await coll.insertOne(doc);

  return NextResponse.json({
    response: {
      id: result.insertedId.toString(),
      questionId: doc.questionId,
      text: doc.text,
      userId: doc.userId,
      createdAt: doc.createdAt.toISOString(),
    },
  });
}
