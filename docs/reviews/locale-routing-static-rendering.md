# Locale Routing & Static Rendering

Date: 2026-10-03

## Summary

Dil artık URL'de. Ana sayfa ve iletişim sayfası iki dilde de build sırasında statik üretiliyor ve CDN'den geliyor. Build, typecheck ve lint hatasız geçti. Production build yerelde çalıştırılıp curl ile test edildi. Dil değiştirici tarayıcıda denenmedi.

## Yerel testte doğrulananlar

- **Statik çıktı:** `/` ve `/tr` sayfaları cache'ten geliyor (`x-nextjs-cache: HIT`, `s-maxage=3600`). Eskiden `no-store` dönüyordu.
- **Yönlendirmeler:**
  - `/en` adresi `/`'e gidiyor.
  - Daha önce Türkçe seçmiş ya da tarayıcısı Türkçe olan ziyaretçi `/`'e gelince `/tr`'ye yönleniyor.
  - Bilinmeyen adresler (`/nope`, `/tr/nope`) 404 dönüyor, canlı sitedeki gibi.
- **Metadata:** `/tr` sayfasında `<html lang="tr">` ve Türkçe başlık var. Her sayfada kendi canonical'ı ile `en`, `tr` ve `x-default` için hreflang linkleri bulunuyor.
- **Sitemap:** Dört URL'nin hepsi dil alternatifleriyle birlikte listeleniyor.
- **İç linkler:** Türkçe sayfalarda dili koruyor, örneğin `/tr/contact` ve geri butonu için `/tr`.

## Yapılanlar

- **Routing ve middleware:**
  - `src/i18n/routing.ts` içinde `as-needed` ayarı var: İngilizce prefix'siz, Türkçe `/tr` altında. Eski `app_locale` cookie'si korunuyor, kimsenin dil seçimi sıfırlanmıyor.
  - Kök dizine `middleware.ts` eklendi.
  - Sayfalar `app/[locale]/` altına taşındı, `cookies()` kullanımı kaldırıldı.
- **Dil değiştirici:** `src/features/site-settings/useFloatingPanel.ts` artık cookie yazıp sayfayı yenilemiyor, aynı sayfanın diğer dildeki adresine gidiyor.
- **Ortak link bileşeni:** `src/ui/Link` ve navbar linkleri artık dili otomatik koruyor.
- **Firestore verisi:** Sayfa saatte bir yenileniyor (`revalidate = 3600`). İçerikte değişiklik yapıp hemen görmek için `POST /api/revalidate` endpoint'i eklendi. Endpoint gizli bir anahtarla korunuyor.
- **Kök dosyalar:** `app/layout.tsx` sadece `metadataBase` tanımlıyor. `app/not-found.tsx` dil kapsamı dışındaki 404'leri karşılıyor.

## Yapılması gerekenler

1. **Vercel'e `REVALIDATE_SECRET` ekle.** Eklenmezse endpoint 503 döner, ama saatlik yenileme yine çalışır. Firestore'u düzenledikten sonra anında yenilemek için:

   ```sh
   curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://www.mesuttutsak.dev/api/revalidate
   ```

2. **Build ortamı:** Firebase ortam değişkenleri artık build sırasında da gerekiyor. Vercel'de "Production" ortamı için tanımlıysalar bir şey yapmaya gerek yok.
3. **Dil değiştiriciyi bir kez dene:** Preview deploy'da Türkçe ve İngilizce arasında geçiş yap. Test edilemeyen tek kısım bu.
