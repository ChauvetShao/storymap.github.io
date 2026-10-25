import { useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { asset, stickerAsset } from "../assets";
import type { Sticker, Element } from "../state/model";

export function Icon({
  name,
  className = "",
  tone = "",
}: {
  name: string;
  className?: string;
  tone?: string;
}) {
  return (
    <img
      draggable={false}
      aria-hidden="true"
      className={`icon ${className} ${tone ? "tone-" + tone : ""}`}
      src={asset(name)}
      alt=""
    />
  );
}
export function Logo() {
  const layers = [
    [0, 0, 0, 1106.796, 447.224],
    [3, 10.306, 133.699, 1069.063, 315.285],
    [4, 0.022, 123.43, 1069.063, 315.286],
    [1, 24.052, 147.361, 1027.893, 274.182],
    [2, 20.556, 143.954, 1027.997, 274.148],
    [5, 231.148, 342.12, 644.504, 140.879],
  ];
  return (
    <div
      className="home-logo"
      role="img"
      aria-label="故事岛大冒险，和团团一起，把故事找回来！"
    >
      {layers.map(([i, x, y, w, h]) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (x / 1106.796) * 100 + "%",
            top: (y / 483) * 100 + "%",
            width: (w / 1106.796) * 100 + "%",
            height: (h / 483) * 100 + "%",
          }}
        >
          <img src={asset("logo-part" + i)} alt="" />
        </div>
      ))}
    </div>
  );
}
export function Button({
  children,
  icon,
  variant = "orange",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  variant?: string;
}) {
  return (
    <button
      {...props}
      className={`story-button button-${variant} ${className}`}
    >
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </button>
  );
}
export function IconButton({
  icon,
  label,
  onClick,
  className = "",
}: {
  icon: string;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={"icon-button " + className}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
}
export function Cost({ kind = "droplet" }: { kind?: string }) {
  return (
    <span className="cost">
      <Icon name={kind} />1
    </span>
  );
}
export function Stars({
  count = 0,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span className={"stars " + className} aria-label={`${count}颗星，共3颗`}>
      {[0, 1, 2].map((i) => (
        <Icon key={i} name={i < count ? "star" : "starDisabled"} />
      ))}
    </span>
  );
}
export function WoodTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={"wood-title " + className}
      style={{ backgroundImage: `url(${asset("woodBlank")})` }}
    >
      {children}
    </h2>
  );
}
export function Character({
  pose = "talking",
  speech,
  className = "",
}: {
  pose?: string;
  speech?: string;
  className?: string;
}) {
  return (
    <div className={"character " + className}>
      {speech && (
        <div className="character-speech">
          <span className="character-name">团团</span>
          {speech}
        </div>
      )}
      <img
        className="character-body"
        src={asset(pose)}
        alt="侦探小浣熊团团"
        draggable={false}
      />
    </div>
  );
}
export function Dialogue({
  children,
  pose = "wink",
}: {
  children: ReactNode;
  pose?: string;
}) {
  return (
    <div className="map-dialogue">
      <img src={asset(pose)} alt="团团" />
      <p>{children}</p>
      <span className="dialogue-next" aria-hidden="true">
        ▾
      </span>
    </div>
  );
}
export function Mic({
  onFinish,
  label = "按住说话",
  disabled = false,
}: {
  onFinish: () => void;
  label?: string;
  disabled?: boolean;
}) {
  const [listening, setListening] = useState(false);
  const active = useRef(false);
  const done = useRef(onFinish);
  done.current = onFinish;
  const start = () => {
    if (disabled || active.current) return;
    active.current = true;
    setListening(true);
  };
  const finish = (cancel = false) => {
    if (!active.current) return;
    active.current = false;
    setListening(false);
    if (!cancel) done.current();
  };
  useEffect(() => {
    const cancel = () => finish(true);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", cancel);
    return () => {
      active.current = false;
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
  }, []);
  return (
    <div className="mic-control">
      <button
        className={"mic-button " + (listening ? "listening" : "")}
        disabled={disabled}
        aria-label={listening ? "正在听你说话" : label}
        aria-pressed={listening}
        onPointerDown={(e) => {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          start();
        }}
        onPointerUp={() => finish()}
        onPointerCancel={() => finish(true)}
        onLostPointerCapture={() => finish(true)}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault();
            start();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            finish();
          }
        }}
      >
        <Icon name="mic" />
        {listening && <span className="mic-ripple" />}
      </button>
      <p aria-live="polite">{listening ? "正在听你说话…" : label}</p>
    </div>
  );
}
export function Modal({
  children,
  onClose,
  className = "",
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const node = ref.current!;
    const focusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'button:not(:disabled),input,textarea,[tabindex="0"]',
        ),
      );
    (focusable()[0] ?? node).focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key === "Tab") {
        const list = focusable(),
          first = list[0],
          last = list.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previous?.focus?.();
    };
  }, []);
  return (
    <div
      className="modal-overlay"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={"modal " + className}
      >
        <IconButton
          className="modal-close"
          icon="close"
          label="关闭"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
export function Rings() {
  return (
    <div className="binding-rings" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <img key={i} src={asset("ring")} alt="" />
      ))}
    </div>
  );
}
export function Elements({ elements }: { elements: Element[] }) {
  return (
    <div className="elements scroll-area">
      {elements.map((e, i) => (
        <div key={e.label}>
          {[0, 3, 5].includes(i) && (
            <p className="element-group">
              {i === 0
                ? "认识故事"
                : i === 3
                  ? "理清故事发展"
                  : "让故事走到结局"}
            </p>
          )}
          <div className={"element-row " + (e.text ? "filled" : "empty")}>
            <Icon name={e.icon} tone="orange" />
            <div className="element-copy">
              <strong>{e.label}</strong>
              {e.text && <p>{e.text}</p>}
            </div>
            {e.text && <Stars count={e.stars} />}
          </div>
        </div>
      ))}
    </div>
  );
}
export function SceneCanvas({
  sceneId,
  stickers,
  onMove,
  onSelect,
  selected,
  className = "",
  editable = false,
}: {
  sceneId: string;
  stickers: Sticker[];
  onMove?: (id: string, x: number, y: number) => void;
  onSelect?: (id: string) => void;
  selected?: string | null;
  className?: string;
  editable?: boolean;
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  return (
    <div
      ref={canvas}
      className={"scene-canvas " + className}
      style={{ backgroundImage: `url(${asset(sceneId)})` }}
      aria-label="故事场景"
    >
      <div className="sticker-layer">
        {stickers.map((s) => (
          <button
            key={s.id}
            aria-label={
              s.assetId === "rainbow" ? "彩虹贴纸" : `贴纸 ${s.assetId}`
            }
            tabIndex={editable ? 0 : -1}
            className={`placed-sticker ${selected === s.id ? "selected" : ""}`}
            style={{
              left: s.x * 100 + "%",
              top: s.y * 100 + "%",
              width: 14 * s.scale + "%",
              transform: `translate(-50%,-50%) rotate(${s.rotation}deg)`,
            }}
            onClick={() => onSelect?.(s.id)}
            onPointerDown={(e) => {
              if (!editable) return;
              e.preventDefault();
              e.stopPropagation();
              const r = canvas.current!.getBoundingClientRect();
              drag.current = {
                id: s.id,
                dx: e.clientX - (r.left + s.x * r.width),
                dy: e.clientY - (r.top + s.y * r.height),
              };
              e.currentTarget.setPointerCapture(e.pointerId);
              onSelect?.(s.id);
            }}
            onPointerMove={(e) => {
              if (!drag.current || drag.current.id !== s.id) return;
              const r = canvas.current!.getBoundingClientRect();
              onMove?.(
                s.id,
                (e.clientX - r.left - drag.current.dx) / r.width,
                (e.clientY - r.top - drag.current.dy) / r.height,
              );
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onKeyDown={(e) => {
              if (!editable) return;
              const step = e.shiftKey ? 0.05 : 0.015;
              const deltas: Record<string, [number, number]> = {
                ArrowLeft: [-step, 0],
                ArrowRight: [step, 0],
                ArrowUp: [0, -step],
                ArrowDown: [0, step],
              };
              if (deltas[e.key]) {
                e.preventDefault();
                onMove?.(s.id, s.x + deltas[e.key][0], s.y + deltas[e.key][1]);
              }
            }}
          >
            <img src={stickerAsset(s.assetId)} alt="" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
