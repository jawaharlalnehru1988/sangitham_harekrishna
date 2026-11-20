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

const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

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
    const isPlayingRef = useRef<boolean>(false);
    const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const [resumeTime, setResumeTime] = useState<number>(0);
    const [showResumeBadge, setShowResumeBadge] = useState<boolean>(false);

    const STORAGE_KEY_TIME = `yt_pos_${videoId}`;
    const STORAGE_KEY_WAS_PLAYING = `yt_was_playing_${videoId}`;
    const STORAGE_KEY_LAST_ACTIVE = `yt_last_active_key`;

    // Save current time helper
    const saveCurrentTime = () => {
        try {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                const t = playerRef.current.getCurrentTime();
                if (typeof t === 'number' && t > 0) {
                    localStorage.setItem(STORAGE_KEY_TIME, t.toString());
                    setResumeTime(t);
                }
            }
        } catch (e) {}
    };

    // Lifecycle / visibility listener for handling phone calls and backgrounding
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (typeof document === 'undefined') return;

            if (document.visibilityState === 'hidden') {
                // Incoming call or browser minimized
                saveCurrentTime();
                if (isPlayingRef.current) {
                    localStorage.setItem(STORAGE_KEY_WAS_PLAYING, 'true');
                    localStorage.setItem(STORAGE_KEY_LAST_ACTIVE, playerKey);
                }
            } else if (document.visibilityState === 'visible') {
                // User ended phone call and returned to browser!
                const wasPlaying = localStorage.getItem(STORAGE_KEY_WAS_PLAYING) === 'true';
                if (wasPlaying && playerRef.current) {
                    const savedT = parseFloat(localStorage.getItem(STORAGE_KEY_TIME) || '0');
                    if (savedT > 0 && typeof playerRef.current.seekTo === 'function') {
                        try {
                            playerRef.current.seekTo(savedT, true);
                        } catch (e) {}
                    }
                    try {
                        if (typeof playerRef.current.playVideo === 'function') {
                            playerRef.current.playVideo();
                        }
                    } catch (e) {}

                    // If mobile browser policy prevents auto-resuming without explicit tap, show resume badge
                    setTimeout(() => {
                        try {
                            if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
                                if (playerRef.current.getPlayerState() !== 1) {
                                    setShowResumeBadge(true);
                                    if (savedT > 0) setResumeTime(savedT);
                                }
                            }
                        } catch (e) {}
                    }, 400);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handleVisibilityChange);
        window.addEventListener('beforeunload', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleVisibilityChange);
        };
    }, [videoId, playerKey]);

    useEffect(() => {
        let isMounted = true;

        loadYouTubeIframeAPI().then(() => {
            if (!isMounted) return;

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
                const savedTimeVal = typeof window !== 'undefined'
                    ? parseFloat(localStorage.getItem(STORAGE_KEY_TIME) || '0')
                    : 0;

                const startSecond = savedTimeVal > 2 ? Math.floor(savedTimeVal) : undefined;
                if (savedTimeVal > 2) {
                    setResumeTime(savedTimeVal);
                }

                const playerVarsObj: any = {
                    autoplay: 0,
                    enablejsapi: 1,
                    rel: 0,
                    origin: origin,
                    playsinline: 1,
                    modestbranding: 1
                };
                if (startSecond !== undefined) {
                    playerVarsObj.start = startSecond;
                }

                const player = new window.YT.Player(containerId, {
                    videoId: videoId,
                    width: '100%',
                    height: '100%',
                    playerVars: playerVarsObj,
                    events: {
                        onReady: () => {
                            if (playerRegistry[playerKey]) {
                                playerRegistry[playerKey].isReady = true;
                            }

                            // Restore playback position if saved
                            if (savedTimeVal > 2) {
                                try {
                                    player.seekTo(savedTimeVal, true);
                                } catch (e) {}
                            }

                            // If this was playing when phone call or reload happened, resume or show resume prompt
                            const wasPlaying = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY_WAS_PLAYING) === 'true';
                            const lastActiveKey = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY_LAST_ACTIVE);

                            if (wasPlaying && (lastActiveKey === playerKey || !lastActiveKey)) {
                                if (savedTimeVal > 2) {
                                    setShowResumeBadge(true);
                                }
                                try {
                                    player.playVideo();
                                } catch (e) {}
                            }
                        },
                        onStateChange: (event: any) => {
                            // 1 = PLAYING
                            if (event.data === 1) {
                                isPlayingRef.current = true;
                                localStorage.setItem(STORAGE_KEY_WAS_PLAYING, 'true');
                                localStorage.setItem(STORAGE_KEY_LAST_ACTIVE, playerKey);
                                setShowResumeBadge(false);

                                if (onPlayStateChange) onPlayStateChange(true);

                                // Save current time periodically every second while playing
                                if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
                                timeIntervalRef.current = setInterval(saveCurrentTime, 1000);

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
                                isPlayingRef.current = false;
                                localStorage.setItem(STORAGE_KEY_WAS_PLAYING, 'false');
                                if (timeIntervalRef.current) {
                                    clearInterval(timeIntervalRef.current);
                                    timeIntervalRef.current = null;
                                }
                                saveCurrentTime();

                                if (onPlayStateChange) onPlayStateChange(false);
                            }
                            // 0 = ENDED -> Autoplay next video in sequence
                            else if (event.data === 0) {
                                isPlayingRef.current = false;
                                localStorage.removeItem(STORAGE_KEY_TIME);
                                localStorage.setItem(STORAGE_KEY_WAS_PLAYING, 'false');
                                setShowResumeBadge(false);
                                if (timeIntervalRef.current) {
                                    clearInterval(timeIntervalRef.current);
                                    timeIntervalRef.current = null;
                                }

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
            saveCurrentTime();
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
                timeIntervalRef.current = null;
            }
            if (playerRegistry[playerKey]?.player) {
                try {
                    playerRegistry[playerKey].player.destroy();
                } catch (e) {}
                delete playerRegistry[playerKey];
            }
        };
    }, [videoId, playerKey, seqIndex]);

    return (
        <div className={`${className} relative group/player`}>
            <div id={containerId} className="w-full h-full" title={title || "YouTube Video Player"} />

            {/* Tap to Resume Pill if interrupted by phone call */}
            {showResumeBadge && resumeTime > 2 && (
                <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 bg-slate-950/90 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-2xl border border-primary/50 backdrop-blur-md animate-fade-in pointer-events-auto">
                    <span className="flex items-center gap-1.5 text-amber-200">
                        <span className="material-symbols-outlined text-sm text-primary">history</span>
                        Resume at {formatTime(resumeTime)}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            if (playerRef.current) {
                                try {
                                    playerRef.current.seekTo(resumeTime, true);
                                    playerRef.current.playVideo();
                                    setShowResumeBadge(false);
                                } catch (e) {}
                            }
                        }}
                        className="bg-primary hover:bg-primary/90 text-white size-7 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md"
                        title="Resume playback"
                    >
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                </div>
            )}
        </div>
    );
}
