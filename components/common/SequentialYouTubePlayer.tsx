"use client";

import React, { useEffect, useRef, useState } from 'react';
import { loadYouTubeIframeAPI } from '@/lib/youtubePlayer';

interface SequentialYouTubePlayerProps {
    videoId: string;
    title?: string;
    playerKey: string;
    seqIndex: number;
    className?: string;
    onPlayStateChange?: (isPlaying: boolean) => void;
}

// Global registry for all active players on the current page
const playerRegistry: {
    [key: string]: {
        player: any;
        seqIndex: number;
        containerId: string;
        isReady: boolean;
    };
} = {};

export default function SequentialYouTubePlayer({
    videoId,
    title,
    playerKey,
    seqIndex,
    className = "aspect-video w-full rounded-xl overflow-hidden bg-slate-950 shadow-inner",
    onPlayStateChange
}: SequentialYouTubePlayerProps) {
    const containerId = `yt-embed-${playerKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    const playerRef = useRef<any>(null);
    const [isApiReady, setIsApiReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        loadYouTubeIframeAPI().then(() => {
            if (!isMounted) return;
            setIsApiReady(true);

            if (typeof window === 'undefined' || !window.YT || !window.YT.Player) return;

            const elem = document.getElementById(containerId);
            if (!elem) return;

            // If player already exists for this key, clean it up first
            if (playerRegistry[playerKey]?.player) {
                try {
                    playerRegistry[playerKey].player.destroy();
                } catch (e) {}
                delete playerRegistry[playerKey];
            }

            try {
                const origin = typeof window !== 'undefined' ? window.location.origin : '';
                const player = new window.YT.Player(containerId, {
                    videoId: videoId,
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 0,
                        enablejsapi: 1,
                        rel: 0,
                        origin: origin,
                        playsinline: 1,
                        modestbranding: 1
                    },
                    events: {
                        onReady: () => {
                            if (playerRegistry[playerKey]) {
                                playerRegistry[playerKey].isReady = true;
                            }
                        },
                        onStateChange: (event: any) => {
                            // 1 = PLAYING
                            if (event.data === 1) {
                                if (onPlayStateChange) onPlayStateChange(true);

                                // Pause all other YouTube players
                                Object.entries(playerRegistry).forEach(([k, item]) => {
                                    if (k !== playerKey && item.player && typeof item.player.pauseVideo === 'function') {
                                        try {
                                            item.player.pauseVideo();
                                        } catch (err) {
                                            console.warn('Error pausing other player:', err);
                                        }
                                    }
                                });

                                // Pause HTML5 audio players
                                document.querySelectorAll('audio').forEach((audio) => {
                                    if (!audio.paused) audio.pause();
                                });
                            }
                            // 2 = PAUSED
                            else if (event.data === 2) {
                                if (onPlayStateChange) onPlayStateChange(false);
                            }
                            // 0 = ENDED -> Autoplay next video in sequence
                            else if (event.data === 0) {
                                if (onPlayStateChange) onPlayStateChange(false);

                                const nextTargetSeq = seqIndex + 1;
                                const nextItem = Object.values(playerRegistry).find(
                                    (item) => item.seqIndex === nextTargetSeq
                                );

                                if (nextItem && nextItem.player && typeof nextItem.player.playVideo === 'function') {
                                    try {
                                        nextItem.player.playVideo();
                                        const nextElem = document.getElementById(nextItem.containerId);
                                        if (nextElem) {
                                            nextElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    } catch (err) {
                                        console.warn('Error playing next video in sequence:', err);
                                    }
                                }
                            }
                        }
                    }
                });

                playerRef.current = player;
                playerRegistry[playerKey] = {
                    player,
                    seqIndex,
                    containerId,
                    isReady: false
                };
            } catch (err) {
                console.error('Error creating YT.Player:', err);
            }
        });

        return () => {
            isMounted = false;
            if (playerRegistry[playerKey]?.player) {
                try {
                    playerRegistry[playerKey].player.destroy();
                } catch (e) {}
                delete playerRegistry[playerKey];
            }
        };
    }, [videoId, playerKey, seqIndex]);

    return (
        <div className={className}>
            <div id={containerId} className="w-full h-full" title={title || "YouTube Video Player"} />
        </div>
    );
}
