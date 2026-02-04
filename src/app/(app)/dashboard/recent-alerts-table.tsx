import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentAlerts } from "@/lib/data";
import { cn } from "@/lib/utils";

export function RecentAlertsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Anomaly Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Threat</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Affected System</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.threat}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      alert.severity === "High"
                        ? "destructive"
                        : alert.severity === "Medium"
                        ? "secondary"
                        : "outline"
                    }
                    className={cn(
                        alert.severity === "Medium" && "bg-primary/70 text-primary-foreground"
                    )}
                  >
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell>{alert.timestamp}</TableCell>
                <TableCell>{alert.system}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
