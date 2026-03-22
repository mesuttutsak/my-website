'use client'

import NextLink from "next/link";
import { ImSpinner8 } from "react-icons/im";

import { cn } from "@/src/shared/lib/cn";
import styles from "@/src/ui/Button/Button.module.scss";
import type { LinkPropsUI } from "./link.types";

const Link = ({
  children,
  className = [],
  href,
  isDisabled = false,
  isLoading,
  onClick,
  prefetch,
  rel,
  replace,
  scroll,
  size,
  target,
  variant = "primary",
}: LinkPropsUI) => {
  return (
    <NextLink
      aria-disabled={isDisabled || isLoading}
      className={cn(styles.button, ...className)}
      data-size={size}
      data-variant={variant}
      href={href}
      onClick={(event) => {
        if (isDisabled || isLoading) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      prefetch={prefetch}
      rel={rel}
      replace={replace}
      scroll={scroll}
      target={target}
    >
      {children}

      {isLoading && (
        <div className={styles.loading}>
          <ImSpinner8 className={styles.spinner} size={20} />
        </div>
      )}
    </NextLink>
  );
};

export default Link;
