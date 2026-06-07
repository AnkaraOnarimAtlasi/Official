---
name: atlas-content-integrity
description: Usta, atölye, adres ve hikâye bilgilerinin uydurulmamasını sağlar. Doğrulanmamış veri "draft" durumunda kalır, gerçek kişi portresi izinsiz yayınlanmaz. İçerik üretilen her durumda devreye girer.
---

# atlas-content-integrity

## Ne zaman devreye girer
- Usta, atölye veya durak içeriği yazılırken/önerilirken
- Adres, telefon, fotoğraf eklenirken
- Hikâye/saha dosyası üretilirken
- Seed verisi oluşturulurken
- Placeholder yerine "gerçekmiş gibi" metin doldurma cazip olduğunda

## Sabit ilkeler
1. **Doğrulanmamış veri ≠ yayın** — gerçek saha verisi yoksa `is_published = false` ve UI'da `Taslak / Saha doğrulaması bekleniyor` rozetiyle gösterilir.
2. **Fiziksel atlas otorite** — basılı paftalarda yer alan usta isimleri, adresler ve bölgeler doğrulanmış kabul edilir. Bunun dışına çıkmak için kullanıcıdan onay alınır.
3. **İzin olmadan portre yok** — gerçek kişi fotoğrafı `permission_confirmed = true` olmadan yayınlanmaz.
4. **Hassas iletişim** — kişisel telefon, ev adresi vb. atölye için açıkça paylaşıma açılmadıysa görünür kılınmaz. Bunun yerine "randevu ile" / "sosyal medya üzerinden" işaretlenir.
5. **Şiirsel ama gerçek** — editoryal dil zenginleştirir; veri uydurmaz. Bir cümle metafora dönüşebilir, bir tarih veya isim asla.

## Kabul kriterleri
- [ ] Yeni eklenen her durakta kaynak fiziksel atlas paftası veya kullanıcı tarafından sağlanan saha verisi.
- [ ] Kaynaksız metinde `Taslak` rozeti veya yayın dışı.
- [ ] Seed verisi yalnızca paftalarda görünen ustaları içeriyor.
- [ ] Submission akışı `pending` ile başlıyor; otomatik yayın yok.
- [ ] Editoryal metin doğrulanmış olay/gözleme yaslı; hayali "her sabah 7'de açar" gibi cümle yok.

## Eylem örüntüleri
- Kullanıcı "şu ustanın hikâyesini yaz" derse → önce gerçek bilgi var mı sor.
- LLM hikâye üretmek istediğinde → yalnızca atlasta basılı sınırlı veriyi yeniden anlatır; ekleme yapmaz.
- Adres eksikse → "Bölge: X" olarak göster, tam adres uydurma.
