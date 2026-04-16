import TopicClient from "./TopicClient";

export default async function TopicPage({ params }) {
  const resolvedParams = await params;
  const decodedTopic = decodeURIComponent(resolvedParams.topic);

  return <TopicClient topic={decodedTopic} />;
}

