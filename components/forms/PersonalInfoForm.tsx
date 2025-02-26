"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store/resume";
import { useEffect, useCallback } from "react";

// Form validation schema
const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  professionalTitle: z.string().min(2, "Title must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  summary: z.string().min(50, "Summary should be at least 50 characters").max(500, "Summary should not exceed 500 characters"),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onChange",
  });

  // Memoize the update function to prevent unnecessary re-renders
  const handleFormChange = useCallback(
    (values: Partial<PersonalInfoValues>) => {
      if (Object.keys(values).length > 0) {
        updatePersonalInfo({
          ...personalInfo,
          ...values,
        });
      }
    },
    [personalInfo, updatePersonalInfo]
  );

  // Initialize form with store values
  useEffect(() => {
    if (personalInfo && Object.keys(personalInfo).length > 0) {
      form.reset(personalInfo);
    }
  }, [personalInfo, form]); // Add personalInfo and form as dependencies

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange({ fullName: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="professionalTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Software Engineer" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange({ professionalTitle: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com" 
                        type="email" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleFormChange({ email: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 234 567 890" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleFormChange({ phone: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City, Country" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleFormChange({ location: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://yourwebsite.com" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleFormChange({ website: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a brief summary of your professional background and key achievements..."
                      className="min-h-[120px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange({ summary: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
} 