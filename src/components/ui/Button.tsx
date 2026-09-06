import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "on-dark" | "ghost";
  size?: "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: never;
  rel?: never;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 ease-out cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-gold text-ink hover:bg-gold-bright active:scale-[0.98]",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper active:scale-[0.98]",
  "on-dark":
    "border border-paper/30 text-paper hover:border-gold hover:text-gold active:scale-[0.98]",
  ghost: "text-ink hover:text-gold-deep px-0! h-auto!",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-14 px-7 text-base rounded-full",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
      >
        {children}
        {icon}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={classes}
    >
      {children}
      {icon}
    </button>
  );
}
