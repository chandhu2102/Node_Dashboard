"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 20 }, (_, i) => ({
  value: Math.floor(Math.random() * 100),
}));

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-3">
      <StatCard
        title="Active Users"
        value="27/80"
        chart={data}
      />
      <StatCard
        title="Questions Answered"
        value="3,298"
        chart={data}
      />
      <StatCard
        title="Av. Session Length"
        value="2m 34s"
        chart={data}
      />
      <StatCard
        title="Starting Knowledge"
        value="64%"
        chart={data}
      />
      <StatCard
        title="Current Knowledge"
        value="86%"
        chart={data}
      />
      <StatCard
        title="Knowledge Gain"
        value="+34%"
        chart={data}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  chart,
}: {
  title: string;
  value: string;
  chart: any[];
}) {
  return (
    <Card className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col justify-around h-full  gap-2 sm:gap-4">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
          <p className="text-base sm:text-2xl font-bold">{value}</p>
        </div>
        <div className="h-[25px] sm:h-[50px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};