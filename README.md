Next.js 14 + Auth0 + NextAuth.js Kimlik Doğrulama Projesi
Canlı Demo: https://next-auth-seven-lovat.vercel.app

Admin Giriş Bilgileri:
E-posta: admin@gmail.com
Şifre: Admin123,

Projenin Amacı
Bu proje, modern bir web uygulamasında kullanıcıların güvenli bir şekilde kayıt olması, giriş yapması, rollerine göre yönlendirilmesi ve erişim kontrollerinin sağlanması için geliştirilmiştir. Next.js 14 App Router mimarisi kullanılarak, hem klasik kullanıcı adı/şifre girişi. JWT tabanlı oturum yönetimi, şifre sıfırlama, rol bazlı yönlendirme ve sayfa koruma gibi birçok güvenlik özelliği entegre edilmiştir.

Temel Özellikler
Kayıt Ol (Signup): E-posta ve güçlü şifre ile kayıt. Şifre kuralları: büyük harf, küçük harf, sayı, özel karakter ve min. 8 karakter.

Giriş (Login): Hem klasik hem de Auth0 OAuth sağlayıcıları ile giriş yapılabilir.

Şifre Sıfırlama: E-posta üzerinden Auth0 API kullanılarak kullanıcıya şifre sıfırlama bağlantısı gönderilir.

Rol Bazlı Yetkilendirme: Kullanıcı rolüne göre /admin veya /dashboard sayfalarına yönlendirme.

Sayfa Koruma (Middleware): Oturumu olmayan kullanıcılar login sayfasına yönlendirilir. Rolü uymayan kullanıcılar /unauthorized sayfasına yönlendirilir.

JWT Tabanlı Oturum Yönetimi: Stateless, güvenli oturum kontrolü.

Form Validasyonu ve Bildirimler: Formlarda anlık geri bildirimler ve başarılı/hatalı işlemlerde kullanıcıya bilgi verilir.

Proje Mimarisi ve Yapısı
Next.js 14 App Router: Yeni dosya sistemi kullanılarak sayfalar ve API route’ları yapılandırıldı.

NextAuth.js + Auth0:  E-posta/şifre yöntemi ile kimlik doğrulama sağlandı.

Custom Hooks: useSignup, usePasswordValidation gibi özel hook’lar ile form validasyonu ve iş mantığı ayrıştırıldı.

Middleware: Sunucu tarafında oturum ve rol kontrolü ile yönlendirme.

TailwindCSS: Modern, responsive ve erişilebilir arayüz tasarımı.

SOLID Prensipleri: Kodun sürdürülebilirliği için işlevler ayrıştırıldı.

12Factor Uyumlu: Çevresel değişkenler .env dosyasında yönetildi, yapılandırma dışa aktarıldı.

Kurulum Talimatları
Bu projeyi klonlayın:


git clone https://github.com/turksevenalperen/next-auth.git
cd next-auth
.env.example dosyasını .env olarak kopyalayın ve kendi Auth0 bilgilerinizle doldurun:



AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
AUTH0_DOMAIN=...
AUTH0_ISSUER=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
Bağımlılıkları yükleyin:


npm install
Geliştirme ortamını başlatın:


npm run dev
Tarayıcıdan erişin: http://localhost:3000

🧪 Test ve Validasyon
Giriş ve kayıt formlarında anlık hata kontrolü.

Middleware ile kullanıcıların rol bazlı erişim kontrolü.

Başarılı ve hatalı işlemlerde kullanıcıya anlamlı geri bildirimler.


Ekran Görüntüleri 
![image](https://github.com/user-attachments/assets/1bc3c627-04c7-4645-9f15-fd564ecce2c0)
![image](https://github.com/user-attachments/assets/51fb5345-a457-4d1c-8563-fb23a6434ea4)
![image](https://github.com/user-attachments/assets/676320cd-3d27-4dec-aad5-ee79600a0115)









