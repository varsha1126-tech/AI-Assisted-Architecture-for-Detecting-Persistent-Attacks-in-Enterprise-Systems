"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generateIncidentReport,
  IncidentReportOutput,
} from "@/ai/flows/automated-incident-report-generation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const FormSchema = z.object({
  threatDescription: z
    .string()
    .min(10, "Threat description must be at least 10 characters."),
  recommendedRemediation: z
    .string()
    .min(10, "Remediation steps must be at least 10 characters."),
  affectedSystems: z
    .string()
    .min(3, "Affected systems must be at least 3 characters."),
  attackTimeline: z
    .string()
    .min(10, "Attack timeline must be at least 10 characters."),
});

export default function IncidentReportingForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IncidentReportOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      threatDescription: "",
      recommendedRemediation: "",
      affectedSystems: "",
      attackTimeline: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await generateIncidentReport(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate incident report. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>
              Provide information about the security incident to generate a full
              report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="threatDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threat Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description of the detected threat..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recommendedRemediation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommended Remediation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Recommended steps for remediating the threat..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="affectedSystems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affected Systems</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., workstation-1, db-server-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attackTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attack Timeline</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 2024-07-29 14:00 - 15:30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Report
            </Button>

            {loading && (
              <Card className="w-full p-6 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="pt-4 space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </Card>
            )}
            
            {result && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{result.reportTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Executive Summary</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {result.executiveSummary}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Detailed Analysis</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                       {result.detailedAnalysis}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Remediation Steps</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {result.remediationSteps}
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                      <AccordionTrigger>Conclusion</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {result.conclusion}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
