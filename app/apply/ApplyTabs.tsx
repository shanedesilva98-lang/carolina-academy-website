"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { StudyAbroadEligibilityForm } from "@/components/forms/StudyAbroadEligibilityForm";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export function ApplyTabs({ defaultTab, defaultCourseSlug }: { defaultTab: string; defaultCourseSlug?: string }) {
  return (
    <Tabs defaultValue={defaultTab} className="flex flex-col items-center">
      <TabsList>
        <TabsTrigger value="course">Vocational Course Application</TabsTrigger>
        <TabsTrigger value="study-abroad">Study Abroad Eligibility Assessment</TabsTrigger>
        <TabsTrigger value="consultation">Consultation Booking</TabsTrigger>
      </TabsList>

      <TabsContent value="course" className="w-full max-w-2xl">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <CourseApplicationForm defaultCourseSlug={defaultCourseSlug} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="study-abroad" className="w-full max-w-2xl">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <StudyAbroadEligibilityForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="consultation" className="w-full max-w-2xl">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <ConsultationForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
