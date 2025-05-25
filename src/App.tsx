import { useState, useEffect } from "react";

interface Item {
  kebutuhan: string;
  qty: number;
  satuan: string;
  harga: number;
}

const barangPerKategori: Record<string, Item[]> = {
  "BELANJA YOGYA": [
    { kebutuhan: "Beras Fortune 5kg", qty: 1, satuan: "Pcs", harga: 74500 },
    { kebutuhan: "Minyak Sunco 2 Liter", qty: 1, satuan: "Pcs", harga: 39500 },
    { kebutuhan: "Indomie Ayam Bawang", qty: 1, satuan: "Pcs", harga: 2950 },
    { kebutuhan: "Indomie Goreng", qty: 1, satuan: "Pcs", harga: 3050 },
    {
      kebutuhan: "Tepung Terigu Bogasari Segitiga  Biru 1Kg",
      qty: 1,
      satuan: "Pcs",
      harga: 12950,
    },
    { kebutuhan: "Margarin Forvita 200gr", qty: 1, satuan: "Pcs", harga: 6950 },
    {
      kebutuhan: "Santan Sasa Kelapa Cair 65 ml",
      qty: 1,
      satuan: "Pcs",
      harga: 5300,
    },
    { kebutuhan: "Masako Ayam", qty: 1, satuan: "Pcs", harga: 10400 },
    {
      kebutuhan: "Promina Cruncies Keju 20gr",
      qty: 1,
      satuan: "Pcs",
      harga: 9000,
    },
    {
      kebutuhan: "Promina Sily Puding 100gr",
      qty: 1,
      satuan: "Pcs",
      harga: 15250,
    },
    {
      kebutuhan: "Susu Ultra Milk Full Cream 1 Lt",
      qty: 1,
      satuan: "Pcs",
      harga: 19000,
    },
    {
      kebutuhan: "Susu Ultra Milk Chocolate 1Lt",
      qty: 1,
      satuan: "Pcs",
      harga: 19000,
    },
    {
      kebutuhan: "Susu Ultra Milk Mimi Cokelat 125",
      qty: 1,
      satuan: "Pcs",
      harga: 3400,
    },
    {
      kebutuhan: "Telur Ayam Negeri Timbangan 1kg",
      qty: 1,
      satuan: "kg",
      harga: 26250,
    },
    { kebutuhan: "Ayam Broiler Utuh", qty: 1, satuan: "ekor", harga: 29500 },
    { kebutuhan: "Ayam Paha Fillet  /gram", qty: 1, satuan: "gram", harga: 55 },
    { kebutuhan: "Udang Peci /gram", qty: 1, satuan: "gram", harga: 167 },
    {
      kebutuhan: "Sabun Biore Guard Active 800ML",
      qty: 1,
      satuan: "Pcs",
      harga: 36900,
    },
    {
      kebutuhan: "Tisu Nice Facial Tissue 1000G",
      qty: 1,
      satuan: "Pcs",
      harga: 40900,
    },
    {
      kebutuhan: "Pasta Gigi Sensodyne Repair 100g",
      qty: 1,
      satuan: "Pcs",
      harga: 25000,
    },
    {
      kebutuhan: "Pewangi So Klin Pewangi Hijab 1.7LT",
      qty: 1,
      satuan: "Pcs",
      harga: 18900,
    },
    {
      kebutuhan: "Sabun Cuci Piring Mama Lime 1500ML",
      qty: 1,
      satuan: "Pcs",
      harga: 22900,
    },
    {
      kebutuhan: "Shampo Zinc Men Active Cool 6x12ml",
      qty: 1,
      satuan: "Pcs",
      harga: 2900,
    },
    {
      kebutuhan: "Shampo Rudy Hair Loss Shampoo Ginseng",
      qty: 1,
      satuan: "Pcs",
      harga: 40350,
    },
  ],
  TOKOPEDIA: [
    {
      kebutuhan: "Moell Shampo Bayi 185gr",
      qty: 1,
      satuan: "Pcs",
      harga: 65000,
    },
    { kebutuhan: "Moell Body Wash 185gr", qty: 1, satuan: "Pcs", harga: 60000 },
  ],
  ALFAMART: [
    { kebutuhan: "Ron 88 Galon", qty: 1, satuan: "Galon", harga: 19500 },
    {
      kebutuhan: "So Klin Matic Professional Deterjen Cair 4.5 L",
      qty: 1,
      satuan: "Pcs",
      harga: 62900,
    },
  ],
  "OTTEN COFFEE": [
    { kebutuhan: "Crema Espresso 500gr", qty: 1, satuan: "Pcs", harga: 135000 },
  ],
  WARUNG: [
    { kebutuhan: "Bawang Merah", qty: 1, satuan: "Gram", harga: 42 },
    { kebutuhan: "Bawang Putih", qty: 1, satuan: "Gram", harga: 44 },
    { kebutuhan: "Kol/Kubis", qty: 1, satuan: "Gram", harga: 9 },
    { kebutuhan: "Gas 3kg", qty: 1, satuan: "Tabung", harga: 23000 },
  ],
  Operasional: [
    { kebutuhan: "Pulsa", qty: 1, satuan: "Unit", harga: 50000 },
    {
      kebutuhan: "Bensin Pertamax /liter",
      qty: 1,
      satuan: "liter",
      harga: 12400,
    },
  ],
};

function App() {
  const kategoriList = Object.keys(barangPerKategori);
  const [selectedKategori, setSelectedKategori] = useState(kategoriList[0]);
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({
    kebutuhan: "",
    qty: 1,
    satuan: "Pcs",
    harga: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "qty" || name === "harga" ? Number(value) : value,
    });
  };

  const addItem = () => {
    if (!form.kebutuhan || form.qty <= 0 || form.harga <= 0) return;

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = form;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems([...items, form]);
    }

    setForm({ kebutuhan: "", qty: 1, satuan: "Pcs", harga: 0 });
  };

  const addFromList = (item: Item) => {
    setItems([...items, item]);
  };

  const editItem = (index: number) => {
    setForm(items[index]);
    setEditingIndex(index);
  };

  const deleteItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    if (editingIndex === index) {
      setForm({ kebutuhan: "", qty: 1, satuan: "Pcs", harga: 0 });
      setEditingIndex(null);
    }
  };

  const clearData = () => {
    setItems([]);
    localStorage.removeItem("items");
  };

  const total = items.reduce((sum, item) => sum + item.qty * item.harga, 0);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        KALKULATOR BELANJA
      </h1>

      {/* PILIH BARANG PER KATEGORI */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Pilih Barang Cepat:</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-2">
          {kategoriList.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setSelectedKategori(kategori)}
              className={`px-3 py-1 rounded text-sm ${
                selectedKategori === kategori
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-gray-300"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>

        {/* Buttons per kategori */}
        <div className="flex flex-wrap gap-2">
          {barangPerKategori[selectedKategori].map((item, index) => (
            <button
              key={index}
              onClick={() => addFromList(item)}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm"
            >
              {item.kebutuhan} - Rp{item.harga.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* FORM MANUAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mb-4">
        <input
          name="kebutuhan"
          placeholder="Kebutuhan"
          value={form.kebutuhan}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="qty"
          type="number"
          placeholder="Qty"
          value={form.qty}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="satuan"
          placeholder="Satuan"
          value={form.satuan}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="harga"
          type="number"
          placeholder="Harga"
          value={form.harga}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addItem}
          className="bg-blue-600 text-white rounded px-4 py-2 col-span-1 sm:col-span-2 md:col-span-2"
        >
          {editingIndex !== null ? "Simpan Perubahan" : "Tambah Manual"}
        </button>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Kebutuhan</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Satuan</th>
              <th className="border px-2 py-1">Harga</th>
              <th className="border px-2 py-1">Jumlah</th>
              <th className="border px-2 py-1 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1">{item.kebutuhan}</td>
                <td className="border px-2 py-1 text-center">{item.qty}</td>
                <td className="border px-2 py-1 text-center">{item.satuan}</td>
                <td className="border px-2 py-1 text-right">
                  Rp{item.harga.toLocaleString()}
                </td>
                <td className="border px-2 py-1 text-right">
                  Rp{(item.qty * item.harga).toLocaleString()}
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => editItem(i)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(i)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-100">
              <td colSpan={5} className="border px-2 py-1 text-right">
                Total
              </td>
              <td className="border px-2 py-1 text-right" colSpan={2}>
                Rp{total.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* CLEAR DATA */}
      <div className="mt-4 text-center">
        <button
          onClick={clearData}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Hapus Semua Data
        </button>
      </div>
    </div>
  );
}

export default App;
