'use server';

import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function filterJobs(formData: FormData){
  'use server';
  const values = Object.fromEntries(formData.entries());
  const {q, type, location, remote} = jobFilterSchema.parse(values)
  const searchParams = new URLSearchParams({
    ...(q && {q: q.trim()}),
    ...(type && {type}),
    ...(location && {location}),
    ...(remote && {remote: 'true'})
  });
  redirect(`/?${searchParams.toString()}`)
}