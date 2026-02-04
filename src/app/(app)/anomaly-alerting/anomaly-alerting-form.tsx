"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generateAnomalyAlert,
  GenerateAnomalyAlertOutput,
} from "@/ai/flows/anomaly-alert-generation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, ShieldCheck, Siren } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const FormSchema = z.object({
  activityDescription: z
    .string()
    .min(10, "Activity description must be at least 10 characters."),
  severityLevel: z.enum(["low", "medium", "high"]),
  affectedSystems: z
    .string()
    .min(3, "Affected systems must be at least 3 characters."),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AnomalyAlertingForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateAnomalyAlertOutput | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setCurrentTime(new Date().toISOString());
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      activityDescription: "",
      severityLevel: "medium",
      affectedSystems: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setLoading(true);
    setResult(null);
    try {
      const res = await generateAnomalyAlert({ ...data, currentTime });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate anomaly alert. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  
  const PriorityIcon = ({ priority }: { priority: "low" | "medium" | "high" }) => {
    switch (priority) {
      case "high": return <Siren className="h-5 w-5 text-destructive" />;
      case "medium": return <AlertTriangle className="h-5 w-5 text-primary" />;
      case "low": return <ShieldCheck className="h-5 w-5 text-muted-foreground" />;
    }
  };


  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Anomaly Details</CardTitle>
            <CardDescription>
              Input the details of the detected anomaly to generate an alert.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="activityDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Multiple failed login attempts from an unusual IP address."
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
                name="severityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affectedSystems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affected Systems</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., auth-server-01, vpn-gateway" {...field} />
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
              Generate Alert
            </Button>

            {loading && (
              <div className="w-full space-y-4">
                 <Skeleton className="h-8 w-1/3" />
                 <Skeleton className="h-24 w-full" />
              </div>
            )}
            
            {result && (
              <Alert className="w-full" variant={result.priority === 'high' ? 'destructive' : 'default'}>
                <div className="flex items-start gap-4">
                   <PriorityIcon priority={result.priority} />
                   <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <AlertTitle className="text-lg">{result.alertTitle}</AlertTitle>
                      <Badge variant={result.priority === 'high' ? 'destructive' : 'secondary'}>{result.priority}</Badge>
                    </div>
                    <AlertDescription className="mt-2 space-y-4">
                      <p>{result.alertDescription}</p>
                      <div>
                        <h4 className="font-semibold">Recommended Actions</h4>
                        <p className="text-muted-foreground">{result.recommendedActions}</p>
                      </div>
                    </AlertDescription>
                   </div>
                </div>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
