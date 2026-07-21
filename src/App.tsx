import React, { useState, useMemo } from 'react';

interface CartaoDiaProps {
  data: string;
  cantico: string;
  plataforma: string;
  sermao: string;
  mensagem: string;
  rec: string;
  ofertas?: string;
}

const CartaoDia = ({ data, cantico, plataforma, sermao, mensagem, rec, ofertas }: CartaoDiaProps) => {
  return (
    <div className="flex flex-col mb-6 xl:mb-10 text-[16px] xl:text-[18px] leading-snug">
      <span className="font-bold text-black mb-1">{data}</span>
      
      <div>
        <span className="font-bold text-black">S.de Cântico: </span> 
        <span className="font-bold text-red-600">{cantico}</span>
      </div>
      
      <div>
        <span className="font-bold text-black">Plataforma: </span> 
        <span className="font-bold text-red-600">{plataforma}</span>
      </div>
      
      <div>
        <span className="font-bold text-black">Sermão: </span> 
        <span className="font-bold text-red-600">{sermao}</span>
      </div>
      
      <div>
        <span className="font-bold text-black">Mensagem especial: </span> 
        <span className="font-bold text-red-600">{mensagem}</span>
      </div>
      
      <div className="flex gap-10 mt-1">
        <div>
          <span className="font-bold text-black">Rec: </span> 
          <span className="font-bold text-red-600">{rec}</span>
        </div>
        {ofertas !== undefined && (
          <div>
            <span className="font-bold text-black">Ofertas: </span> 
            <span className="font-bold text-red-600">{ofertas}</span>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  const [mesSelecionado, setMesSelecionado] = useState(6);
  const [anoSelecionado, setAnoSelecionado] = useState(2026);

  const nomesDosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const diasDoMes = useMemo(() => {
    const quartas: string[] = [];
    const sabados: string[] = [];
    const domingos: string[] = [];

    const quantidadeDeDias = new Date(anoSelecionado, mesSelecionado + 1, 0).getDate();

    for (let dia = 1; dia <= quantidadeDeDias; dia++) {
      const dataAtual = new Date(anoSelecionado, mesSelecionado, dia);
      const diaDaSemana = dataAtual.getDay();

      const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mesSelecionado + 1).padStart(2, '0')}/${anoSelecionado}`;

      if (diaDaSemana === 3) quartas.push(dataFormatada);
      if (diaDaSemana === 6) sabados.push(dataFormatada);
      if (diaDaSemana === 0) domingos.push(dataFormatada);
    }

    return { quartas, sabados, domingos };
  }, [mesSelecionado, anoSelecionado]);

  return (
    <div className="min-h-screen bg-gray-300 flex overflow-x-hidden print:bg-white print:block">
      

      <button 
        onClick={() => setMenuAberto(true)}
        className={`print:hidden fixed top-6 left-6 z-40 p-3 bg-white border-2 border-black rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300 ${
          menuAberto ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-100 translate-x-0"
        }`}
        title="Abrir Configurações"
      >
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div 
        className={`print:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r-2 border-black flex flex-col ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-blue-900 text-white p-5 flex justify-between items-center border-b-2 border-black">
          <h2 className="text-xl font-bold tracking-wide">Configurações</h2>
          <button 
            onClick={() => setMenuAberto(false)}
            className="text-white hover:text-red-400 transition-colors"
            title="Fechar Menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 font-sans flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 font-bold text-black text-lg">
              Mês:
              <select 
                value={mesSelecionado} 
                onChange={(e) => setMesSelecionado(Number(e.target.value))}
                className="border-2 border-gray-400 rounded-lg px-3 py-2 bg-gray-50 outline-none focus:border-blue-600 transition-colors"
              >
                {nomesDosMeses.map((nome, index) => (
                  <option key={index} value={index}>{nome}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 font-bold text-black text-lg">
              Ano:
              <input 
                type="number" 
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                className="border-2 border-gray-400 rounded-lg px-3 py-2 bg-gray-50 outline-none focus:border-blue-600 transition-colors"
              />
            </label>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 border-dashed text-center mt-4">
            <span className="text-blue-800 font-bold text-sm">
              Nas próximas etapas, as listas de membros entrarão aqui!
            </span>
          </div>
        </div>
      </div>

      <div 
        className={`flex-1 flex justify-center items-stretch p-4 md:p-8 transition-all duration-300 ease-in-out print:p-0 print:m-0 print:block ${
          menuAberto ? "ml-80" : "ml-0"
        }`}
      >
        <div className="w-full flex flex-col items-center">
          <div 
            className="bg-white w-full flex-1 border-2 border-black shadow-2xl flex flex-col print:shadow-none print:border-2"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <div className="bg-[#c2dceb] border-b-2 border-black py-4">
              <h1 className="text-[35px] xl:text-[45px] font-bold text-center text-black tracking-wide">
                Cronograma
              </h1>
            </div>

            <div className="grid grid-cols-3 flex-1">
              <div className="border-r-2 border-black flex flex-col">
                <div className="border-b-2 border-black py-2 bg-gray-50">
                  <h2 className="text-3xl font-bold text-center text-black">Quartas</h2>
                </div>
                <div className="p-4 flex-1">
                  {diasDoMes.quartas.map((data) => (
                    <CartaoDia key={data} data={data} cantico="" plataforma="" sermao="" mensagem="" rec="" ofertas="" />
                  ))}
                </div>
              </div>

              <div className="border-r-2 border-black flex flex-col">
                <div className="border-b-2 border-black py-2 bg-gray-50">
                  <h2 className="text-3xl font-bold text-center text-black">Sábados</h2>
                </div>
                <div className="p-4 flex-1">
                  {diasDoMes.sabados.map((data) => (
                    <CartaoDia key={data} data={data} cantico="" plataforma="" sermao="" mensagem="" rec="" ofertas="" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="border-b-2 border-black py-2 bg-gray-50">
                  <h2 className="text-3xl font-bold text-center text-black">Domingos</h2>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {diasDoMes.domingos.map((data) => (
                      <CartaoDia key={data} data={data} cantico="" plataforma="" sermao="" mensagem="" rec="" ofertas="" />
                    ))}
                  </div>
                  
                  <div className="mt-8 text-red-600 font-bold text-[18px] xl:text-[20px] leading-tight pb-4">
                    Informações do mês de {nomesDosMeses[mesSelecionado]}:<br/>
                    (Escreva os avisos aqui)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;