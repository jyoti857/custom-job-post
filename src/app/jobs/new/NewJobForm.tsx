"use client";

import { CreateJobValues, createJobSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { createJobPosting } from "@/actions/server-actions";
import LocationInput from "@/components/LocationInput";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateJobValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      console.log("formdata jobposting", {formData})
      await createJobPosting(formData);
    } catch (err) {
      alert("something went wrong, please try again!");
    }
  }

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div>
        <h1>Find your perfect developer</h1>
        <p>Get your posting seen by thousands of job seekers.</p>
      </div>
      <div>
        <h2>Job details</h2>
        <p>Provide a job description and details</p>
      </div>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select {...field} defaultValue="">
                    <option value="" hidden>
                      Select an option
                    </option>{" "}
                    // hidden attribute will be added
                    {jobTypes.map((jobType) => (
                      <option key={jobType} value={jobType}>
                        {jobType}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyLogo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    defaultValue=""
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.currentTarget.value === "Remote") {
                        trigger("location");
                      }
                    }}
                  >
                    <option value="" hidden>
                      Select an option
                    </option>
                    {locationTypes.map((locationType) => (
                      <option key={locationType} value={locationType}>
                        {locationType}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office location</FormLabel>
                <FormControl>
                  <LocationInput
                    onLocationSelected={field.onChange}
                    ref={field.ref}
                  />
                </FormControl>
                {watch("location") && (
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("location", "", { shouldValidate: true })
                      }
                    >
                      <X size={20} />
                    </button>
                    <span className="text-sm">{watch("location")}</span>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="applicationEmail">How to apply</Label>
            <div>
              <FormField
                control={control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input
                          id="applicationEmail"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                        <span className="mx-2">or</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input
                          id="applicationUrl"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label onClick={() => setFocus("description")}>
                  Description
                </Label>
                <FormControl>
                  <RichTextEditor
                    onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
