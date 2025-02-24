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
import { useResumeStore } from "@/lib/store/resume";
import { useCallback } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { MonthYearSelect } from "@/components/ui/month-year-select";

// Form validation schema
const educationSchema = z.object({
  school: z.string().min(2, "School name must be at least 2 characters"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  field: z.string().min(2, "Field of study must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().max(500, "Description should not exceed 500 characters").optional(),
});

type EducationValues = z.infer<typeof educationSchema>;

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();

  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
    mode: "onChange",
  });

  const handleAddEducation = useCallback((values: EducationValues) => {
    addEducation(values);
    form.reset();
  }, [addEducation, form]);

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Existing Education Entries */}
      {education.map((edu) => (
        <Card key={edu.id}>
          <CardContent className="pt-6 max-w-full overflow-hidden">
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="font-semibold text-gray-900 break-words truncate">{edu.degree}</h3>
                <p className="text-sm text-gray-500 break-words truncate">{edu.school}</p>
                <p className="text-sm text-gray-500 break-words truncate">{edu.field}</p>
                <p className="text-sm text-gray-500 break-words truncate">{edu.location}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 flex-shrink-0"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {edu.description && (
              <>
                <Separator className="my-4" />
                <div className="text-sm text-gray-600 break-words overflow-hidden">
                  {edu.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2 last:mb-0 leading-relaxed break-all">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Add New Education Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Education</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddEducation)} className="space-y-4">
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input placeholder="University or institution name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bachelor's, Master's" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="field"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                      <FormLabel className="text-base">Currently Studying</FormLabel>
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
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Notable achievements, activities, or relevant coursework..."
                        className="min-h-[120px] max-h-[400px] resize-y w-full p-3 leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-500 mt-1">
                      Press Enter for new paragraphs. Maximum 500 characters.
                    </p>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 