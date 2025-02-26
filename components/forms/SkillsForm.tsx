"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/resume";
import { useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

// Form validation schema
const skillSchema = z.object({
  name: z.string().min(2, "Skill name must be at least 2 characters"),
});

type SkillValues = z.infer<typeof skillSchema>;

export function SkillsForm() {
  const { skills, addSkill, removeSkill } = useResumeStore();

  const form = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const handleAddSkill = useCallback((values: SkillValues) => {
    addSkill(values);
    form.reset();
  }, [addSkill, form]);

  // Initialize form with store values
  useEffect(() => {
    if (skills && skills.length > 0) {
      // Form will be initialized with the existing skills data
    }
  }, [skills]); // Add skills as a dependency

  return (
    <div className="space-y-6">
      {/* Existing Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.length === 0 ? (
              <p className="text-sm text-gray-500">Add your skills below...</p>
            ) : (
              skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 pr-2 flex items-center gap-1 text-sm"
                >
                  {skill.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add New Skill Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddSkill)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., JavaScript, Project Management" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 