"use client";

import React, { useState, useRef, useEffect } from 'react';

interface ShareButtonProps {
    title: string;
    url?: string;
    text?: string;
    label?: string;
    variant?: 'button' | 'icon' | 'pill';
    className?: string;
    category?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
    title,
    url,
    text,
    label = 'Share',
    variant = 'button',
    className = '',
    category,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Get the absolute URL safely on the client
    const getShareUrl = (): string => {
        if (typeof window === 'undefined') return url || '';
        if (url) {
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
        }
        return window.location.href;
    };

    // Close on click outside or Escape
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = getShareUrl();
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = shareUrl;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleWhatsApp = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = getShareUrl();
        const prefix = category ? `🎵 *${title}* (${category})` : `🎵 *${title}*`;
        const description = text ? `\n\n${text}` : '';
        const message = `${prefix}${description}\n\nExplore on Carnatic Music Platform:\n${shareUrl}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
        setIsOpen(false);
    };

    const handleTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = getShareUrl();
        const tweetText = `🎵 Learn ${title} on Carnatic Music Platform @AskHareKrishna`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
    };

    const handleFacebook = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = getShareUrl();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
    };

    const handleNativeShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = getShareUrl();
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text || `Check out ${title} on Carnatic Music Platform`,
                    url: shareUrl,
                });
                setIsOpen(false);
            } catch (err) {
                // User dismissed or share failed
            }
        } else {
            handleCopy(e);
        }
    };

    const toggleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

    return (
        <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
            {variant === 'icon' && (
                <button
                    ref={triggerRef}
                    onClick={toggleOpen}
                    className={`size-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer ${className}`}
                    title={`Share ${title}`}
                    aria-label={`Share ${title}`}
                    aria-expanded={isOpen}
                >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
            )}

            {variant === 'pill' && (
                <button
                    ref={triggerRef}
                    onClick={toggleOpen}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${className}`}
                    title={`Share ${title}`}
                    aria-label={`Share ${title}`}
                    aria-expanded={isOpen}
                >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    <span>{label}</span>
                </button>
            )}

            {variant === 'button' && (
                <button
                    ref={triggerRef}
                    onClick={toggleOpen}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-primary text-slate-900 hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ${className}`}
                    title={`Share ${title}`}
                    aria-label={`Share ${title}`}
                    aria-expanded={isOpen}
                >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span>{label}</span>
                </button>
            )}

            {/* Share Popover Menu */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 rounded-2xl border border-primary/20 bg-background-light/95 dark:bg-background-dark/95 shadow-2xl backdrop-blur-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                    role="dialog"
                    aria-label="Share Options"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-primary/10">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                            <span className="material-symbols-outlined text-primary text-sm">share</span>
                            <span>Share This</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="size-6 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer"
                            aria-label="Close"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 truncate">
                        {title}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-1.5">
                        {/* WhatsApp */}
                        <button
                            onClick={handleWhatsApp}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-colors text-left cursor-pointer group"
                        >
                            <div className="size-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <span>Share on WhatsApp</span>
                        </button>

                        {/* Copy Link */}
                        <button
                            onClick={handleCopy}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                                copied
                                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-800 dark:text-slate-100 border-black/5 dark:border-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${copied ? 'bg-emerald-500 text-white' : 'bg-primary/20 text-primary'}`}>
                                    <span className="material-symbols-outlined text-sm">
                                        {copied ? 'check' : 'content_copy'}
                                    </span>
                                </div>
                                <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
                            </div>
                            {copied && (
                                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">
                                    Copied
                                </span>
                            )}
                        </button>

                        {/* Social Row: Twitter & Facebook */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button
                                onClick={handleTwitter}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 transition-colors cursor-pointer"
                            >
                                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span>X / Twitter</span>
                            </button>

                            <button
                                onClick={handleFacebook}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 transition-colors cursor-pointer"
                            >
                                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span>Facebook</span>
                            </button>
                        </div>

                        {/* Native Share on supported devices */}
                        {canNativeShare && (
                            <button
                                onClick={handleNativeShare}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors cursor-pointer mt-1"
                            >
                                <span className="material-symbols-outlined text-sm">ios_share</span>
                                <span>More Sharing Options...</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareButton;
