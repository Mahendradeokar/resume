import ClientResumePage from "./ClientResumePage";

interface ResumeInfo {
  title: string;
  path: string;
}
type ResumeMap = Record<string, ResumeInfo>;

export default async function ResumeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resumes: ResumeMap = JSON.parse(
    process.env.NEXT_PUBLIC_RESUMES ?? "{}",
  ) as ResumeMap;
  const resume: ResumeInfo | undefined = resumes[slug];

  return <ClientResumePage resume={resume} slug={slug} />;
}

export async function generateStaticParams() {
  const resumes: ResumeMap = JSON.parse(
    process.env.NEXT_PUBLIC_RESUMES ?? "{}",
  ) as ResumeMap;
  return Object.keys(resumes).map((slug) => ({ slug }));
}
