# i18n Structure Review

Date: 2026-03-22

## Summary

Build tarafında kırık bir durum görünmüyor; mevcut yapı çalışıyor ve `npm run build` geçiyor. Ana risk alanı runtime bug değil, bakım maliyeti ve gereksiz abstraction katmanları. `next-intl` eklenmiş olmasına rağmen proje hâlâ iki farklı i18n yaklaşımını birlikte taşıyor.

Hedef "sade, kolay implement edilen ve mümkün olduğunca ortak yapılar barındıran" bir yapı ise, en büyük fırsat `next-intl` dışındaki özel dictionary erişim katmanını küçültmek.

## Findings

### 1. Medium: `next-intl` var ama ana çeviri kaynağı hâlâ custom dictionary katmanı

**References**

- `src/features/i18n/messages.ts:6`
- `src/features/i18n/messages.ts:92`
- `src/features/i18n/messages.ts:271`
- `src/i18n/request.ts:9`

**Why this matters**

Şu an çeviri verisi tek bir TypeScript objesinde tutuluyor ve `getDictionary(locale)` ile okunuyor. `next-intl` ise zaten mesaj kaynağı, typing ve erişim katmanı sunuyor. Bu yüzden proje aynı sorunu iki farklı soyutlama ile çözüyor:

- `next-intl` provider + hooks
- `getDictionary` + manual TypeScript interfaces

Bu yapı yeni alan eklerken şunları artırıyor:

- kavramsal yük
- taşınacak kod miktarı
- bir alanın "message mı, config mi, helper mı?" olduğunu anlama maliyeti

**Suggested direction**

`messages.ts` içindeki büyük `dictionaries` objesini zamanla şu yapıya taşı:

- `messages/en.json`
- `messages/tr.json`

`src/features/i18n/messages.ts` dosyası ya tamamen kalksın ya da yalnızca küçük yardımcılar barındırsın.

---

### 2. Medium: Aynı projede birden fazla translation erişim yolu var

**References**

- `app/page.tsx:6`
- `src/server/site-config.ts:13`
- `src/features/contact/schema.ts:10`
- `app/api/contact/route.ts:15`
- `src/features/site-settings/FloatingPanel.tsx:49`

**Why this matters**

Şu an proje içinde çeviriye erişmenin birkaç yolu var:

- `useTranslations(...)`
- `getDictionary(locale)`
- `getCurrentLocale()`
- `resolveAppLocale(...)`

Bu durum özellikle ekip büyüdüğünde "yeni bir yerde hangi yaklaşımı kullanmalıyım?" sorusunu doğurur.

**Suggested direction**

Tek standart belirlenmeli:

- React client component: `useTranslations`
- React server component: `getTranslations`
- React dışı helper / schema / service: mümkünse çeviri almasın, gerekli string caller tarafından verilsin

Bu sayede ortak yapı güçlenir ve herkes aynı kalıpla ilerler.

---

### 3. Medium: Home page tarafında label ve locale props olarak fazla taşınıyor

**References**

- `app/page.tsx:7`
- `app/page.tsx:12`
- `src/features/portfolio/components/HomePage/index.tsx:12`
- `src/features/portfolio/components/HomePage/index.tsx:26`
- `src/features/portfolio/components/HomePage/About/index.tsx:15`

**Why this matters**

`HomePageComponent` alt bileşenlere şu bilgileri props olarak dağıtıyor:

- `labels`
- `locale`
- türetilmiş label alanları

Bu, component ağacında prop drilling oluşturuyor. `next-intl` varken her katmanda label taşımak yerine, metni kullanan katmanın ona en yakın yerden alması daha sade olur.

**Suggested direction**

İki seçenekten biri seçilmeli:

1. Section bazlı yaklaşım:
   `HomePageComponent` sadece content ve catalogs alsın; `About`, `Experience`, `Education` kendi translation erişimini yapsın.
2. Container bazlı yaklaşım:
   `app/page.tsx` içinde tüm textler hazırlanıp tek bir `uiText` objesi geçilsin; leaf componentler tek tek ayrı label props almasın.

Ben bu projede 1. seçeneği daha sade buluyorum.

---

### 4. Medium-Low: `messages.ts` içinde message, metadata ve text composition helper aynı yerde duruyor

**References**

- `src/features/i18n/messages.ts:73`
- `src/features/i18n/messages.ts:160`
- `src/features/i18n/messages.ts:275`
- `src/server/site-config.ts:13`

**Why this matters**

Bu dosya şu anda üç farklı sorumluluğu taşıyor:

- çeviri mesajları
- site metadata içerikleri
- string birleştirme helper'ı (`getAboutSummaryText`)

Bu karışım dosyanın büyümesine ve karar sınırlarının bulanıklaşmasına yol açar.

**Suggested direction**

Ayır:

- `messages/*.json`: UI ve metadata message'ları
- `src/i18n/formatters.ts`: `getAboutSummaryText` gibi string composition helper'ları
- `src/server/site-config.ts`: sadece site config üretimi

Daha da iyisi, `getAboutSummaryText` için ICU interpolation kullan:

- `about.summary = "{location}...'`

Böylece helper bile gerekmeyebilir.

---

### 5. Low: Locale çözümü iki yerde normalize ediliyor

**References**

- `src/i18n/request.ts:11`
- `src/features/i18n/server.ts:7`
- `src/features/i18n/config.ts:12`

**Why this matters**

`request.ts` zaten locale'i normalize ediyor. Sonrasında `getCurrentLocale()` içinde `getLocale()` sonucunu tekrar `resolveAppLocale` ile normalize ediyoruz. Bu zararlı değil ama fazla.

Benzer şekilde locale seçenekleri de iki ayrı yerde tanımlı:

- `appLocales`
- `FloatingPanel` içindeki `localeOptions`

**Suggested direction**

- `getCurrentLocale()` mümkünse `return getLocale() as AppLocale` seviyesine indirilebilir
- `localeOptions`, `appLocales` üzerinden türetilmeli

Küçük ama ortak yapı hedefi için faydalı sadeleştirmeler.

## What looks good

- Firestore içerik lokalizasyonu ile UI lokalizasyonu ayrılmış durumda. Bu doğru ayrım.
- `resolveLocalizedData` yaklaşımı sade ve tekrar kullanılabilir.
- `next-intl` provider entegrasyonu root layout'ta doğru yerde.
- Contact form client tarafında `useTranslations` kullanımı yeni yapıya uygun.

## Recommended Target Structure

```text
src/
  i18n/
    config.ts          -> locales, default locale, cookie name
    request.ts         -> next-intl request config
    formatters.ts      -> text composition helpers, gerekiyorsa
  messages/
    en.json
    tr.json
```

Kullanım standardı:

- Client component: `useTranslations`
- Server component: `getTranslations`
- Server helper / validation: caller text geçirir veya küçük translator adapter kullanır
- Firestore content: mevcut `{en, tr}` + fallback resolver kalır

## Suggested Refactor Order

1. `dictionaries` objesini `messages/en.json` ve `messages/tr.json` dosyalarına taşı.
2. `getDictionary` kullanan yerleri azalt:
   - önce `app/page.tsx`
   - sonra `site-config.ts`
   - sonra `contact/schema.ts` ve `app/api/contact/route.ts`
3. `HomePage` altındaki label prop drilling'i kaldır.
4. `getAboutSummaryText` benzeri helper'ları `formatters.ts` altına taşı ya da ICU message'a çevir.
5. Locale seçeneklerini `appLocales` üzerinden türet.

## Bottom Line

Mevcut yapı çalışıyor, ancak şu an "custom dictionary layer + next-intl" birlikte yaşadığı için gereğinden daha kalın. Eğer hedef sadelik ve ortak yapıysa, bir sonraki doğru adım:

**`next-intl`i ana i18n katmanı yapmak, custom dictionary erişimini inceltmek ve message kaynağını JSON'a taşımak.**
