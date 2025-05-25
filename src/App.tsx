import { useState } from "react";

interface Item {
  kebutuhan: string;
  qty: number;
  satuan: string;
  harga: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({
    kebutuhan: "",
    qty: 1,
    satuan: "Pcs",
    harga: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const total = items.reduce((sum, item) => sum + item.qty * item.harga, 0);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Rencana Pengeluaran 1 Bulan
      </h1>

      {/* Form */}
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
          {editingIndex !== null ? "Simpan Perubahan" : "Tambah"}
        </button>
      </div>

      {/* Tabel */}
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
    </div>
  );
}

export default App;
