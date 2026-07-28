type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return <span className={className} aria-hidden="true">↗</span>;
}

export function CircleDot({ className }: IconProps) {
  return <span className={className} aria-hidden="true">◉</span>;
}

export function Languages({ className }: IconProps) {
  return <span className={className} aria-hidden="true">文</span>;
}

export function Moon({ className }: IconProps) {
  return <span className={className} aria-hidden="true">◐</span>;
}

export function Menu({ className }: IconProps) {
  return <span className={className} aria-hidden="true">☰</span>;
}

export function Check({ className }: IconProps) {
  return <span className={className} aria-hidden="true">✓</span>;
}
