type DateDisplayPrecision = "monthYear" | "year";

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  timeZone: "UTC",
});

function parseDateValue(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatDateLabel(
  value?: string | null,
  precision: DateDisplayPrecision = "monthYear",
  fallback = ""
) {
  if (!value) {
    return fallback;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return fallback;
  }

  const parsedDate = parseDateValue(trimmedValue);

  if (!parsedDate) {
    return trimmedValue;
  }

  return precision === "year"
    ? yearFormatter.format(parsedDate)
    : monthYearFormatter.format(parsedDate);
}

export function formatDateRange(
  startDate?: string | null,
  endDate?: string | null,
  precision: DateDisplayPrecision = "monthYear",
  presentLabel = "Present"
) {
  const startLabel = formatDateLabel(startDate, precision);
  const endLabel = endDate
    ? formatDateLabel(endDate, precision)
    : presentLabel;

  if (!startLabel && !endLabel) {
    return "";
  }

  if (!startLabel) {
    return endLabel;
  }

  if (!endLabel) {
    return startLabel;
  }

  return `${startLabel} - ${endLabel}`;
}
