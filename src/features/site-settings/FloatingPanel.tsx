'use client'

import { FloatingPanelTrigger, FloatingPanelTooltipPortal } from "./FloatingPanelChrome";
import { FloatingPanelContent } from "./FloatingPanelContent";
import { useFloatingPanel } from "./useFloatingPanel";
import styles from "./FloatingPanel.module.scss";

const FloatingSiteSettings = () => {
  const {
    createTooltipFocusHandler,
    createTooltipMouseEnterHandler,
    handleLocaleChange,
    handleReset,
    handleThemeChange,
    handleToggleDrag,
    hideTooltip,
    isConfirmingReset,
    isDragEnabled,
    isLocalePending,
    isMobile,
    isOpen,
    isResetting,
    locale,
    panelRef,
    selectedThemeMode,
    setIsOpen,
    tooltip,
  } = useFloatingPanel();

  if (isMobile) {
    return null;
  }

  const createTooltipTriggerProps = (label: string) => ({
    onBlur: hideTooltip,
    onFocus: createTooltipFocusHandler(label),
    onMouseEnter: createTooltipMouseEnterHandler(label),
    onMouseLeave: hideTooltip,
  });

  return (
    <div className={styles.siteSettings} ref={panelRef}>
      <FloatingPanelContent
        createTooltipTriggerProps={createTooltipTriggerProps}
        currentLocale={locale}
        isConfirmingReset={isConfirmingReset}
        isDragEnabled={isDragEnabled}
        isLocalePending={isLocalePending}
        isOpen={isOpen}
        isResetting={isResetting}
        onLocaleChange={handleLocaleChange}
        onReset={() => {
          handleReset();
          hideTooltip();
        }}
        onThemeChange={handleThemeChange}
        onToggleDrag={handleToggleDrag}
        selectedThemeMode={selectedThemeMode}
      />
      <FloatingPanelTrigger
        isOpen={isOpen}
        onToggle={() => {
          setIsOpen((previousValue) => !previousValue);
        }}
      />
      <FloatingPanelTooltipPortal tooltip={tooltip} />
    </div>
  );
};

export default FloatingSiteSettings;
