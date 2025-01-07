"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardHeader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");
  
    try {
      // Fetch the JSON file
      const response = await fetch("/task-data.json");
  
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
      }
  
      const jsonData = await response.json();

      // Extract `api_secret`
      const apiSecret = jsonData?.api_secret;

      if (!apiSecret) {
        throw new Error("`api_secret` not found in the JSON file.");
      }
  
      // Make POST request
      const apiResponse = await fetch(
        "https://testd5-img.azurewebsites.net/api/imgdownload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api: apiSecret }),
        }
      );
  
      if (!apiResponse.ok) {
        throw new Error("Failed to fetch image from the API.");
      }
  
      const apiData = await apiResponse.json();
      const base64Image = apiData?.image;
      if (!base64Image) {
        throw new Error("No image data found in the API response.");
      }
  
      // Trigger download
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${base64Image}`;
      link.download = "downloaded-image.png";
      link.click();
    } catch (error : any) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-4 md:flex-col md:items-center md:justify-between w-full pt-10">
      <div className="flex sm:flex-col justify-between gap-4 md:flex-row md:items-center md:justify-between w-full">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner w-4 h-4"></span> // Optional loading spinner
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex flex-wrap justify-center items-center w-full gap-4 text-sm/[10px]">
        <Select defaultValue="all-time">
          <SelectTrigger className="md:w-1/4 sm:1/3">
            Timeframe:
            <SelectValue placeholder="Timeframe px-3" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All</SelectItem>
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-90-days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="md:w-1/4 sm:1/3">
            People:
            <SelectValue placeholder="People" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="department">Department</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="md:w-1/4 sm:1/3">
            Topic:
            <SelectValue placeholder="Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
