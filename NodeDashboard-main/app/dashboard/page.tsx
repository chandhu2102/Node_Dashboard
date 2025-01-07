"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardStats } from "@/components/dashboard/stats";
import { ActivityChart } from "@/components/dashboard/activity-chart";
// import { StrongestTopics } from "@/components/dashboard/topics-list-strongest";
// import { WeakestTopics } from "@/components/dashboard/topics-list-weakest";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import data from "@/public/task-data.json";
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <DashboardStats />
        <ActivityChart />
        {/* <StrongestTopics/> */}
        {/* <WeakestTopics /> */}
        <Leaderboard title="User Leaderboard"  />
        <Leaderboard title="Groups Leaderboard" />
      </div>
    </div>
  );
}