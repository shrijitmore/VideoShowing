'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  minimized: boolean;
  onProgressChange?: (progress: number) => void;
  isVirtualLabVisible: boolean;
}

export function VideoPlayer({ videoId, minimized, onProgressChange, isVirtualLabVisible }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    console.log("Current video ID:", videoId); // Log the video ID
    if (iframeRef.current) {
      // Send a message to the iframe to play the video
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      );
    }
  }, [videoId]); // Trigger on videoId change

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // YouTube iframe API integration
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange') {
          if (data.info === 1) { // Playing
            setStartTime(Date.now());
            setDuration(300000); // Assume 5 minutes for progress calculation
            
            const interval = setInterval(() => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min((elapsed / duration) * 100, 100);
              onProgressChange?.(progress);
            }, 1000);
            
            return () => clearInterval(interval);
          } else if (data.info === 2) { // Paused
            // Handle paused state if necessary
          }
        }
      } catch (error) {
        console.error('Failed to parse YouTube message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onProgressChange, startTime, duration]);

  return (
    <div
      className={cn(
        'relative h-full transition-all duration-300',
        isVirtualLabVisible ? 'w-full' : 'w-[calc(100%+60px)]'
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        className={cn(
          'h-full w-full rounded-lg',
          isLoading && 'opacity-0'
        )}
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}