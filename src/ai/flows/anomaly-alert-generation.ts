// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Anomaly Alert Generation AI agent.
 *
 * - generateAnomalyAlert - A function that handles the anomaly alert generation process.
 * - GenerateAnomalyAlertInput - The input type for the generateAnomalyAlert function.
 * - GenerateAnomalyAlertOutput - The return type for the generateAnomalyAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnomalyAlertInputSchema = z.object({
  activityDescription: z
    .string()
    .describe('A description of the anomalous activity detected.'),
  severityLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The severity level of the anomaly.'),
  affectedSystems: z
    .string()
    .describe('A list of affected systems or users.'),
  currentTime: z.string().describe('The current time and date.'),
});
export type GenerateAnomalyAlertInput = z.infer<typeof GenerateAnomalyAlertInputSchema>;

const GenerateAnomalyAlertOutputSchema = z.object({
  alertTitle: z.string().describe('A concise title for the anomaly alert.'),
  alertDescription: z
    .string()
    .describe('A detailed description of the anomaly and its potential impact.'),
  recommendedActions: z
    .string()
    .describe('Recommended actions to investigate and remediate the anomaly.'),
  priority: z
    .enum(['low', 'medium', 'high'])
    .describe('The priority level of the alert based on severity and impact.'),
});
export type GenerateAnomalyAlertOutput = z.infer<typeof GenerateAnomalyAlertOutputSchema>;

export async function generateAnomalyAlert(
  input: GenerateAnomalyAlertInput
): Promise<GenerateAnomalyAlertOutput> {
  return generateAnomalyAlertFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnomalyAlertPrompt',
  input: {schema: GenerateAnomalyAlertInputSchema},
  output: {schema: GenerateAnomalyAlertOutputSchema},
  prompt: `You are a security expert responsible for generating anomaly alerts.

  Based on the provided information about the anomalous activity, generate a clear and actionable alert.

  Activity Description: {{{activityDescription}}}
  Severity Level: {{{severityLevel}}}
  Affected Systems: {{{affectedSystems}}}
  Current Time: {{{currentTime}}}

  Consider the severity, potential impact, and affected systems when generating the alert title, description, recommended actions, and priority.
  `,
});

const generateAnomalyAlertFlow = ai.defineFlow(
  {
    name: 'generateAnomalyAlertFlow',
    inputSchema: GenerateAnomalyAlertInputSchema,
    outputSchema: GenerateAnomalyAlertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
