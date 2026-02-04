"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  identifyThreatPatterns,
  ThreatPatternIdentificationInput,
  ThreatPatternIdentificationOutput,
} from "@/ai/flows/threat-pattern-identification";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const FormSchema = z.object({
  networkTrafficData: z.string().min(10, {
    message: "Network traffic data must be at least 10 characters.",
  }),
  systemLogsData: z.string().min(10, {
    message: "System logs data must be at least 10 characters.",
  }),
});

export default function ThreatDetectionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThreatPatternIdentificationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      networkTrafficData: "",
      systemLogsData: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await identifyThreatPatterns(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to identify threat patterns. Please try again.",
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
            <CardTitle>Analysis Input</CardTitle>
            <CardDescription>
              Provide network traffic and system log data for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="networkTrafficData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Traffic Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste network traffic data here (e.g., JSON, CSV)"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="systemLogsData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Logs Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste system logs data here (e.g., JSON, CSV)"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Data
            </Button>
            
            {loading && (
              <Card className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Analysis Result</CardTitle>
                  <CardDescription>
                    {result.analysisSummary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-2 font-semibold">Potential Threat Patterns</h3>
                  {result.potentialThreatPatterns.length > 0 ? (
                    <ul className="space-y-2">
                      {result.potentialThreatPatterns.map((pattern, index) => (
                        <li key={index} className="flex items-center justify-between rounded-md border p-3">
                          <span>{pattern}</span>
                          <Badge variant="secondary">
                            Confidence: {((result.confidenceScores[index] || 0) * 100).toFixed(0)}%
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No significant threat patterns identified.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
