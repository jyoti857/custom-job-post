import { jobFilterValues, jobFilterSchema } from "@/lib/validation";
// import { input } from "./ui/input";
// import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { filterJobs } from "@/actions/filterSidebarAction";
import { jobTypes } from "@/lib/job-types";
import FormSubmitButton from "./FormSubmitButton";

interface JobFilterSidebarProps {
  defaultValues: jobFilterValues;
}
export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="q">Search</label>
            <input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues?.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="type">Type</label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues?.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>
          </div>
          <div>
            <label>Location</label>
            <Select id="location" name="location">
              <option value="">All locations</option>
              {
                distinctLocations?.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))
              }
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues?.remote}
            />
            <label htmlFor="remote">Remote Jobs</label>
          </div>
          <FormSubmitButton>Filter Jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
