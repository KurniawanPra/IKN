export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient-primary mb-8">Syarat dan Ketentuan Layanan</h1>
        <div className="bg-white/80 backdrop-blur-lg rounded-lg p-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Penerimaan Syarat</h2>
          <p className="mb-4">
            Dengan mengakses dan menggunakan situs web Nusantara Rubber Industry, Anda menyetujui untuk terikat oleh syarat dan ketentuan layanan ini. Jika Anda tidak menyetujui salah satu syarat ini, silakan tidak menggunakan situs web kami.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Penggunaan Situs Web</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Anda berjanji untuk menggunakan situs web kami hanya untuk tujuan yang legal dan sesuai dengan syarat ini</li>
            <li>Anda tidak akan menggunakan situs web kami untuk menyebarkan konten yang ilegal, mengancam, memfitnah, atau melanggar hak kekayaan intelektual siapa pun</li>
            <li>Anda tidak akan mencoba mengganggu operasi teknis situs web kami atau mencoba mengakses area yang tidak diizinkan</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Pesanan dan Pembayaran</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Semua harga yang ditampilkan dalam mata uang Rupiah Indonesia (IDR) dan tidak termasuk pajak kecuali dinyatakan lain</li>
            <li>Pesanan dianggap diterima ketika kami mengirimkan konfirmasi pesanan melalui email</li>
            <li>Pembayaran dapat dilakukan melalui transfer bank, kartu kredit, atau metode pembayaran lain yang tersedia</li>
            <li>Kami berhak untuk mengubah harga tanpa pemberitahuan sebelumnya</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Pengiriman dan Pengantaran</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Pengiriman dilakukan sesuai dengan estimasi yang diberikan saat pemesanan</li>
            <li>Biaya pengiriman dihitung berdasarkan destinasi dan berat produk</li>
            <li>Kami tidak bertanggung jawab atas keterlatan pengiriman yang disebabkan oleh faktor di luar kendali kami seperti kondisi cuaca ekstrem atau hambatan lalu lintas</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Garansi dan Pengembalian</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Produk kami memiliki garansi standar sesuai dengan spesifikasi yang dijelaskan dalam deskripsi produk</li>
            <li>Pengembalian produk hanya diterima dalam kondisi tidak digunakan dan dalam kemasan asli dalam jangka waktu 7 hari setelah penerimaan</li>
            <li>Biaya pengiriman untuk pengembalian ditanggung oleh pelanggan kecuali produk yang diterima cacat atau tidak sesuai dengan pesanan</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Keterbatasan Tanggung Jawab</h2>
          <p className="mb-4">
            Nusantara Rubber Industry tidak bertanggung jawab atas kerugian langsung, indirekt, khusus, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan produk kami, termasuk tetapi tidak terbatas pada kerugian keuntungan, penggunaan, atau data.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Hukum yang Berlaku</h2>
          <p className="mb-4">
            Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Persengajaan yang timbul dari atau berhubungan dengan syarat ini akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
          </p>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </p>
        </div>
      </div>
    </section>
  );
}