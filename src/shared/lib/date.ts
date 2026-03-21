import {
  defaultAppLocale,
  type AppLocale,
} from "@/src/i18n/config";

type DateDisplayPrecision = "monthYear" | "year";

function getDateTimeLocale(locale: AppLocale) {
  return locale === "tr" ? "tr-TR" : "en-US";
}

function getMonthYearFormatter(locale: AppLocale) {
  return new Intl.DateTimeFormat(getDateTimeLocale(locale), {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getYearFormatter(locale: AppLocale) {
  return new Intl.DateTimeFormat(getDateTimeLocale(locale), {
    year: "numeric",
    timeZone: "UTC",
  });
}

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
  fallback = "",
  locale: AppLocale = defaultAppLocale
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
    ? getYearFormatter(locale).format(parsedDate)
    : getMonthYearFormatter(locale).format(parsedDate);
}

export function formatDateRange(
  startDate?: string | null,
  endDate?: string | null,
  precision: DateDisplayPrecision = "monthYear",
  presentLabel = "Present",
  locale: AppLocale = defaultAppLocale
) {
  const startLabel = formatDateLabel(startDate, precision, "", locale);
  const endLabel = endDate
    ? formatDateLabel(endDate, precision, "", locale)
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
