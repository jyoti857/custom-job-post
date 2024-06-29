import { Inter } from "next/font/google";
import prisma from "@/lib/prisma";
import JobListItem from "@/components/JobListItem";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import { jobFilterValues } from "@/lib/validation";
import JobResults from "@/components/JobResults";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: jobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer Jobs
        </h1>
        <p className="font-semibold text-muted-foreground">
          Find your dream job
        </p>
      </div>
      <section className="flex flex-col md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  );
}
