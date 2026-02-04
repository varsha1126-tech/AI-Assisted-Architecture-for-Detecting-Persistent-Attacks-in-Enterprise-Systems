// src/ai/flows/behavioral-deviation-detection.ts
'use server';

/**
 * @fileOverview Analyzes user and entity behavior to detect deviations from established baselines.
 *
 * - behavioralDeviationDetection - A function that handles the behavioral deviation detection process.
 * - BehavioralDeviationDetectionInput - The input type for the behavioralDeviationDetection function.
 * - BehavioralDeviationDetectionOutput - The return type for the behavioralDeviationDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BehavioralDeviationDetectionInputSchema = z.object({
  userActivityData: z
    .string()
    .describe(
      'A detailed log of user activities, including login times, resource access, and data modification events.'
    ),
  entityActivityData: z
    .string()
    .describe(
      'A detailed log of entity activities, including network traffic, system calls, and data storage operations.'
    ),
  establishedBaseline: z
    .string()
    .describe(
      'The established baseline of normal behavior for users and entities within the organization.'
    ),
  threatIntelligenceFeeds: z
    .string()
    .describe(
      'External threat intelligence feeds providing information about known attack patterns and malicious behaviors.'
    ),
});
export type BehavioralDeviationDetectionInput = z.infer<
  typeof BehavioralDeviationDetectionInputSchema
>;

const BehavioralDeviationDetectionOutputSchema = z.object({
  anomalousActivities: z
    .string()
    .describe(
      'A detailed description of anomalous activities detected, including the users or entities involved and the nature of the deviation.'
    ),
  riskScore: z.number().describe('A risk score indicating the severity of the detected deviation.'),
  recommendations: z
    .string()
    .describe(
      'Recommended actions to investigate and remediate the detected deviation.'
    ),
});
export type BehavioralDeviationDetectionOutput = z.infer<
  typeof BehavioralDeviationDetectionOutputSchema
>;

export async function behavioralDeviationDetection(
  input: BehavioralDeviationDetectionInput
): Promise<BehavioralDeviationDetectionOutput> {
  return behavioralDeviationDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'behavioralDeviationDetectionPrompt',
  input: {schema: BehavioralDeviationDetectionInputSchema},
  output: {schema: BehavioralDeviationDetectionOutputSchema},
  prompt: `You are an AI-powered threat detection system specializing in identifying behavioral deviations that may indicate compromised accounts or insider threats.

You will analyze user activity data, entity activity data, established baselines, and external threat intelligence feeds to detect anomalous activities and assess the associated risk.

User Activity Data: {{{userActivityData}}}
Entity Activity Data: {{{entityActivityData}}}
Established Baseline: {{{establishedBaseline}}}
Threat Intelligence Feeds: {{{threatIntelligenceFeeds}}}

Based on your analysis, identify and describe any anomalous activities detected, provide a risk score indicating the severity of the deviation, and recommend actions to investigate and remediate the detected deviation.

Format your output as a JSON object with the following keys:
- anomalousActivities: A detailed description of anomalous activities detected.
- riskScore: A risk score indicating the severity of the detected deviation.
- recommendations: Recommended actions to investigate and remediate the detected deviation.`,
});

const behavioralDeviationDetectionFlow = ai.defineFlow(
  {
    name: 'behavioralDeviationDetectionFlow',
    inputSchema: BehavioralDeviationDetectionInputSchema,
    outputSchema: BehavioralDeviationDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
