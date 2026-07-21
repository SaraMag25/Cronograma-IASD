import React, { useState, useMemo, useEffect } from 'react';
import { listaDeMembros } from './membros';


type Cargos = 'cantico' | 'plataforma' | 'sermao' | 'mensagem' | 'rec' | 'ofertas1' | 'ofertas2';

type EscalaDoDia = {
  [key in Cargos]: string;
};

interface CartaoDiaProps {
  data: string;
  escala: EscalaDoDia;
  selecionado: boolean;
  aoClicar: () => void;
}


const CartaoDia = ({ data, escala, selecionado, aoClicar }: CartaoDiaProps) => {
  const ofertasFormatadas = [escala.ofertas1, escala.ofertas2]
    .filter(nome => nome !== "")
    .join(' e ');

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation(); 
        aoClicar();
      }}
      className={`flex flex-col mb-6 xl:mb-10 text-[16px] xl:text-[18px] leading-snug p-2 rounded-lg cursor-pointer transition-all duration-300 ${
        selecionado 
          ? "border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105 bg-blue-50 print:border-none print:shadow-none print:scale-100 print:bg-transparent relative z-10" 
          : "border-4 border-transparent hover:bg-gray-100 print:border-none print:hover:bg-transparent"
      }`}
    >
      <span className="font-bold text-black mb-1">{data}</span>
      
      <div><span className="font-bold text-black">S.de Cântico: </span><span className="font-bold text-red-600">{escala.cantico}</span></div>
      <div><span className="font-bold text-black">Plataforma: </span><span className="font-bold text-red-600">{escala.plataforma}</span></div>
      <div><span className="font-bold text-black">Sermão: </span><span className="font-bold text-red-600">{escala.sermao}</span></div>
      <div><span className="font-bold text-black">Mensagem especial: </span><span className="font-bold text-red-600">{escala.mensagem}</span></div>
      
      <div className="flex gap-10 mt-1">
        <div><span className="font-bold text-black">Rec: </span><span className="font-bold text-red-600">{escala.rec}</span></div>
        <div><span className="font-bold text-black">Ofertas: </span><span className="font-bold text-red-600">{ofertasFormatadas}</span></div>
      </div>
    </div>
  );
};

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [mesSelecionado, setMesSelecionado] = useState(6);
  const [anoSelecionado, setAnoSelecionado] = useState(2026);
  
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [escalas, setEscalas] = useState<Record<string, EscalaDoDia>>({});
  
  const [erro, setErro] = useState<string | null>(null);

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

  const obterEscalaDoDia = (data: string): EscalaDoDia => {
    return escalas[data] || {
      cantico: '', plataforma: '', sermao: '', mensagem: '', rec: '', ofertas1: '', ofertas2: ''
    };
  };

  const diaEhSabado = diaSelecionado ? diasDoMes.sabados.includes(diaSelecionado) : false;

  const mostrarErro = (mensagem: string) => {
    setErro(mensagem);
    setTimeout(() => {
      setErro(null);
    }, 5000);
  };

  const atualizarEscala = (cargo: Cargos, nomeDoMembro: string) => {
    if (!diaSelecionado) return;

    const escalaAtual = obterEscalaDoDia(diaSelecionado);

    if (nomeDoMembro !== "") {
      const jaEscaladoEm = Object.entries(escalaAtual).find(
        ([cargoExistente, nomeEscalado]) => cargoExistente !== cargo && nomeEscalado === nomeDoMembro
      );

      if (jaEscaladoEm) {
        let nomeDoCargoExistente = jaEscaladoEm[0];
        if (nomeDoCargoExistente === 'ofertas1') nomeDoCargoExistente = diaEhSabado ? 'Ofertas (Pessoa 1)' : 'Ofertas';
        if (nomeDoCargoExistente === 'ofertas2') nomeDoCargoExistente = 'Ofertas (Pessoa 2)';
        if (nomeDoCargoExistente === 'cantico') nomeDoCargoExistente = 'S. de Cântico';
        if (nomeDoCargoExistente === 'rec') nomeDoCargoExistente = 'Recepção';
        
        mostrarErro(`${nomeDoMembro} já está na função de "${nomeDoCargoExistente}" neste dia. Escolha outra pessoa!`);
        return; 
      }
    }

    setEscalas({
      ...escalas,
      [diaSelecionado]: {
        ...escalaAtual,
        [cargo]: nomeDoMembro
      }
    });
  };

  const lidarComCliqueNoDia = (data: string) => {
    if (diaSelecionado === data) {
      setDiaSelecionado(null); 
    } else {
      setDiaSelecionado(data); 
      setMenuAberto(true);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-300 flex overflow-x-hidden print:bg-white print:block"
      onClick={() => setDiaSelecionado(null)}
    >

      {erro && (
        <div className="print:hidden fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] bg-red-100 border-l-8 border-red-600 text-red-900 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-[bounce_0.5s_ease-in-out]">
          <span className="text-3xl">⚠️</span>
          <div className="flex flex-col">
            <span className="font-black text-lg">Ação não permitida!</span>
            <span className="font-medium">{erro}</span>
          </div>
          <button onClick={() => setErro(null)} className="ml-4 font-black text-xl hover:text-red-500 transition-colors">
            ✕
          </button>
        </div>
      )}

      <datalist id="lista-membros">
        {listaDeMembros.map(nome => (
          <option key={nome} value={nome} />
        ))}
      </datalist>

      <button 
        onClick={(e) => { e.stopPropagation(); setMenuAberto(true); }}
        className={`print:hidden fixed top-6 left-6 z-40 p-3 bg-white border-2 border-black rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300 ${
          menuAberto ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-100 translate-x-0"
        }`}
      >
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div 
        onClick={(e) => e.stopPropagation()}
        className={`print:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r-2 border-black flex flex-col ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-blue-900 text-white p-5 flex justify-between items-center border-b-2 border-black">
          <h2 className="text-xl font-bold tracking-wide">Configurações</h2>
          <button onClick={() => setMenuAberto(false)} className="text-white hover:text-red-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 font-sans flex flex-col gap-6 overflow-y-auto pb-20">
          
          <div className="flex flex-col gap-4 pb-6 border-b-2 border-gray-200">
            <label className="flex flex-col gap-1 font-bold text-black">
              Mês:
              <select value={mesSelecionado} onChange={(e) => setMesSelecionado(Number(e.target.value))} className="border-2 border-gray-400 rounded p-2 outline-none">
                {nomesDosMeses.map((nome, index) => <option key={index} value={index}>{nome}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 font-bold text-black">
              Ano:
              <input type="number" value={anoSelecionado} onChange={(e) => setAnoSelecionado(Number(e.target.value))} className="border-2 border-gray-400 rounded p-2 outline-none"/>
            </label>
          </div>

          <div className="flex flex-col gap-4">
            {!diaSelecionado ? (
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400 text-center">
                <span className="text-yellow-800 font-bold">
                  👈 Clique em um dia no cronograma para adicionar os membros!
                </span>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-400 shadow-inner flex flex-col gap-4 relative">
                
                <div className="flex justify-between items-center border-b-2 border-blue-200 pb-2">
                  <h3 className="font-black text-xl text-blue-900">
                    {diaSelecionado}
                  </h3>
                  <button 
                    onClick={() => setDiaSelecionado(null)}
                    className="text-xs bg-red-100 text-red-700 font-bold px-2 py-1 rounded border border-red-300 hover:bg-red-200"
                  >
                    Desmarcar
                  </button>
                </div>

                {([] as Cargos[]).concat(
                  ['cantico', 'plataforma', 'sermao', 'mensagem', 'rec', 'ofertas1'],
                  diaEhSabado ? ['ofertas2'] : []
                ).map((cargo) => {
                  
                  let rotulo = cargo.charAt(0).toUpperCase() + cargo.slice(1);
                  if (cargo === 'cantico') rotulo = 'S. de Cântico';
                  if (cargo === 'rec') rotulo = 'Recepção';
                  if (cargo === 'ofertas1') rotulo = diaEhSabado ? 'Ofertas (Pessoa 1)' : 'Ofertas';
                  if (cargo === 'ofertas2') rotulo = 'Ofertas (Pessoa 2)';

                  return (
                    <label key={cargo} className="flex flex-col gap-1 text-sm font-bold text-gray-800">
                      {rotulo}:
                      <input 
                        list="lista-membros"
                        value={obterEscalaDoDia(diaSelecionado)[cargo]} 
                        onChange={(e) => atualizarEscala(cargo, e.target.value)}
                        placeholder="Busque ou digite o nome..."
                        className="border-2 border-gray-400 rounded p-2 bg-white outline-none focus:border-blue-600 transition-colors"
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div 
        className={`flex-1 flex justify-center items-stretch p-4 md:p-8 transition-all duration-300 ease-in-out print:p-0 print:m-0 print:block ${
          menuAberto ? "ml-80" : "ml-0"
        }`}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full flex-1 border-2 border-black shadow-2xl flex flex-col print:shadow-none print:border-2" 
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          <div className="bg-[#c2dceb] border-b-2 border-black py-4">
            <h1 className="text-[35px] xl:text-[45px] font-bold text-center text-black tracking-wide">Cronograma</h1>
          </div>

          <div className="grid grid-cols-3 flex-1">
            <div className="border-r-2 border-black flex flex-col">
              <div className="border-b-2 border-black py-2 bg-gray-50"><h2 className="text-3xl font-bold text-center text-black">Quartas</h2></div>
              <div className="p-4 flex-1">
                {diasDoMes.quartas.map((data) => (
                  <CartaoDia key={data} data={data} escala={obterEscalaDoDia(data)} selecionado={diaSelecionado === data} aoClicar={() => lidarComCliqueNoDia(data)} />
                ))}
              </div>
            </div>

            <div className="border-r-2 border-black flex flex-col">
              <div className="border-b-2 border-black py-2 bg-gray-50"><h2 className="text-3xl font-bold text-center text-black">Sábados</h2></div>
              <div className="p-4 flex-1">
                {diasDoMes.sabados.map((data) => (
                  <CartaoDia key={data} data={data} escala={obterEscalaDoDia(data)} selecionado={diaSelecionado === data} aoClicar={() => lidarComCliqueNoDia(data)} />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border-b-2 border-black py-2 bg-gray-50"><h2 className="text-3xl font-bold text-center text-black">Domingos</h2></div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {diasDoMes.domingos.map((data) => (
                    <CartaoDia key={data} data={data} escala={obterEscalaDoDia(data)} selecionado={diaSelecionado === data} aoClicar={() => lidarComCliqueNoDia(data)} />
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
  );
}

export default App;