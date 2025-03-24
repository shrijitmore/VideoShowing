"use client";

import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { VideoPlayer } from "@/components/video-player";
import { VirtualLab } from "@/components/virtual-lab";
import { Button } from "@/components/ui/button";
import { Menu, EyeOff, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface VideoLearningInterfaceProps {
  courseId: string;
  videoId: string;
  videoIds: { id: string; title: string; courseName: string }[];
  courseName: string;
}

export function VideoLearningInterface({
  courseId,
  videoId,
  videoIds,
  courseName,
}: VideoLearningInterfaceProps) {
  const router = useRouter();
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  const [isVirtualLabVisible, setIsVirtualLabVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Assuming you have a theme context or a way to get the current theme
  const isDarkTheme = true; // Replace with your theme logic

  useEffect(() => {
    // Update the current video ID when the prop changes
    if (videoId) {
      setCurrentVideoId(videoId);
      setProgress(0);
    }
  }, [videoId]);

  const handleVideoSelect = (id: string) => {
    setCurrentVideoId(id);
    setProgress(0);
    // Update the URL with the selected video ID without full page reload
    // This is optional and can be removed if you don't want to update the URL
    // router.push(`/${courseId}?video=${id}`, { scroll: false });
  };

  const handleVirtualLabToggle = () => {
    setIsVirtualLabVisible((prev) => !prev);
  };

  // Safely sort videos by title, handling undefined titles
  const sortedVideos = [...videoIds].sort((a, b) => {
    // Handle cases where title might be undefined
    const titleA = a?.title || "";
    const titleB = b?.title || "";
    return titleA.localeCompare(titleB);
  });

  return (
    <div
      className={`flex h-[calc(100vh-4rem)] ${isDarkTheme ? "bg-gray-900" : "bg-background"}`}
    >
      <div
        className={`transition-transform duration-300 ${isNavVisible ? "w-64" : "w-0"} overflow-hidden ${isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg flex flex-col h-full`}
      >
        <h2 className="p-4 text-lg font-semibold text-center">
          {courseName} Videos
        </h2>
        <ul className="flex flex-col space-y-2 p-4">
          {sortedVideos.map((video) => (
            <li key={video.id} className="w-full">
              <Button
                onClick={() => handleVideoSelect(video.id)}
                variant={currentVideoId === video.id ? "default" : "outline"}
                className="w-full text-left whitespace-normal flex items-center justify-center h-12 p-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200"
              >
                {video.title || "Untitled Video"}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div
          className={`flex items-center justify-between border-b px-4 py-2 ${isDarkTheme ? "border-gray-700" : "border-gray-300"}`}
        >
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsNavVisible(!isNavVisible)}
              className="mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1
              className={`text-lg font-semibold ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Current Module: {courseName} -{" "}
              {videoIds.find((video) => video.id === currentVideoId)?.title ||
                "Untitled Video"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="w-[200px]" />
              <span
                className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-muted-foreground"}`}
              >
                {progress}% Complete
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleVirtualLabToggle}
            >
              {isVirtualLabVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel
            defaultSize={isVirtualLabVisible ? 40 : 100}
            minSize={10}
            maxSize={80}
            className="relative"
          >
            <VideoPlayer
              videoId={currentVideoId}
              minimized={isVideoMinimized}
              onProgressChange={setProgress}
              isVirtualLabVisible={isVirtualLabVisible}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={isVirtualLabVisible ? 60 : 0}
            className={`transition-all duration-300 ${isVirtualLabVisible ? "" : "overflow-hidden"}`}
          >
            <VirtualLab
              isVisible={isVirtualLabVisible}
              onToggle={handleVirtualLabToggle}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
