export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Erişim Reddedildi 🚫
        </h1>
        <p className="text-gray-600">
          Bu sayfaya erişim yetkiniz bulunmamaktadır.
        </p>
      </div>
    </div>
  );
}
