import QuestionStepClient from "./question-step-client";

export default async function UmfrageStepPage({ params }) {
  const resolvedParams = await params;
  return <QuestionStepClient step={resolvedParams.step} />;
}

