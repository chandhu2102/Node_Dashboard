import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import data from "@/public/task-data.json";

const leaderboards = data;

export function Leaderboard({ title }: { title: string }) {
  const [relevantData, setRelevantData] = useState<any[]>([]);

  useEffect(() => {
    // Select the appropriate leaderboard data
    const data =
      title === "User Leaderboard"
        ? leaderboards.user_leaderboard
        : leaderboards.groups_leaderboard;

    // Sort by accuracy percentage
    const sortedData = [...data].sort(
      (a, b) => b.accuracy_percentage - a.accuracy_percentage
    );

    setRelevantData(sortedData); // Update state
  }, [title]);

  const renderLeaderboardItem = (leaderboards :any , rank: number, isUserLeaderboard: boolean) => (
    <div
      key={isUserLeaderboard ? leaderboards.name : leaderboards.group_name}
      className="flex items-center justify-between gap-2 sm:gap-4 py-2 border-b last:border-b-0"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {isUserLeaderboard && leaderboards.name && (
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src={leaderboards.image} alt={leaderboards.name} />
          </Avatar>
        )}
        <div>
          <p className="font-medium text-xs sm:text-sm">
            {isUserLeaderboard ? leaderboards.name : leaderboards.group_name}
          </p>
          <p className="text-xs text-muted-foreground">
            {isUserLeaderboard
              ? `${leaderboards.points} Points · ${leaderboards.accuracy_percentage}% Correct`
              : `${leaderboards.points_per_user} Points · ${leaderboards.accuracy_percentage}% Correct`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-xs sm:text-sm font-medium text-green-500">#{rank}</span>
      </div>
    </div>
  );

  return (
    <Card className="p-4 sm:p-6">
      <div className="w-full">
        <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">{title}</h3>
        <div className="space-y-2 sm:space-y-4">
          {relevantData.map((item, index) =>
            renderLeaderboardItem(item, index + 1, title === "User Leaderboard")
          )}
        </div>
      </div>
    </Card>
  );
}
