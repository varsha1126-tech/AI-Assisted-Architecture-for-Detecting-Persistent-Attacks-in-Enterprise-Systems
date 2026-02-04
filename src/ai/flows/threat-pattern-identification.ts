'use server';

/**
 * @fileOverview This file defines a Genkit flow for identifying potential persistent attack patterns from network traffic and system logs.
 *
 * - identifyThreatPatterns - A function that identifies threat patterns.
 * - ThreatPatternIdentificationInput - The input type for the identifyThreatPatterns function.
 * - ThreatPatternIdentificationOutput - The return type for the identifyThreatPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThreatPatternIdentificationInputSchema = z.object({
  networkTrafficData: z
    .string()
    .describe('Network traffic data in a structured format, such as JSON or CSV.'),
  systemLogsData: z
    .string()
    .describe('System logs data in a structured format, such as JSON or CSV.'),
});
export type ThreatPatternIdentificationInput = z.infer<
  typeof ThreatPatternIdentificationInputSchema
>;

const ThreatPatternIdentificationOutputSchema = z.object({
  potentialThreatPatterns: z
    .array(z.string())
    .describe(
      'A list of potential persistent attack patterns identified in the data.'
    ),
  analysisSummary: z
    .string()
    .describe('A summary of the analysis performed and the findings.'),
  confidenceScores: z
    .array(z.number())
    .describe('Confidence scores for each identified threat pattern.'),
});
export type ThreatPatternIdentificationOutput = z.infer<
  typeof ThreatPatternIdentificationOutputSchema
>;

export async function identifyThreatPatterns(
  input: ThreatPatternIdentificationInput
): Promise<ThreatPatternIdentificationOutput> {
  return identifyThreatPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'threatPatternIdentificationPrompt',
  input: {schema: ThreatPatternIdentificationInputSchema},
  output: {schema: ThreatPatternIdentificationOutputSchema},
  prompt: `You are a security expert tasked with identifying persistent attack patterns.

Analyze the provided network traffic data and system logs to identify potential threats.

Network Traffic Data: {{{networkTrafficData}}}
System Logs Data: {{{systemLogsData}}}

Based on your analysis, identify potential persistent attack patterns, provide a summary of your analysis, and assign confidence scores to each identified threat pattern.

Format your output as a JSON object conforming to the ThreatPatternIdentificationOutputSchema. The potentialThreatPatterns should contain human-readable descriptions of the attacks.
The confidenceScores should be between 0 and 1, with 1 representing 100% confidence.
`,
});

const identifyThreatPatternsFlow = ai.defineFlow(
  {
    name: 'identifyThreatPatternsFlow',
    inputSchema: ThreatPatternIdentificationInputSchema,
    outputSchema: ThreatPatternIdentificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
