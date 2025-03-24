'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Minimize2, Maximize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VirtualLabProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function VirtualLab({ isVisible, onToggle }: VirtualLabProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // For demo purposes, accept messages from any origin
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'loaded':
            setIsLoading(false);
            break;
          case 'error':
            toast({
              title: 'Lab Error',
              description: data.message,
              variant: 'destructive',
            });
            break;
          case 'success':
            toast({
              title: 'Success!',
              description: data.message,
            });
            break;
        }
      } catch (error) {
        console.error('Failed to parse lab message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Simulate lab loading for demo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, [toast]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh for demo
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleFullScreenToggle = () => {
    const iframeElement = iframeRef.current;
    if (iframeElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeElement.requestFullscreen();
      }
    }
  };

  return (
    <Card className={`relative h-full rounded-none border-0 transition-transform duration-300 ${isVisible ? '' : 'translate-x-full'}`}>
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleFullScreenToggle}
        >
          {document.fullscreenElement ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm text-muted-foreground">Loading virtual lab environment...</p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        className="h-full w-full rounded-lg border bg-white"
        src="http://192.168.10.210:8080/guacamole/#/"
        allow="fullscreen"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </Card>
  );
}