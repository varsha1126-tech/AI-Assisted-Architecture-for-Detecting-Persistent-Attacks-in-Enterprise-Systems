"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  behavioralDeviationDetection,
  BehavioralDeviationDetectionOutput,
} from "@/ai/flows/behavioral-deviation-detection";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const FormSchema = z.object({
  userActivityData: z
    .string()
    .min(10, "User activity data must be at least 10 characters."),
  entityActivityData: z
    .string()
    .min(10, "Entity activity data must be at least 10 characters."),
  establishedBaseline: z
    .string()
    .min(10, "Established baseline must be at least 10 characters."),
  threatIntelligenceFeeds: z
    .string()
    .min(10, "Threat intelligence feeds must be at least 10 characters."),
});

export default function BehavioralAnalysisForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BehavioralDeviationDetectionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userActivityData: "",
      entityActivityData: "",
      establishedBaseline: "",
      threatIntelligenceFeeds: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await behavioralDeviationDetection(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Failed to perform behavioral analysis. Please try again.",
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
            <CardTitle>Behavioral Data Input</CardTitle>
            <CardDescription>
              Provide various data sources to detect behavioral deviations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="userActivityData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Activity Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Log of user activities..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entityActivityData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Activity Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Log of entity activities..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="establishedBaseline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Established Baseline</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description of normal behavior..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="threatIntelligenceFeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Threat Intelligence Feeds</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="External threat data..."
                        className="min-h-[120px]"
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
              Analyze Behavior
            </Button>

            {loading && (
               <Card className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Analysis Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Risk Score: {result.riskScore} / 10</h3>
                    <Progress value={result.riskScore * 10} className="h-2" />
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Anomalous Activities Detected</h3>
                    <p className="text-sm text-muted-foreground">{result.anomalousActivities}</p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold">Recommendations</h3>
                    <p className="text-sm text-muted-foreground">{result.recommendations}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
