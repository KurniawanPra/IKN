export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient-primary mb-8">Kebijakan Privasi</h1>
        <div className="bg-white/80 backdrop-blur-lg rounded-lg p-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Pengantar</h2>
          <p className="mb-4">
            Nusantara Rubber Industry berkomitang untuk melindungi privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda mengunjungi situs web kami atau menggunakan layanan kami.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Informasi yang Kami Kumpulkan</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Informasi pribadi seperti nama, alamat email, nomor telepon, dan alamat kirim ketika Anda melakukan pendaftaran atau transaksi</li>
            <li>Informasi tentang penggunaan situs web kami termasuk alamat IP, jenis browser, dan halaman yang Anda kunjungi</li>
            <li>Informasi transaksi termasuk detail pembelian dan informasi pembayaran</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Penggunaan Informasi</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Untuk memproses dan mengirimkan pesanan Anda</li>
            <li>Untuk berkomunikasi dengan Anda mengenai pesanan, promo, dan update produk</li>
            <li>Untuk meningkatkan layanan dan pengalaman belanja Anda di situs web kami</li>
            <li>Untuk kepentingan hukum dan regulasi yang berlaku</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Perlindungan Informasi</h2>
          <p className="mb-4">
            Kami menggunakan berbagai langkah keamanan termasuk enkripsi SSL, firewall, dan prosedur keamanan fisik untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, atau pencurian.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Hak Anda</h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Hak untuk mengakses informasi pribadi yang kami simpan tentang Anda</li>
            <li>Hak untuk memperbaiki informasi yang tidak akurat atau tidak lengkap</li>
            <li>Hak untuk menghapus informasi pribadi Anda dari database kami</li>
            <li>Hak untuk menarik kembali persetujuan Anda untuk pemrosesan data tertentu</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-6">Perubahan Kebijakan Privasi</h2>
          <p className="mb-4">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui situs web kami dengan tanggal efektif yang diperbarui.
          </p>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </p>
        </div>
      </div>
    </section>
  );
}