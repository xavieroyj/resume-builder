"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useResumeStore } from "@/lib/store/resume";
import { useCallback, useEffect } from "react";
import { PlusCircle, Trash2, ExternalLink } from "lucide-react";
import { MonthYearSelect } from "@/components/ui/month-year-select";

// Form validation schema
const certificationSchema = z.object({
  name: z.string().min(2, "Certification name must be at least 2 characters"),
  organization: z.string().min(2, "Organization name must be at least 2 characters"),
  issueDate: z.string().min(1, "Issue date is required"),
  expirationDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  current: z.boolean().default(false),
});

type CertificationValues = z.infer<typeof certificationSchema>;

export function CertificationForm() {
  const { certifications, addCertification, updateCertification, removeCertification } = useResumeStore();

  const form = useForm<CertificationValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      organization: "",
      issueDate: "",
      expirationDate: "",
      credentialId: "",
      credentialUrl: "",
      current: false,
    },
    mode: "onChange",
  });

  const handleAddCertification = useCallback((values: CertificationValues) => {
    addCertification(values);
    form.reset();
  }, [addCertification, form]);

  // Initialize form with store values
  useEffect(() => {
    if (certifications && certifications.length > 0) {
      // Form will be initialized with the existing certifications data
    }
  }, [certifications]); // Add certifications as a dependency

  return (
    <div className="w-full">
      {/* Existing Certifications */}
      {certifications.map((cert) => (
        <Card key={cert.id} className="mb-4 w-full">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 w-full">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 break-words">{cert.name}</h3>
                <p className="text-sm text-gray-500">{cert.organization}</p>
                <p className="text-sm text-gray-500">
                  Issued: {cert.issueDate}
                  {cert.current ? ' - No Expiration' : cert.expirationDate ? ` - Expires: ${cert.expirationDate}` : ''}
                </p>
                {cert.credentialId && (
                  <p className="text-sm text-gray-500">
                    Credential ID: {cert.credentialId}
                  </p>
                )}
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                  >
                    View Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 flex-shrink-0"
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add New Certification Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add License or Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddCertification)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certification Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AWS Solutions Architect" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Amazon Web Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
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
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
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
                      <FormLabel className="text-base">No Expiration</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="credentialId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter credential ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credentialUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 