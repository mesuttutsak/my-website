'use client'

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LuChevronUp } from "react-icons/lu";

import styles from "./FloatingPanel.module.scss";

export type FloatingPanelOptionValue = string;

export interface FloatingPanelOption {
  disabled?: boolean;
  icon?: ReactNode;
  label: string;
  value: FloatingPanelOptionValue;
}

type FloatingPanelSelectTriggerProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onBlur" | "onFocus" | "onMouseEnter" | "onMouseLeave"
>;

interface FloatingPanelSelectProps {
  activeValue: FloatingPanelOptionValue;
  ariaLabel: string;
  isOpen: boolean;
  onSelect: (value: FloatingPanelOptionValue) => void;
  onToggle: () => void;
  options: FloatingPanelOption[];
  optionProps?: (label: string) => FloatingPanelSelectTriggerProps;
  showOptionLabels?: boolean;
  triggerProps?: FloatingPanelSelectTriggerProps;
  triggerContent: ReactNode;
}

export function FloatingPanelSelect({
  activeValue,
  ariaLabel,
  isOpen,
  onSelect,
  onToggle,
  optionProps,
  options,
  showOptionLabels = true,
  triggerProps,
  triggerContent,
}: FloatingPanelSelectProps) {
  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        className={styles.siteSettingsSelectTrigger}
        data-open={isOpen}
        onClick={onToggle}
        type="button"
        {...triggerProps}
      >
        <span className={styles.siteSettingsSelectTriggerValue}>{triggerContent}</span>
        <LuChevronUp className={styles.siteSettingsSelectChevron} size={14} />
      </button>

      {isOpen && (
        <div
          aria-label={ariaLabel}
          className={styles.siteSettingsSelectPopover}
          role="menu"
        >
          {options.map(({ disabled, icon, label, value }) => (
            <button
              key={value}
              aria-label={label}
              aria-checked={value === activeValue}
              className={styles.siteSettingsSelectOption}
              data-active={value === activeValue}
              data-has-icon={Boolean(icon)}
              disabled={disabled}
              onClick={() => {
                onSelect(value);
              }}
              role="menuitemradio"
              type="button"
              {...optionProps?.(label)}
            >
              {icon && (
                <span aria-hidden="true" className={styles.siteSettingsSelectOptionIcon}>
                  {icon}
                </span>
              )}
              {showOptionLabels && (
                <span className={styles.siteSettingsSelectOptionLabel}>{label}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
