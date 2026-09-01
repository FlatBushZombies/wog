const COLOR_MAP = {
  accent: "#D2AE78",
  white: "#FFFFFF",
  black: "#0A0A0A",
} as const;

export interface LogoMarkProps {
  variant?: keyof typeof COLOR_MAP;
  className?: string;
  size?: number;
}

export function LogoMark({ variant = "accent", className, size = 28 }: LogoMarkProps) {
  const color = COLOR_MAP[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 1.5C16 8.4 21.1 13.5 28 13.5C21.1 13.5 16 18.6 16 25.5C16 18.6 10.9 13.5 4 13.5C10.9 13.5 16 8.4 16 1.5Z"
        fill={color}
      />
      <circle cx="16" cy="13.5" r="2.25" fill={color} opacity="0.55" />
    </svg>
  );
}
