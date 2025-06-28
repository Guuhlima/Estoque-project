import React from 'react';

interface Equipamento {
  id: number;
  equipamento: string;
  quantidade: number;
  data: string;
}

interface TableEquipamentosProps {
  data: Equipamento[];
}

const TableEquipamentos = ({ data }: TableEquipamentosProps) => {
  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Lista de Equipamentos</h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto border-collapse overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-semibold tracking-wide">ID</th>
              <th className="p-4 text-left text-sm font-semibold tracking-wide">Equipamento</th>
              <th className="p-4 text-left text-sm font-semibold tracking-wide">Quantidade</th>
              <th className="p-4 text-left text-sm font-semibold tracking-wide">Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 transition`}
              >
                <td className="p-4 text-sm text-gray-700 border-b">{item.id}</td>
                <td className="p-4 text-sm text-gray-700 border-b">{item.equipamento}</td>
                <td className="p-4 text-sm text-gray-700 border-b">{item.quantidade}</td>
                <td className="p-4 text-sm text-gray-700 border-b">{item.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEquipamentos;
