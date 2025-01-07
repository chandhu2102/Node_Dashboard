"use client";

import data from "@/public/task-data.json"; // Ensure correct JSON path
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topics = data.topics.weakest;

export function WeakestTopics() {
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium mb-4">Weakest Topics</h3>
      <div className="space-y-2 sm:space-y-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b pb-2 last:border-b-0"
          >
            {/* Topic Image */}
            <div className="w-10 h-10">
              <div className="rounded-full object-cover w-full h-full">
                {topic.image}
                {/* alt={topic.name} */}
                
              </div>
            </div>
            {/* Topic Details */}
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium">{topic.name}</p>
              <div className="flex items-center gap-2">
                <Progress value={topic.correct_percentage} className="flex-1 h-2 sm:h-3" />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {topic.correct_percentage}% Correct
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
