import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  Hand,
  Sliders,
  Minimize2,
  Maximize2,
  Info,
  X,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Compass,
  ArrowUp,
  ArrowDown,
  Layers,
  User,
  Zap,
  Menu,
  Search,
  Palette,
  Globe,
  Rocket,
  MousePointer,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { Language, ViewType } from '../types';

export interface HandGestureControllerProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  currentView?: ViewType;
  onNavigate?: (view: ViewType) => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'HOLD';
type SensitivityLevel = 'low' | 'balanced' | 'high';
type ScrollMode = 'auto' | 'slides' | 'continuous';
type VisionMode = 'unified' | 'finger' | 'face';

interface OpticalResult {
  detected: boolean;
  direction: Direction | null;
  activeSource: 'finger' | 'face' | 'none';
  fingerTip: { x: number; y: number } | null;
  fingerCentroid: { x: number; y: number } | null;
  faceCentroid: { x: number; y: number } | null;
  deltaY: number;
  deltaX: number;
  speed: number;
  fps: number;
  intensity: number;
}

export const HandGestureController: React.FC<HandGestureControllerProps> = ({
  isOpen,
  onClose,
  lang = 'en',
  currentView = 'agency',
  onNavigate,
}) => {
  const isRTL = lang === 'ar' || lang === 'ur';

  // Tracking state
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [currentDir, setCurrentDir] = useState<Direction | null>(null);
  const [activeSource, setActiveSource] = useState<'finger' | 'face' | 'none'>('none');
  const [fps, setFps] = useState<number>(60);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [sensitivity, setSensitivity] = useState<SensitivityLevel>('high');
  const [scrollMode, setScrollMode] = useState<ScrollMode>('auto');
  const [visionMode, setVisionMode] = useState<VisionMode>('unified');
  const [showVirtualCursor, setShowVirtualCursor] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isMirrored, setIsMirrored] = useState<boolean>(true);

  // Virtual cursor visibility & coordinates ref (updated at 60fps via direct DOM ref to prevent React re-render lag)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: -100,
    y: -100,
    visible: false,
  });
  const cursorDomRef = useRef<HTMLDivElement | null>(null);
  const cursorLivePosRef = useRef<{ x: number; y: number; visible: boolean }>({
    x: -100,
    y: -100,
    visible: false,
  });
  const smoothedCursorRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  // Dwell-to-click tracking refs
  const dwellTargetRef = useRef<HTMLElement | null>(null);
  const dwellStartTimeRef = useRef<number>(0);
  const lastDwellClickTimeRef = useRef<number>(0);

  // Action notification banner
  const [lastActionTime, setLastActionTime] = useState<number>(0);
  const [actionLabel, setActionLabel] = useState<string>('');

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Optical Tracking internal state refs
  const offCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevFrameDataRef = useRef<Uint8ClampedArray | null>(null);
  const prevTipRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lockedHandRef = useRef<{
    rawX: number;
    rawY: number;
    normX: number;
    normY: number;
    lastMotionTime: number;
    active: boolean;
  }>({
    rawX: 80,
    rawY: 60,
    normX: 0.5,
    normY: 0.5,
    lastMotionTime: 0,
    active: false,
  });
  const tipHistoryRef = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const lastSlideActionTimeRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);
  const lastConfirmedDirRef = useRef<Direction | null>(null);
  const lastReportedDirRef = useRef<Direction | null>(null);
  const lastReportedSourceRef = useRef<'finger' | 'face' | 'none'>('none');

  // Initialize offscreen processing canvas (160x120 for extreme speed < 1.2ms)
  useEffect(() => {
    if (typeof document !== 'undefined' && !offCanvasRef.current) {
      const c = document.createElement('canvas');
      c.width = 160;
      c.height = 120;
      offCanvasRef.current = c;
    }
  }, []);

  // Translations supporting Hindi, Urdu, Arabic, English
  const t = {
    title: {
      en: 'AI VISION AIR NAVIGATION',
      hi: 'एआई जेस्चर नेविगेशन',
      ur: 'کیمرہ ایئر کنٹرول',
      ar: 'التحكم الهوائي بالذكاء الاصطناعي',
      fr: 'NAVIGATION AÉRIENNE IA',
    }[lang] || 'AI VISION AIR NAVIGATION',
    subtitle: {
      en: 'Smooth Touchless Gestures via Webcam',
      hi: 'वेबकैम से बिना छुए उंगली व चेहरे से चलाएं',
      ur: 'بغیر ٹچ کیے فنگر سے کنٹرول کریں',
      ar: 'تصفح بدون لمس عبر الكاميرا',
      fr: 'Navigation sans contact par caméra',
    }[lang] || 'Smooth Touchless Gestures via Webcam',
    scrollingUp: {
      en: 'SCROLLING UP ▲',
      hi: 'ऊपर स्क्रॉल हो रहा है ▲',
      ur: 'اوپر اسکرول ہو رہا ہے ▲',
      ar: 'تمرير لأعلى ▲',
      fr: 'DÉFILEMENT HAUT ▲',
    }[lang] || 'SCROLLING UP ▲',
    scrollingDown: {
      en: 'SCROLLING DOWN ▼',
      hi: 'नीचे स्क्रॉल हो रहा है ▼',
      ur: 'نیچے اسکرول ہو رہا है ▼',
      ar: 'تمرير لأسفل ▼',
      fr: 'DÉFILEMENT BAS ▼',
    }[lang] || 'SCROLLING DOWN ▼',
    holding: {
      en: 'READY / IDLE ✋',
      hi: 'तैयार / रुका हुआ ✋',
      ur: 'تیار / توقف ✋',
      ar: 'جاهز / توقف ✋',
      fr: 'PRÊT / PAUSE ✋',
    }[lang] || 'READY / IDLE ✋',
    stopCamera: {
      en: 'DISABLE CAMERA',
      hi: 'कैमरा बंद करें',
      ur: 'کیمرہ بند کریں',
      ar: 'إيقاف الكاميرا',
      fr: 'DÉSACTIVER CAMÉRA',
    }[lang] || 'DISABLE CAMERA',
    retryCamera: {
      en: 'START CAMERA',
      hi: 'कैमरा शुरू करें',
      ur: 'کیمرہ شروع کریں',
      ar: 'تشغيل الكاميرا',
      fr: 'DÉMARRER CAMÉRA',
    }[lang] || 'START CAMERA',
    pointFinger: {
      en: 'SHOW YOUR HAND TO CAMERA',
      hi: 'कैमरे के सामने हाथ या उंगली लाएं',
      ur: 'کیمرے کے سامنے ہاتھ لائیں',
      ar: 'أظهر يدك أمام الكاميرا',
      fr: 'MONTREZ VOTRE MAIN',
    }[lang] || 'SHOW YOUR HAND TO CAMERA',
  };

  // Safe audio tick wrapper: only plays if user enabled sound
  const playSoundEffect = useCallback(() => {
    if (soundEnabled) {
      try {
        serviceScrollAudio.playCardHoverTick();
      } catch {
        // ignore
      }
    }
  }, [soundEnabled]);

  // Stop camera tracks cleanly
  const stopCamera = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCurrentDir(null);
    setCursorPos({ x: -100, y: -100, visible: false });
  }, []);

  // Start Camera Stream directly and auto-play
  const startCamera = useCallback(async () => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Webcam API is not supported on this browser/device.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
          facingMode: 'user',
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;

        try {
          await video.play();
        } catch (playErr) {
          console.warn('Video play attempt:', playErr);
        }

        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError(err?.message || 'Camera permission denied or camera unavailable.');
      setCameraActive(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  // Air Click Simulator: clicks element under air cursor
  const triggerAirClick = useCallback(
    (customX?: number, customY?: number) => {
      const targetX = typeof customX === 'number' ? customX : cursorLivePosRef.current.x;
      const targetY = typeof customY === 'number' ? customY : cursorLivePosRef.current.y;
      if (targetX < 0 || targetY < 0 || typeof document === 'undefined') return;

      const el = document.elementFromPoint(targetX, targetY) as HTMLElement | null;
      if (!el) return;

      if (el.closest('aside[aria-label="Air Gesture Camera HUD"]')) {
        return;
      }

      const clickable = el.closest(
        'button, a, [role="button"], input, select, textarea, .cursor-pointer'
      ) as HTMLElement | null;
      const target = clickable || el;

      try {
        target.click();
        target.focus();
        playSoundEffect();
        setLastActionTime(Date.now());
        setActionLabel('CLICKED! ⚡');
      } catch (err) {
        console.warn('Air click err', err);
      }
    },
    [playSoundEffect]
  );

  // High-Speed Optical Flow & Spatial Hand ROI Tracker
  const processFrame = useCallback((): OpticalResult => {
    const video = videoRef.current;
    const offCanvas = offCanvasRef.current;

    const fallback: OpticalResult = {
      detected: false,
      direction: null,
      activeSource: 'none',
      fingerTip: null,
      fingerCentroid: null,
      faceCentroid: null,
      deltaY: 0,
      deltaX: 0,
      speed: 0,
      fps: 60,
      intensity: 0,
    };

    if (!video || !offCanvas || video.readyState < 2) {
      return fallback;
    }

    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return fallback;

    const w = offCanvas.width;
    const h = offCanvas.height;
    offCtx.drawImage(video, 0, 0, w, h);

    let imgData: ImageData;
    try {
      imgData = offCtx.getImageData(0, 0, w, h);
    } catch {
      return fallback;
    }

    const data = imgData.data;
    const prevData = prevFrameDataRef.current;
    const now = performance.now();

    let motionWeightSum = 0;
    let motionWeightedX = 0;
    let motionWeightedY = 0;
    let motionPixelCount = 0;
    let minMotionY = h;
    let maxMotionY = 0;

    const locked = lockedHandRef.current;
    const hasRecentLock = locked.active && now - locked.lastMotionTime < 650;

    // Local ROI skin check around the locked hand position (for when hand is held steady in a scroll zone)
    let roiSkinWeight = 0;
    let roiSkinX = 0;
    let roiSkinY = 0;

    for (let y = 4; y < h - 4; y += 2) {
      for (let x = 4; x < w - 4; x += 2) {
        const idx = (y * w + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Broadened skin-tone heuristic for warm, cool, and low-light webcams
        const isSkin =
          r > 60 &&
          g > 30 &&
          b > 15 &&
          r > g &&
          r > b * 1.05 &&
          r - Math.min(g, b) > 12;

        // Check local ROI around last known hand position so holding hand in UP/DOWN zone never jumps to the face
        if (hasRecentLock && isSkin) {
          const distToLock = Math.hypot(x - locked.rawX, y - locked.rawY);
          if (distToLock < 34) {
            const wgt = 35 - distToLock;
            roiSkinWeight += wgt;
            roiSkinX += x * wgt;
            roiSkinY += y * wgt;
          }
        }

        // Frame-to-frame optical motion detection
        if (prevData) {
          const pr = prevData[idx];
          const pg = prevData[idx + 1];
          const pb = prevData[idx + 2];
          const diff = Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb);

          if (diff > 24) {
            motionPixelCount++;
            // Weight strongly by motion magnitude + skin likelihood + spatial continuity with locked hand
            let wgt = (diff - 20) * (isSkin ? 2.5 : 1.0);
            if (hasRecentLock) {
              const dist = Math.hypot(x - locked.rawX, y - locked.rawY);
              if (dist < 48) {
                wgt *= 2.2;
              }
            }
            motionWeightSum += wgt;
            motionWeightedX += x * wgt;
            motionWeightedY += y * wgt;
            if (y < minMotionY) minMotionY = y;
            if (y > maxMotionY) maxMotionY = y;
          }
        }
      }
    }

    // Store current frame for next delta comparison
    if (!prevFrameDataRef.current || prevFrameDataRef.current.length !== data.length) {
      prevFrameDataRef.current = new Uint8ClampedArray(data);
    } else {
      prevFrameDataRef.current.set(data);
    }

    let isTracking = false;
    let rawTargetX = locked.rawX;
    let rawTargetY = locked.rawY;

    if (motionPixelCount >= 6 && motionWeightSum > 140) {
      // Active hand/finger movement detected
      isTracking = true;
      const cx = motionWeightedX / motionWeightSum;
      const cy = motionWeightedY / motionWeightSum;

      // Bias toward upper extremity when hand is in upper half, and lower extremity when in lower half
      // This fixes the old minY bug where downward hand movements were ignored!
      let targetY = cy;
      if (cy < h * 0.46) {
        targetY = cy * 0.65 + minMotionY * 0.35;
      } else if (cy > h * 0.54) {
        targetY = cy * 0.65 + maxMotionY * 0.35;
      }

      rawTargetX = cx;
      rawTargetY = targetY;

      locked.rawX = rawTargetX;
      locked.rawY = rawTargetY;
      locked.lastMotionTime = now;
      locked.active = true;
    } else if (hasRecentLock && (roiSkinWeight > 60 || now - locked.lastMotionTime < 1800)) {
      // Hand is held steady in place (e.g., holding in UP or DOWN scroll zone or dwelling to click)
      isTracking = true;
      if (roiSkinWeight > 60) {
        rawTargetX = locked.rawX * 0.75 + (roiSkinX / roiSkinWeight) * 0.25;
        rawTargetY = locked.rawY * 0.75 + (roiSkinY / roiSkinWeight) * 0.25;
        locked.rawX = rawTargetX;
        locked.rawY = rawTargetY;
      }
    } else {
      locked.active = false;
      prevTipRef.current = null;
      lastConfirmedDirRef.current = null;
      return fallback;
    }

    // Map camera coordinates to [0..1] screen space with 1.48x ergonomic range amplification
    // so comfortable 15cm hand movements effortlessly reach all screen edges and scroll zones
    const rawNormX = isMirrored ? 1 - rawTargetX / w : rawTargetX / w;
    const rawNormY = rawTargetY / h;

    const expandedX = Math.max(0.02, Math.min(0.98, 0.5 + (rawNormX - 0.5) * 1.48));
    const expandedY = Math.max(0.02, Math.min(0.98, 0.5 + (rawNormY - 0.5) * 1.48));

    // Velocity-adaptive EMA smoothing for zero-lag, silky-smooth tracking
    const moveDist = Math.hypot(
      expandedX - smoothedCursorRef.current.x,
      expandedY - smoothedCursorRef.current.y
    );
    const alpha = moveDist > 0.08 ? 0.58 : moveDist > 0.03 ? 0.44 : 0.30;

    const trackTipX =
      smoothedCursorRef.current.x + (expandedX - smoothedCursorRef.current.x) * alpha;
    const trackTipY =
      smoothedCursorRef.current.y + (expandedY - smoothedCursorRef.current.y) * alpha;

    smoothedCursorRef.current.x = trackTipX;
    smoothedCursorRef.current.y = trackTipY;
    locked.normX = trackTipX;
    locked.normY = trackTipY;

    // Frame-to-frame displacement & velocity
    let deltaY = 0;
    let deltaX = 0;
    let speed = 0;

    if (prevTipRef.current) {
      const dt = Math.max(4, now - prevTipRef.current.time);
      if (dt < 260) {
        deltaY = trackTipY - prevTipRef.current.y;
        deltaX = trackTipX - prevTipRef.current.x;
        speed = Math.hypot(deltaX, deltaY) / (dt / 1000);
      }
    }
    prevTipRef.current = { x: trackTipX, y: trackTipY, time: now };

    // Track finger sliding history for quick flick gestures
    tipHistoryRef.current.push({ x: trackTipX, y: trackTipY, time: now });
    while (
      tipHistoryRef.current.length > 0 &&
      now - tipHistoryRef.current[0].time > 160
    ) {
      tipHistoryRef.current.shift();
    }

    let isSwipe = false;
    let swipeDir: Direction | null = null;
    if (tipHistoryRef.current.length >= 2) {
      const oldest = tipHistoryRef.current[0];
      const spanX = trackTipX - oldest.x;
      const spanY = trackTipY - oldest.y;
      const spanDt = Math.max(8, now - oldest.time);
      const vx = spanX / (spanDt / 1000);
      const vy = spanY / (spanDt / 1000);

      if (Math.abs(vy) > 0.42 && Math.abs(vy) > Math.abs(vx) * 1.25) {
        isSwipe = true;
        swipeDir = vy > 0 ? 'DOWN' : 'UP';
      } else if (Math.abs(vx) > 0.48 && Math.abs(vx) > Math.abs(vy) * 1.3) {
        isSwipe = true;
        swipeDir = vx > 0 ? 'RIGHT' : 'LEFT';
      }
    }

    // Sensitivity thresholds
    const sensMultipliers = {
      low: { threshold: 0.14, moveThreshold: 0.012 },
      balanced: { threshold: 0.10, moveThreshold: 0.007 },
      high: { threshold: 0.075, moveThreshold: 0.0045 },
    };
    const sens = sensMultipliers[sensitivity];

    const topThreshold = 0.5 - sens.threshold;
    const bottomThreshold = 0.5 + sens.threshold;

    let detectedDir: Direction = 'HOLD';
    let intensity = 0;

    if (isSwipe && swipeDir) {
      detectedDir = swipeDir;
      intensity = 1.0;
    } else if (trackTipY < topThreshold) {
      // Hand in upper zone -> Scroll UP / Prev Slide
      detectedDir = 'UP';
      intensity = Math.min(1, (topThreshold - trackTipY) / 0.28 + 0.45);
    } else if (trackTipY > bottomThreshold) {
      // Hand in lower zone -> Scroll DOWN / Next Slide
      detectedDir = 'DOWN';
      intensity = Math.min(1, (trackTipY - bottomThreshold) / 0.28 + 0.45);
    } else if (deltaY < -sens.moveThreshold) {
      detectedDir = 'UP';
      intensity = Math.min(1, Math.abs(deltaY) * 32 + 0.35);
    } else if (deltaY > sens.moveThreshold) {
      detectedDir = 'DOWN';
      intensity = Math.min(1, Math.abs(deltaY) * 32 + 0.35);
    } else {
      detectedDir = 'HOLD';
      intensity = 0;
    }

    lastConfirmedDirRef.current = detectedDir;

    return {
      detected: true,
      direction: detectedDir,
      activeSource: 'finger',
      fingerTip: { x: trackTipX, y: trackTipY },
      fingerCentroid: { x: trackTipX, y: trackTipY },
      faceCentroid: null,
      deltaY,
      deltaX,
      speed,
      fps: 60,
      intensity,
    };
  }, [isMirrored, sensitivity]);

  // Helper: scrolls either an active scrollable container (modal/subpage) or the window
  const scrollActiveContainer = useCallback((dy: number) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Check if element under air cursor is inside an overflow-y scrollable container
    const cx = cursorLivePosRef.current.x;
    const cy = cursorLivePosRef.current.y;
    if (cx > 0 && cy > 0) {
      let el = document.elementFromPoint(cx, cy) as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (!el.closest('aside[aria-label="Air Gesture Camera HUD"]')) {
          const style = window.getComputedStyle(el);
          const overflowY = style.overflowY;
          if (
            (overflowY === 'auto' || overflowY === 'scroll') &&
            el.scrollHeight > el.clientHeight + 8
          ) {
            el.scrollTop += dy;
            return;
          }
        }
        el = el.parentElement;
      }
    }

    window.scrollBy({ top: dy, behavior: 'auto' });
  }, []);

  // Safe navigation dispatcher: dispatches slide snaps on slide-deck views or fast scrolls
  const triggerNavigation = useCallback(
    (direction: 'next' | 'prev' | 'up' | 'down') => {
      const now = performance.now();
      const isSlideView =
        currentView === 'agency' ||
        currentView === 'services' ||
        currentView === 'work' ||
        currentView === 'clients';
      const isSlideDeck =
        scrollMode === 'slides' || (scrollMode === 'auto' && isSlideView);

      if (isSlideDeck) {
        const cooldown = sensitivity === 'high' ? 310 : sensitivity === 'balanced' ? 380 : 460;
        if (now - lastSlideActionTimeRef.current < cooldown) return;
        lastSlideActionTimeRef.current = now;

        const isNext = direction === 'next' || direction === 'down';
        window.dispatchEvent(
          new CustomEvent('eferz-gesture-slide', {
            detail: { direction: isNext ? 'next' : 'prev' },
          })
        );
        // Also scroll active scrollable detail container if open inside Services/Work
        scrollActiveContainer(isNext ? 260 : -260);
        playSoundEffect();
        setLastActionTime(Date.now());
        setActionLabel(isNext ? 'SLIDE NEXT ▼' : 'SLIDE PREV ▲');
      } else {
        const delta = direction === 'down' || direction === 'next' ? 280 : -280;
        scrollActiveContainer(delta);
        playSoundEffect();
        setLastActionTime(Date.now());
        setActionLabel(delta > 0 ? 'SCROLL DOWN ▼' : 'SCROLL UP ▲');
      }
    },
    [scrollMode, currentView, sensitivity, scrollActiveContainer, playSoundEffect]
  );

  // Dispatch website feature actions (menu, search, theme, lang, start project)
  const dispatchFeatureAction = useCallback(
    (action: string, payload?: any) => {
      playSoundEffect();
      window.dispatchEvent(
        new CustomEvent('eferz-gesture-action', {
          detail: { action, payload },
        })
      );
      setLastActionTime(Date.now());
      setActionLabel(`ACTION: ${action.toUpperCase()} ⚡`);
    },
    [playSoundEffect]
  );

  // Real-Time Frame Render, Interaction and HUD Loop
  useEffect(() => {
    if (!cameraActive) return;

    let frameCount = 0;
    let lastFpsTime = performance.now();

    const loop = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      // 1. Process Vision Frame
      const res = processFrame();

      // Only trigger React state updates when direction or source actually changes
      if (res.direction !== lastReportedDirRef.current) {
        lastReportedDirRef.current = res.direction;
        setCurrentDir(res.direction);
      }
      if (res.activeSource !== lastReportedSourceRef.current) {
        lastReportedSourceRef.current = res.activeSource;
        setActiveSource(res.activeSource);
      }

      const isSlideView =
        currentView === 'agency' ||
        currentView === 'services' ||
        currentView === 'work' ||
        currentView === 'clients';
      const isSlideDeck =
        scrollMode === 'slides' || (scrollMode === 'auto' && isSlideView);

      // 2. Perform High-Speed Navigation / Scrolling
      if (res.direction === 'UP' || res.direction === 'DOWN') {
        const isUp = res.direction === 'UP';
        const sensMult = sensitivity === 'high' ? 1.85 : sensitivity === 'low' ? 1.0 : 1.45;
        // 3.5x faster scroll speed for smooth, effortless browsing
        const scrollDelta = Math.round((38 + res.intensity * 68) * sensMult);

        if (isSlideDeck) {
          // On slide decks in auto/slides mode: trigger clean slide step without cancelling smooth transitions
          const cooldown = sensitivity === 'high' ? 320 : sensitivity === 'balanced' ? 390 : 480;
          if (res.speed > 0.35 || now - lastSlideActionTimeRef.current >= cooldown) {
            triggerNavigation(isUp ? 'prev' : 'next');
          }
          // If a detail subpage/modal is open on ServicesView, scroll it continuously too
          if (currentView !== 'agency' && now - lastScrollTimeRef.current >= 14) {
            const dy = isUp ? -scrollDelta : scrollDelta;
            scrollActiveContainer(dy);
            lastScrollTimeRef.current = now;
          }
        } else {
          // Continuous high-speed 60fps scrolling!
          if (now - lastScrollTimeRef.current >= 14) {
            const dy = isUp ? -scrollDelta : scrollDelta;
            scrollActiveContainer(dy);
            lastScrollTimeRef.current = now;
          }
        }
      } else if (res.direction === 'LEFT' || res.direction === 'RIGHT') {
        if (now - lastSlideActionTimeRef.current >= 360) {
          triggerNavigation(res.direction === 'RIGHT' ? 'next' : 'prev');
        }
      }

      // 3. Update 60FPS Direct-DOM Air Cursor & Auto Dwell Click
      if (res.fingerTip && typeof window !== 'undefined') {
        const screenX = Math.round(res.fingerTip.x * window.innerWidth);
        const screenY = Math.round(res.fingerTip.y * window.innerHeight);

        const wasVisible = cursorLivePosRef.current.visible;
        cursorLivePosRef.current = { x: screenX, y: screenY, visible: true };
        if (!wasVisible) {
          setCursorPos({ x: screenX, y: screenY, visible: true });
        }

        if (cursorDomRef.current) {
          cursorDomRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`;
        }

        // Hover & Dwell Click detection when holding steady over interactive buttons
        if (res.direction === 'HOLD' && now - lastDwellClickTimeRef.current > 1400) {
          const el = document.elementFromPoint(screenX, screenY) as HTMLElement | null;
          const clickable = el?.closest(
            'button, a, [role="button"], .cursor-pointer'
          ) as HTMLElement | null;

          if (
            clickable &&
            !clickable.closest('aside[aria-label="Air Gesture Camera HUD"]')
          ) {
            if (dwellTargetRef.current === clickable) {
              if (now - dwellStartTimeRef.current >= 950) {
                lastDwellClickTimeRef.current = now;
                dwellStartTimeRef.current = now;
                triggerAirClick(screenX, screenY);
              }
            } else {
              dwellTargetRef.current = clickable;
              dwellStartTimeRef.current = now;
            }
          } else {
            dwellTargetRef.current = null;
          }
        } else {
          dwellTargetRef.current = null;
        }
      } else {
        if (cursorLivePosRef.current.visible) {
          cursorLivePosRef.current.visible = false;
          setCursorPos((prev) => ({ ...prev, visible: false }));
        }
      }

      // 4. Draw Futuristic Cybernetic HUD on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
            canvas.width = canvas.clientWidth || 320;
            canvas.height = canvas.clientHeight || 240;
          }

          const cw = canvas.width;
          const ch = canvas.height;
          ctx.clearRect(0, 0, cw, ch);

          // Top / Bottom Threshold Guidelines
          ctx.strokeStyle =
            res.direction === 'UP' ? 'rgba(0, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = res.direction === 'UP' ? 2.5 : 1;
          ctx.setLineDash(res.direction === 'UP' ? [] : [4, 4]);
          ctx.beginPath();
          ctx.moveTo(0, ch * 0.42);
          ctx.lineTo(cw, ch * 0.42);
          ctx.stroke();

          ctx.strokeStyle =
            res.direction === 'DOWN' ? 'rgba(208, 33, 40, 0.95)' : 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = res.direction === 'DOWN' ? 2.5 : 1;
          ctx.beginPath();
          ctx.moveTo(0, ch * 0.58);
          ctx.lineTo(cw, ch * 0.58);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Fingertip Neon Reticle (res.fingerTip.x is already in screen-mirrored space)
          if (res.fingerTip) {
            const fx = res.fingerTip.x * cw;
            const fy = res.fingerTip.y * ch;

            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor =
              res.direction === 'UP'
                ? '#00ffff'
                : res.direction === 'DOWN'
                ? '#d02128'
                : '#34d399';
            ctx.strokeStyle =
              res.direction === 'UP'
                ? '#00ffff'
                : res.direction === 'DOWN'
                ? '#d02128'
                : '#34d399';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(fx, fy, 16, 0, Math.PI * 2);
            ctx.stroke();

            // Center target dot
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(fx, fy, 4, 0, Math.PI * 2);
            ctx.fill();

            // Direction Arrow above/below fingertip
            if (res.direction === 'UP' || res.direction === 'DOWN') {
              const arrowY = res.direction === 'UP' ? fy - 26 : fy + 26;
              ctx.fillStyle = res.direction === 'UP' ? '#00ffff' : '#d02128';
              ctx.beginPath();
              if (res.direction === 'UP') {
                ctx.moveTo(fx, arrowY - 7);
                ctx.lineTo(fx - 6, arrowY + 5);
                ctx.lineTo(fx + 6, arrowY + 5);
              } else {
                ctx.moveTo(fx, arrowY + 7);
                ctx.lineTo(fx - 6, arrowY - 5);
                ctx.lineTo(fx + 6, arrowY - 5);
              }
              ctx.closePath();
              ctx.fill();
            }

            ctx.restore();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [
    cameraActive,
    processFrame,
    sensitivity,
    scrollMode,
    currentView,
    triggerNavigation,
    scrollActiveContainer,
    triggerAirClick,
  ]);

  if (!isOpen) return null;

  return (
    <>
      {/* 1. On-Screen Holographic Virtual Air-Cursor (60FPS Direct GPU Transform) */}
      {cameraActive && showVirtualCursor && cursorPos.visible && (
        <div
          ref={cursorDomRef}
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
          style={{
            transform: `translate3d(${cursorLivePosRef.current.x}px, ${cursorLivePosRef.current.y}px, 0) translate(-50%, -50%)`,
          }}
        >
          <div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-100 ${
              currentDir === 'UP'
                ? 'border-[#00ffff] bg-[#00ffff]/30 shadow-[0_0_24px_#00ffff] scale-110'
                : currentDir === 'DOWN'
                ? 'border-[#d02128] bg-[#d02128]/30 shadow-[0_0_24px_#d02128] scale-110'
                : 'border-emerald-400 bg-emerald-400/20 shadow-[0_0_16px_rgba(52,211,153,0.75)]'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          </div>

          {(currentDir === 'UP' || currentDir === 'DOWN') && (
            <div
              className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase whitespace-nowrap shadow-lg ${
                currentDir === 'UP'
                  ? 'bg-[#00ffff] text-black shadow-[0_0_12px_rgba(0,255,255,0.6)]'
                  : 'bg-[#d02128] text-white shadow-[0_0_12px_rgba(208,33,40,0.6)]'
              }`}
            >
              {currentDir === 'UP' ? '▲ SCROLL UP' : '▼ SCROLL DOWN'}
            </div>
          )}
        </div>
      )}

      {/* 2. Floating Cybernetic HUD Dock */}
      <aside
        aria-label="Air Gesture Camera HUD"
        className={`fixed z-[85] transition-all duration-500 ease-out select-none ${
          isRTL ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
        } bottom-4 sm:bottom-6`}
      >
        {isMinimized ? (
          /* Minimized Capsule Mode */
          <div className="flex items-center gap-2 p-2 rounded-full bg-[#07090f]/95 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer focus:outline-none"
              title="Expand Camera HUD"
            >
              <div className="relative">
                <Camera className="w-4 h-4 text-[#d02128]" />
                {cameraActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                {cameraActive
                  ? currentDir === 'UP'
                    ? '▲ SCROLL UP'
                    : currentDir === 'DOWN'
                    ? '▼ SCROLL DOWN'
                    : 'AIR GESTURE ACTIVE'
                  : 'AIR GESTURE HUD'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Expand"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Full Futuristic HUD Panel */
          <div className="w-[320px] sm:w-[360px] rounded-2xl bg-[#07090f]/95 backdrop-blur-3xl border border-white/25 shadow-[0_24px_70px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.3)] overflow-hidden transition-all duration-300">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent border-b border-white/15">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-[#d02128]/20 border border-[#d02128]/50 text-[#d02128]">
                  <Hand className="w-3.5 h-3.5" />
                  {cameraActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white truncate">
                    {t.title}
                  </h4>
                  <p className="text-[9px] text-white/50 truncate">{t.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {cameraActive && (
                  <span className="text-[10px] font-mono font-bold text-[#00ffff] bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/60">
                    {fps} FPS
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    soundEnabled ? 'text-emerald-400 hover:bg-emerald-500/20' : 'text-white/40 hover:bg-white/10'
                  }`}
                  title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGuide((prev) => !prev)}
                  className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Gesture Guide"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-md text-white/60 hover:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* LIVE CAMERA VIEWPORT + OVERLAY CANVAS */}
            <div className="relative bg-black aspect-[4/3] w-full overflow-hidden flex items-center justify-center border-b border-white/15">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                onLoadedData={() => setCameraActive(true)}
                onCanPlay={() => setCameraActive(true)}
                className={`w-full h-full object-cover transition-transform ${
                  isMirrored ? '-scale-x-100' : ''
                } ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
              />

              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Action Banner Flash */}
              {actionLabel && Date.now() - lastActionTime < 1300 && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#07090f]/95 border border-emerald-400/90 shadow-[0_0_20px_rgba(52,211,153,0.7)] text-emerald-300 text-[10px] font-mono font-bold tracking-widest animate-bounce z-20">
                  {actionLabel}
                </div>
              )}

              {/* HUD Zone Guidance Badges */}
              {cameraActive && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none p-2 flex flex-col justify-between"
                >
                  {/* Top Zone Indicator */}
                  <div
                    className={`w-full py-1 px-2 rounded flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-200 border ${
                      currentDir === 'UP'
                        ? 'bg-[#00ffff]/30 border-[#00ffff] text-[#00ffff] shadow-[0_0_14px_rgba(0,255,255,0.5)]'
                        : 'bg-black/40 border-dashed border-white/20 text-white/50'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <ChevronUp className="w-3 h-3" />
                      {lang === 'hi' ? 'उंगली ऊपर उठाएं' : lang === 'ur' ? 'اوپر اٹھائیں' : 'MOVE FINGER UP'}
                    </span>
                    <span>{t.scrollingUp}</span>
                  </div>

                  {/* Center Deadzone Reticle */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-14 h-14 rounded-full border border-dashed flex items-center justify-center transition-all duration-300 ${
                        currentDir === 'HOLD'
                          ? 'border-emerald-400/90 bg-emerald-400/15 scale-105'
                          : 'border-white/20 bg-black/25 scale-95'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          currentDir === 'HOLD' ? 'bg-emerald-400 animate-ping' : 'bg-white/40'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bottom Zone Indicator */}
                  <div
                    className={`w-full py-1 px-2 rounded flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-200 border ${
                      currentDir === 'DOWN'
                        ? 'bg-[#d02128]/40 border-[#d02128] text-white shadow-[0_0_14px_rgba(208,33,40,0.6)]'
                        : 'bg-black/40 border-dashed border-white/20 text-white/50'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <ChevronDown className="w-3 h-3" />
                      {lang === 'hi' ? 'उंगली नीचे करें' : lang === 'ur' ? 'نیچے جھکائیں' : 'MOVE FINGER DOWN'}
                    </span>
                    <span>{t.scrollingDown}</span>
                  </div>
                </div>
              )}

              {/* Error / Offline Overlay */}
              {!cameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#07090f]/95 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center mb-2.5 text-[#d02128]">
                    <CameraOff className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                      {cameraError ? 'Camera Access Notice' : 'Connecting Camera...'}
                    </p>
                    <p className="text-[10px] text-white/60 leading-tight px-2">
                      {cameraError ||
                        'Please allow webcam access in your browser to enable touchless gestures.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d02128] to-[#99151b] hover:from-[#e52830] hover:to-[#b01820] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(208,33,40,0.5)] transition-all cursor-pointer focus:outline-none"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t.retryCamera}
                  </button>
                </div>
              )}
            </div>

            {/* Real-time Status Banner */}
            <div className="px-3.5 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    currentDir === 'UP'
                      ? 'bg-[#00ffff] animate-ping'
                      : currentDir === 'DOWN'
                      ? 'bg-[#d02128] animate-ping'
                      : currentDir === 'HOLD'
                      ? 'bg-emerald-400'
                      : 'bg-white/30'
                  }`}
                />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  {currentDir === 'UP' && t.scrollingUp}
                  {currentDir === 'DOWN' && t.scrollingDown}
                  {currentDir === 'HOLD' && t.holding}
                  {!currentDir && t.pointFinger}
                </span>
              </div>

              {/* Status Indicator */}
              <span className="text-[9px] font-mono font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-700/60 px-1.5 py-0.5 rounded">
                {activeSource === 'finger'
                  ? '👆 FINGER TRACKING'
                  : 'AI READY'}
              </span>
            </div>

            {/* TOUCHLESS FEATURE CONTROLLER (Control every feature of the website) */}
            <div className="p-2.5 space-y-2 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-white/70 uppercase tracking-wider">
                <span className="flex items-center gap-1 text-[#00ffff]">
                  <Zap className="w-3 h-3 text-[#00ffff]" />
                  {lang === 'hi' ? 'वेबसाइट फीचर्स' : lang === 'ur' ? 'ویب سائٹ فیچرز' : 'Website Features'}
                </span>
                <span className="text-white/40">AIR CONTROL</span>
              </div>

              {/* Row 1: Core Navigation (Prev Slide, Next Slide, Air Click, Top) */}
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerNavigation('prev')}
                  className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Previous Slide"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#00ffff] mb-0.5" />
                  <span>PREV</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerNavigation('next')}
                  className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Next Slide"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-[#d02128] mb-0.5" />
                  <span>NEXT</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerAirClick()}
                  className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Air Click element under cursor"
                >
                  <MousePointer className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
                  <span>CLICK</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.dispatchEvent(new CustomEvent('eferz-back-request'));
                  }}
                  className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Back to Top"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
                  <span>TOP</span>
                </button>
              </div>

              {/* Row 2: Website Modals & Settings (Menu, Search, Theme, Lang, CTA) */}
              <div className="grid grid-cols-5 gap-1 pt-0.5">
                <button
                  type="button"
                  onClick={() => dispatchFeatureAction('toggle-menu')}
                  className="flex flex-col items-center justify-center p-1 rounded-md bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-[8px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Toggle Navigation Menu"
                >
                  <Menu className="w-3 h-3 text-[#d02128] mb-0.5" />
                  <span>MENU</span>
                </button>

                <button
                  type="button"
                  onClick={() => dispatchFeatureAction('toggle-search')}
                  className="flex flex-col items-center justify-center p-1 rounded-md bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-[8px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Search Services & Case Studies"
                >
                  <Search className="w-3 h-3 text-cyan-400 mb-0.5" />
                  <span>SEARCH</span>
                </button>

                <button
                  type="button"
                  onClick={() => dispatchFeatureAction('toggle-theme')}
                  className="flex flex-col items-center justify-center p-1 rounded-md bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-[8px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Toggle Theme Mode (Galaxy / Sea)"
                >
                  <Palette className="w-3 h-3 text-amber-400 mb-0.5" />
                  <span>THEME</span>
                </button>

                <button
                  type="button"
                  onClick={() => dispatchFeatureAction('toggle-lang')}
                  className="flex flex-col items-center justify-center p-1 rounded-md bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-[8px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Toggle Language"
                >
                  <Globe className="w-3 h-3 text-emerald-400 mb-0.5" />
                  <span>LANG</span>
                </button>

                <button
                  type="button"
                  onClick={() => dispatchFeatureAction('start-project')}
                  className="flex flex-col items-center justify-center p-1 rounded-md bg-[#d02128]/30 hover:bg-[#d02128]/50 border border-[#d02128]/60 text-white text-[8px] font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Start a Project / Let's Build"
                >
                  <Rocket className="w-3 h-3 text-[#d02128] mb-0.5" />
                  <span>BUILD</span>
                </button>
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="p-3 space-y-2.5">
              {/* Sensitivity Selector */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Sliders className="w-3 h-3 text-[#d02128]" />
                  {lang === 'hi' ? 'संवेदनशीलता' : lang === 'ur' ? 'حساسیت' : 'Sensitivity'}
                </span>
                <div className="inline-flex rounded-lg bg-white/[0.06] p-0.5 border border-white/15">
                  {(['low', 'balanced', 'high'] as SensitivityLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSensitivity(level)}
                      className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        sensitivity === level
                          ? 'bg-[#d02128] text-white shadow'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {level === 'low'
                        ? 'LOW'
                        : level === 'balanced'
                        ? 'MID'
                        : 'HIGH'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scroll / Slide Mode Selector */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-[#00ffff]" />
                  {lang === 'hi' ? 'स्क्रॉल मोड' : 'Scroll Mode'}
                </span>
                <div className="inline-flex rounded-lg bg-white/[0.06] p-0.5 border border-white/15">
                  {(['auto', 'slides', 'continuous'] as ScrollMode[]).map((sm) => (
                    <button
                      key={sm}
                      type="button"
                      onClick={() => setScrollMode(sm)}
                      className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        scrollMode === sm
                          ? 'bg-cyan-500/80 text-black font-extrabold shadow'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {sm === 'auto'
                        ? 'AUTO'
                        : sm === 'slides'
                        ? 'SLIDE'
                        : 'SCROLL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles: Air Cursor + Mirror Flip */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowVirtualCursor((prev) => !prev)}
                  className={`flex items-center justify-center gap-1.5 p-1.5 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    showVirtualCursor
                      ? 'bg-white/15 border-white/30 text-white'
                      : 'bg-white/[0.04] border-white/10 text-white/50'
                  }`}
                  title="Virtual Cursor on screen"
                >
                  <MousePointer className="w-3 h-3 text-cyan-400" />
                  {lang === 'hi' ? 'एयर कर्सर' : 'Air Cursor'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMirrored((prev) => !prev)}
                  className={`flex items-center justify-center gap-1.5 p-1.5 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isMirrored
                      ? 'bg-white/15 border-white/30 text-white'
                      : 'bg-white/[0.04] border-white/10 text-white/50'
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  {lang === 'hi' ? 'मिरर फ्लिप' : 'Mirror Flip'}
                </button>
              </div>

              {/* Stop Camera Button */}
              {cameraActive && (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.06] hover:bg-red-500/20 border border-white/15 hover:border-red-500/40 text-white/80 hover:text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <CameraOff className="w-3.5 h-3.5" />
                  {t.stopCamera}
                </button>
              )}
            </div>

            {/* Interactive Gesture Guide Modal */}
            {showGuide && (
              <div className="p-3 bg-black/95 border-t border-white/15 space-y-2 text-[10px] font-mono text-white/80 max-h-[220px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/15 pb-1 text-[#d02128] font-bold">
                  <span>
                    {lang === 'hi'
                      ? 'इशारों से वेबसाइट चलाने की गाइड'
                      : lang === 'ur'
                      ? 'رہنمائی'
                      : 'Touchless Navigation Guide'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowGuide(false)}
                    className="text-white/60 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">👆</span>
                    <span>
                      <strong className="text-white">
                        {lang === 'hi' ? 'उंगली ऊपर ले जाएं:' : 'Move Finger Up:'}
                      </strong>{' '}
                      {lang === 'hi'
                        ? 'वेबसाइट तुरंत ऊपर स्क्रॉल होगी या पिछली स्लाइड पर जाएगी।'
                        : 'Scrolls up or switches to previous slide.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">👇</span>
                    <span>
                      <strong className="text-white">
                        {lang === 'hi' ? 'उंगली नीचे ले जाएं:' : 'Move Finger Down:'}
                      </strong>{' '}
                      {lang === 'hi'
                        ? 'वेबसाइट तुरंत नीचे स्क्रॉल होगी या अगली स्लाइड पर जाएगी।'
                        : 'Scrolls down or switches to next slide.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">✋</span>
                    <span>
                      <strong className="text-white">
                        {lang === 'hi' ? 'हाथ को बीच में स्थिर रखें:' : 'Hold Hand in Center:'}
                      </strong>{' '}
                      {lang === 'hi'
                        ? 'स्क्रॉलिंग रुक जाएगी (कोई आवाज या हलचल नहीं होगी)।'
                        : 'Stops all scrolling in place.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">⚡</span>
                    <span>
                      <strong className="text-white">
                        {lang === 'hi' ? 'क्विक बटन्स:' : 'HUD Action Buttons:'}
                      </strong>{' '}
                      {lang === 'hi'
                        ? 'PREV, NEXT, CLICK, TOP, MENU, SEARCH, THEME, LANG से सीधे फीचर्स चलाएं।'
                        : 'Direct shortcuts for all major website features.'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};
