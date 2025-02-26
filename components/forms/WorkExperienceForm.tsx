"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useResumeStore, WorkExperience } from "@/lib/store/resume";
import { useCallback, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { MonthYearSelect } from "@/components/ui/month-year-select";

// Form validation schema
const workExperienceSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(50, "Description should be at least 50 characters").max(500, "Description should not exceed 500 characters"),
});

type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export function WorkExperienceForm() {
  const { workExperience, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();

  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
    mode: "onChange",
  });

  const handleAddExperience = useCallback((values: WorkExperienceValues) => {
    addWorkExperience(values);
    form.reset();
  }, [addWorkExperience, form]);

  const handleUpdateExperience = useCallback((id: string, values: Partial<WorkExperienceValues>) => {
    updateWorkExperience(id, values);
  }, [updateWorkExperience]);

  return (
    <div className="space-y-6 w-full">
      {/* Existing Work Experience Entries */}
      {workExperience.map((experience: WorkExperience) => (
        <Card key={experience.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{experience.position}</h3>
                <p className="text-sm text-gray-500 truncate">{experience.company}</p>
                <p className="text-sm text-gray-500 truncate">{experience.location}</p>
                <p className="text-sm text-gray-500">
                  {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 flex-shrink-0"
                onClick={() => removeWorkExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="text-sm text-gray-600">
              {experience.description.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-2 last:mb-0 leading-relaxed break-words">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add New Experience Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddExperience)} className="space-y-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <MonthYearSelect
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <MonthYearSelect
                          value={field.value}
                          onChange={field.onChange}
                          disabled={form.watch("current")}
                          className={form.watch("current") ? "opacity-50" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Current Position</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your responsibilities and achievements..."
                        className="min-h-[120px] max-h-[400px] resize-y w-full p-3 leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-500 mt-1">
                      Press Enter for new paragraphs. Minimum 50 characters, maximum 500.
                    </p>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
