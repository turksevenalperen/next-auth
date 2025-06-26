# Next.js 14 + Auth0 + NextAuth.js Kimlik Doğrulama Projesi

**Canlı Demo:** https://next-auth-seven-lovat.vercel.app

**Admin Giriş Bilgileri:**
- E-posta: admin@gmail.com
- Şifre: Admin123,

## Projenin Amacı
Bu proje, modern bir web uygulamasında kullanıcıların güvenli bir şekilde kayıt olması, giriş yapması, rollerine göre yönlendirilmesi ve erişim kontrollerinin sağlanması için geliştirilmiştir. Next.js 14 App Router mimarisi kullanılarak, hem klasik kullanıcı adı/şifre girişi. JWT tabanlı oturum yönetimi, şifre sıfırlama, rol bazlı yönlendirme ve sayfa koruma gibi birçok güvenlik özelliği entegre edilmiştir.

## Temel Özellikler
- **Kayıt Ol (Signup):** E-posta ve güçlü şifre ile kayıt. Şifre kuralları: büyük harf, küçük harf, sayı, özel karakter ve min. 8 karakter.
- **Giriş (Login):** Hem klasik hem de Auth0 OAuth sağlayıcıları ile giriş yapılabilir.
- **Şifre Sıfırlama:** E-posta üzerinden Auth0 API kullanılarak kullanıcıya şifre sıfırlama bağlantısı gönderilir.
- **Rol Bazlı Yetkilendirme:** Kullanıcı rolüne göre /admin veya /dashboard sayfalarına yönlendirme.
- **Sayfa Koruma (Middleware):** Oturumu olmayan kullanıcılar login sayfasına yönlendirilir. Rolü uymayan kullanıcılar /unauthorized sayfasına yönlendirilir.
- **JWT Tabanlı Oturum Yönetimi:** Stateless, güvenli oturum kontrolü.
- **Form Validasyonu ve Bildirimler:** Formlarda anlık geri bildirimler ve başarılı/hatalı işlemlerde kullanıcıya bilgi verilir.

## Proje Mimarisi ve Yapısı
- **Next.js 14 App Router:** Yeni dosya sistemi kullanılarak sayfalar ve API route'ları yapılandırıldı.
- **NextAuth.js + Auth0:** E-posta/şifre yöntemi ile kimlik doğrulama sağlandı.
- **Custom Hooks:** useSignup, usePasswordValidation gibi özel hook'lar ile form validasyonu ve iş mantığı ayrıştırıldı.
- **Middleware:** Sunucu tarafında oturum ve rol kontrolü ile yönlendirme.
- **TailwindCSS:** Modern, responsive ve erişilebilir arayüz tasarımı.
- **SOLID Prensipleri:** Kodun sürdürülebilirliği için işlevler ayrıştırıldı.
- **12Factor Uyumlu:** Çevresel değişkenler .env dosyasında yönetildi, yapılandırma dışa aktarıldı.

## Kurulum Talimatları

1. **Bu projeyi klonlayın:**
```bash
git clone https://github.com/turksevenalperen/next-auth.git
cd next-auth
```

2. **.env.example dosyasını .env olarak kopyalayın ve kendi Auth0 bilgilerinizle doldurun:**
```env
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
AUTH0_DOMAIN=...
AUTH0_ISSUER=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

3. **Bağımlılıkları yükleyin:**
```bash
npm install
```

4. **Geliştirme ortamını başlatın:**
```bash
npm run dev
```

5. **Tarayıcıdan erişin:** http://localhost:3000

##  Test Süiti

Proje, kapsamlı bir test süiti ile geliştirilmiştir. Jest ve React Testing Library kullanılarak birim testleri yazılmıştır.

### Test Yapısı
- **Component Testleri:** Tüm React bileşenleri için birim testleri
- **Form Validasyon Testleri:** Giriş, kayıt ve şifre sıfırlama formları
- **Authentication Flow Testleri:** Kimlik doğrulama akışları
- **Role-Based Access Testleri:** Rol tabanlı erişim kontrolü testleri

### Test Dosyaları
```
src/
├── components/
│   ├── LoginForm.test.tsx        # Giriş formu testleri
│   ├── AdminPanel.test.tsx       # Admin paneli testleri
│   └── Dashboard.test.tsx        # Dashboard testleri
└── app/
    ├── signup/
    │   └── page.test.tsx         # Kayıt sayfası testleri
    └── forgot-password/
        └── page.test.tsx         # Şifre sıfırlama testleri
```

### Testleri Çalıştırma
```bash
# Tüm testleri çalıştır
npm run test

### Test Kapsamı
-  Form validasyonları
-  Authentication akışları
-  Error handling
-  Success/failure scenarios
-  User interactions
-  Role-based redirections

##  Validasyon ve Güvenlik
- Giriş ve kayıt formlarında anlık hata kontrolü
- Middleware ile kullanıcıların rol bazlı erişim kontrolü
- Başarılı ve hatalı işlemlerde kullanıcıya anlamlı geri bildirimler
- JWT token güvenliği ve session yönetimi
- CSRF koruması
- XSS koruması

##  Ekran Görüntüleri
![image](https://github.com/user-attachments/assets/d6daf44a-1de8-4eb0-919a-3513ff60d684)
![image](https://github.com/user-attachments/assets/51ac5517-e55c-41ee-a991-27d71b02a34b)
![image](https://github.com/user-attachments/assets/df37877c-f952-4c83-bc67-6173dcf88d48)
![image](https://github.com/user-attachments/assets/49d11cd1-4f63-497e-bcfb-3baf5dc91b99)
![image](https://github.com/user-attachments/assets/05d98a01-ce75-4654-a9df-34e10177c849)
![image](https://github.com/user-attachments/assets/d50d12b3-ed3e-458b-af7e-1f731775368c)
![image](https://github.com/user-attachments/assets/e63068d4-3055-400d-a64b-6facfeb67e3f)
![image](https://github.com/user-attachments/assets/54eb02d0-f4e0-40ee-823a-59a3ad639f11)











##  Teknolojiler
- Next.js 14
- NextAuth.js
- Auth0
- TypeScript
- TailwindCSS
- Jest
- React Testing Library
- ESLint
- Prettier

