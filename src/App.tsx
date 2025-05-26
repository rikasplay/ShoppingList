import { useState, useEffect } from "react";

interface Item {
  kebutuhan: string;
  qty: number;
  satuan: string;
  harga: number;
}

interface HistoryEntry {
  timestamp: string;
  items: Item[];
}

const barangPerKategori: Record<string, Item[]> = {
  Yogya: [
    { kebutuhan: "Beras Fortune 5kg", qty: 1, satuan: "Pcs", harga: 74500 },
    { kebutuhan: "Minyak Sunco 2 Liter", qty: 1, satuan: "Pcs", harga: 39500 },
    { kebutuhan: "Indomie Ayam Bawang", qty: 1, satuan: "Pcs", harga: 2950 },
    { kebutuhan: "Indomie Goreng", qty: 1, satuan: "Pcs", harga: 3050 },
    {
      kebutuhan: "Tepung Terigu Bogasari Segitiga Biru 1Kg",
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
      kebutuhan: "Pewangi So Klin Pewangi Hijab 1.7LT",
      qty: 1,
      satuan: "Pcs",
      harga: 18900,
    },
  ],
  Warung: [{ kebutuhan: "Gas 3kg", qty: 1, satuan: "Tabung", harga: 23000 }],
};

function App() {
  const kategoriList = Object.keys(barangPerKategori);
  const [kategoriIndex, setKategoriIndex] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({
    kebutuhan: "",
    qty: 1,
    satuan: "Pcs",
    harga: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const selectedKategori = kategoriList[kategoriIndex];

  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) setItems(JSON.parse(saved));

    const savedHistory = localStorage.getItem("history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
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
    const newItems =
      editingIndex !== null
        ? items.map((item, i) => (i === editingIndex ? form : item))
        : [...items, form];
    setItems(newItems);
    setForm({ kebutuhan: "", qty: 1, satuan: "Pcs", harga: 0 });
    setEditingIndex(null);
  };

  const addFromList = (item: Item) => setItems([...items, item]);
  const editItem = (index: number) => {
    setForm(items[index]);
    setEditingIndex(index);
  };
  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
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

  const saveToHistory = () => {
    const timestamp = new Date().toLocaleString();
    const newHistory: HistoryEntry[] = [...history, { timestamp, items }];
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
    alert("Data berhasil disimpan ke riwayat!");
  };

  const loadHistory = (entry: HistoryEntry) => {
    setItems(entry.items);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-4">
        Shopping List <br />
        <span className="text-5xl">BELANJA.KU</span>
      </h1>

      <div className="flex justify-center items-center gap-2 mb-4">
        <button
          onClick={() =>
            setKategoriIndex(
              (kategoriIndex - 1 + kategoriList.length) % kategoriList.length
            )
          }
          className="bg-lime-400 px-4 py-2 rounded-full text-white font-bold text-xl"
        >
          &larr;
        </button>
        <span className="px-6 py-2 bg-white rounded-full shadow text-lg font-semibold">
          {selectedKategori}
        </span>
        <button
          onClick={() =>
            setKategoriIndex((kategoriIndex + 1) % kategoriList.length)
          }
          className="bg-lime-400 px-4 py-2 rounded-full text-white font-bold text-xl"
        >
          &rarr;
        </button>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full bg-white border border-gray-300">
          <thead className="bg-lime-300 text-left">
            <tr>
              <th className="p-2">Item Barang</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Satuan</th>
              <th className="p-2">Harga Satuan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {barangPerKategori[selectedKategori].map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.kebutuhan}</td>
                <td className="p-2">{item.qty}</td>
                <td className="p-2">{item.satuan}</td>
                <td className="p-2">Rp{item.harga.toLocaleString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => addFromList(item)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full text-lg font-bold"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <input
          name="kebutuhan"
          placeholder="Item Barang"
          value={form.kebutuhan}
          onChange={handleChange}
          className="p-2 rounded-full text-center w-48"
        />
        <input
          name="qty"
          type="number"
          value={form.qty}
          onChange={handleChange}
          className="p-2 rounded-full text-center w-20"
        />
        <input
          name="satuan"
          value={form.satuan}
          onChange={handleChange}
          className="p-2 rounded-full text-center w-20"
        />
        <input
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
          className="p-2 rounded-full text-center w-32"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold"
        >
          {editingIndex !== null ? "Simpan" : "Tambah Manual"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 mb-4">
          <thead className="bg-lime-300">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Item Barang</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Satuan</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 text-center">{i + 1}</td>
                <td className="p-2">{item.kebutuhan}</td>
                <td className="p-2 text-center">{item.qty}</td>
                <td className="p-2 text-center">{item.satuan}</td>
                <td className="p-2 text-right">
                  Rp{item.harga.toLocaleString()}
                </td>
                <td className="p-2 text-right">
                  Rp{(item.qty * item.harga).toLocaleString()}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => editItem(i)}
                    className="text-blue-500 font-semibold mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(i)}
                    className="text-red-500 font-semibold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td colSpan={5} className="p-2 text-right">
                Total
              </td>
              <td colSpan={2} className="p-2 text-right">
                Rp{total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={saveToHistory}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
        >
          Simpan Data
        </button>
        <button
          onClick={clearData}
          className="bg-red-500 text-white px-6 py-2 rounded-full font-bold"
        >
          Hapus Data
        </button>
        <button
          onClick={clearHistory}
          className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold"
        >
          Hapus Riwayat
        </button>
      </div>

      {/* Riwayat belanja */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-2">Riwayat Belanja</h2>
        {history.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <button
              onClick={() => loadHistory(entry)}
              className="underline text-blue-600 hover:text-blue-800"
            >
              {entry.timestamp} ({entry.items.length} item)
            </button>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-gray-500">Belum ada riwayat</p>
        )}
      </div>
    </div>
  );
}

export default App;
