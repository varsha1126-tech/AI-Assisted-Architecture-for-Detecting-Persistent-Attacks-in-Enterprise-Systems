// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file contains a Genkit flow for automated incident report generation.
 *
 * It defines the input and output schemas, and the flow itself.
 *
 * - generateIncidentReport - A function that generates an incident report based on detected threats and remediation steps.
 * - IncidentReportInput - The input type for the generateIncidentReport function.
 * - IncidentReportOutput - The output type for the generateIncidentReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncidentReportInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('Detailed description of the detected threat.'),
  recommendedRemediation: z
    .string()
    .describe('Recommended steps for remediating the threat.'),
  affectedSystems: z
    .string()
    .describe('List of systems affected by the threat.'),
  attackTimeline: z.string().describe('Timeline of the attack events.'),
});
export type IncidentReportInput = z.infer<typeof IncidentReportInputSchema>;

const IncidentReportOutputSchema = z.object({
  reportTitle: z.string().describe('Title of the incident report.'),
  executiveSummary: z.string().describe('A brief summary of the incident.'),
  detailedAnalysis: z
    .string()
    .describe('In-depth analysis of the detected threat.'),
  remediationSteps: z
    .string()
    .describe('Actionable steps to remediate the incident.'),
  conclusion: z.string().describe('Concluding remarks and recommendations.'),
});
export type IncidentReportOutput = z.infer<typeof IncidentReportOutputSchema>;

export async function generateIncidentReport(
  input: IncidentReportInput
): Promise<IncidentReportOutput> {
  return generateIncidentReportFlow(input);
}

const incidentReportPrompt = ai.definePrompt({
  name: 'incidentReportPrompt',
  input: {schema: IncidentReportInputSchema},
  output: {schema: IncidentReportOutputSchema},
  prompt: `You are an expert cybersecurity analyst tasked with generating incident reports.

  Based on the provided threat description, recommended remediation steps, affected systems, and attack timeline, create a comprehensive incident report.

  Include the following sections:
  - Report Title: A concise title summarizing the incident.
  - Executive Summary: A brief overview of the incident and its impact.
  - Detailed Analysis: An in-depth analysis of the threat, including its origin, methods, and potential impact.
  - Remediation Steps: Clear and actionable steps to contain and eliminate the threat.
  - Conclusion: Concluding remarks and recommendations for preventing future incidents.

  Threat Description: {{{threatDescription}}}
  Recommended Remediation: {{{recommendedRemediation}}}
  Affected Systems: {{{affectedSystems}}}
  Attack Timeline: {{{attackTimeline}}}`,
});

const generateIncidentReportFlow = ai.defineFlow(
  {
    name: 'generateIncidentReportFlow',
    inputSchema: IncidentReportInputSchema,
    outputSchema: IncidentReportOutputSchema,
  },
  async input => {
    const {output} = await incidentReportPrompt(input);
    return output!;
  }
);
