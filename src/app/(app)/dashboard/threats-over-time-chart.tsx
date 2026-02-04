"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { threatsOverTime } from "@/lib/data";

export function ThreatsOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threats Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={threatsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }}/>
              <Bar dataKey="High" stackId="a" fill="hsl(var(--destructive))" name="High" />
              <Bar dataKey="Medium" stackId="a" fill="hsl(var(--primary))" name="Medium" />
              <Bar dataKey="Low" stackId="a" fill="hsl(var(--secondary))" name="Low" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
