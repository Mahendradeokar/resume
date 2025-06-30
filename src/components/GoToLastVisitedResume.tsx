"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentProps } from "react";
import { getVisitedResume } from "~/lib/utils";

type GoToLastVisitedResumeProps = Omit<ComponentProps<typeof Link>, "href">;

export default function GoToLastVisitedResume({
  children,
  ...props
}: GoToLastVisitedResumeProps) {
  const [visitedResume, setVisitedResume] = useState<string | null>(null);

  useEffect(() => {
    const resume = getVisitedResume();
    setVisitedResume(resume);
  }, []);

  return (
    <Link href={`/${visitedResume}`} {...props}>
      {children}
    </Link>
  );
}
