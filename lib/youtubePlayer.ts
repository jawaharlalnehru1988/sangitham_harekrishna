"use client";

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const loadYouTubeIframeAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return;
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
    
    // Polling fallback in case API is already initialized
    const interval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(interval);
        resolve();
      }
    }, 100);

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      clearInterval(interval);
      resolve();
    };
  });
};

export function useSequentialYouTubePlayer() {
  const playersRef = useRef<{ [key: string]: any }>({});
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const initPlayer = (elementId: string, seqIndex: number) => {
    loadYouTubeIframeAPI().then(() => {
      if (typeof window === 'undefined' || !window.YT || !window.YT.Player) return;
      const el = document.getElementById(elementId);
      if (!el) return;

      // If already initialized, update seq index
      if (playersRef.current[elementId]) {
        playersRef.current[elementId]._seqIndex = seqIndex;
        return;
      }

      try {
        const player = new window.YT.Player(elementId, {
          events: {
            onStateChange: (event: any) => {
              // 1 = PLAYING
              if (event.data === window.YT.PlayerState.PLAYING) {
                setActivePlayingId(elementId);
                // Pause all other YouTube players
                Object.entries(playersRef.current).forEach(([pId, p]) => {
                  if (pId !== elementId && p && typeof p.pauseVideo === 'function') {
                    try {
                      p.pauseVideo();
                    } catch (e) {
                      console.warn('Error pausing player:', e);
                    }
                  }
                });
                // Pause any HTML5 audio tags on the page
                document.querySelectorAll('audio').forEach((audio) => {
                  if (!audio.paused) audio.pause();
                });
              }
              // 0 = ENDED
              else if (event.data === window.YT.PlayerState.ENDED) {
                setActivePlayingId(null);
                const nextIndex = seqIndex + 1;
                const nextPlayer = Object.values(playersRef.current).find(
                  (p: any) => p._seqIndex === nextIndex
                );
                if (nextPlayer && typeof nextPlayer.playVideo === 'function') {
                  try {
                    nextPlayer.playVideo();
                    const nextEl = document.getElementById(nextPlayer._elementId);
                    if (nextEl) {
                      nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  } catch (e) {
                    console.warn('Error auto-playing next video:', e);
                  }
                }
              }
            },
          },
        });
        player._seqIndex = seqIndex;
        player._elementId = elementId;
        playersRef.current[elementId] = player;
      } catch (err) {
        console.warn('Error instantiating YT Player:', err);
      }
    });
  };

  const destroyPlayers = () => {
    Object.values(playersRef.current).forEach((p: any) => {
      if (p && typeof p.destroy === 'function') {
        try {
          p.destroy();
        } catch (e) {}
      }
    });
    playersRef.current = {};
  };

  return { initPlayer, destroyPlayers, activePlayingId };
}
