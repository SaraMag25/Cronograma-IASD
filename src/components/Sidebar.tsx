import { Cargos, EscalaDoDia } from '../types';

interface SidebarProps {
  menuAberto: boolean;
  setMenuAberto: (aberto: boolean) => void;
  mesSelecionado: number;
  setMesSelecionado: (mes: number) => void;
  anoSelecionado: number;
  setAnoSelecionado: (ano: number) => void;
  corTema: string;
  setCorTema: (cor: string) => void;
  informacoesCustomizadas: string;
  setInformacoesCustomizadas: (info: string) => void;
  sortearVersiculo: () => void;
  diaSelecionado: string | null;
  setDiaSelecionado: (dia: string | null) => void;
  diasDoMes: {
    quartas: string[];
    sabados: string[];
    domingos: string[];
  };
  obterEscalaDoDia: (data: string) => EscalaDoDia;
  atualizarEscala: (cargo: Cargos, nome: string) => void;
  atualizarStatusCulto: (isCancelado: boolean, motivo: string) => void;
  exportarImagem: () => void;
  apagarTodosOsDados: () => void;
  nomesDosMeses: string[];
}

export const Sidebar = ({
  menuAberto,
  setMenuAberto,
  mesSelecionado,
  setMesSelecionado,
  anoSelecionado,
  setAnoSelecionado,
  corTema,
  setCorTema,
  informacoesCustomizadas,
  setInformacoesCustomizadas,
  sortearVersiculo,
  diaSelecionado,
  setDiaSelecionado,
  diasDoMes,
  obterEscalaDoDia,
  atualizarEscala,
  atualizarStatusCulto,
  exportarImagem,
  apagarTodosOsDados,
  nomesDosMeses,
}: SidebarProps) => {
  const diaEhSabado = diaSelecionado ? diasDoMes.sabados.includes(diaSelecionado) : false;
  const escalaAtual = diaSelecionado ? obterEscalaDoDia(diaSelecionado) : null;
  const isCancelado = escalaAtual?.isCultoCancelado || false;
  const motivoCancelamento = escalaAtual?.motivoCancelamento || '';

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`print:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200 flex flex-col ${
        menuAberto ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
        <h2 className="text-lg font-bold tracking-wide">Configurações</h2>
        <button onClick={() => setMenuAberto(false)} className="text-slate-300 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 font-sans flex flex-col gap-6 overflow-y-auto pb-20">
        <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
          <label className="flex flex-col gap-1.5 font-semibold text-xs text-gray-700 uppercase tracking-wider">
            Mês
            <select value={mesSelecionado} onChange={(e) => setMesSelecionado(Number(e.target.value))} className="border border-gray-300 rounded-lg p-2.5 text-sm bg-white text-gray-900 font-normal outline-none focus:border-blue-600 transition-colors">
              {nomesDosMeses.map((nome, index) => <option key={index} value={index}>{nome}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 font-semibold text-xs text-gray-700 uppercase tracking-wider">
            Ano
            <input type="number" value={anoSelecionado} onChange={(e) => setAnoSelecionado(Number(e.target.value))} className="border border-gray-300 rounded-lg p-2.5 text-sm bg-white text-gray-900 font-normal outline-none focus:border-blue-600 transition-colors"/>
          </label>
          <label className="flex flex-col gap-1.5 font-semibold text-xs text-gray-700 uppercase tracking-wider">
            Cor do Cabeçalho
            <div className="flex gap-3 items-center mt-1">
              <input 
                type="color" 
                value={corTema} 
                onChange={(e) => setCorTema(e.target.value)} 
                className="w-9 h-9 border border-gray-300 rounded-lg cursor-pointer bg-transparent"
              />
              <span className="text-xs text-gray-500 font-normal">Personalizar cor do topo</span>
            </div>
          </label>

          <label className="flex flex-col gap-1.5 font-semibold text-xs text-gray-700 uppercase tracking-wider mt-2">
            Avisos / Versículo
            <textarea 
              value={informacoesCustomizadas}
              onChange={(e) => setInformacoesCustomizadas(e.target.value)}
              placeholder="Escreva um aviso ou sorteie um versículo..."
              rows={3}
              className="border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 font-normal outline-none focus:border-blue-600 transition-colors resize-none"
            />
          </label>
          <button 
            onClick={sortearVersiculo}
            className="bg-slate-800 text-white font-medium py-2 px-3 rounded-lg text-xs hover:bg-slate-700 transition-all shadow-sm flex justify-center items-center"
          >
            Sortear Versículo Bíblico
          </button>
        </div>

        <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
          {!diaSelecionado ? (
            <div className="bg-slate-50 py-4 px-4 rounded-lg border border-dashed border-slate-300 text-center">
              <span className="text-slate-600 font-medium text-xs leading-relaxed block">
                Clique em um dia no cronograma para adicionar os membros.
              </span>
            </div>
          ) : (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                <h3 className="font-bold text-base text-blue-900">{diaSelecionado}</h3>
                <button onClick={() => setDiaSelecionado(null)} className="text-xs bg-white text-red-600 font-semibold px-2.5 py-1 rounded-md border border-red-200 hover:bg-red-50 transition-colors">
                  Desmarcar
                </button>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-red-800 bg-red-100 p-2 rounded-lg border border-red-300 cursor-pointer hover:bg-red-200 transition-colors">
                <input 
                  type="checkbox"
                  checked={isCancelado}
                  onChange={(e) => atualizarStatusCulto(e.target.checked, motivoCancelamento)}
                  className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
                />
                Dia sem culto / Data especial
              </label>

              {isCancelado && (
                <label className="flex flex-col gap-1 text-xs font-semibold text-gray-700 mt-1 mb-2">
                  Motivo / Título do Evento:
                  <input 
                    value={motivoCancelamento}
                    onChange={(e) => atualizarStatusCulto(isCancelado, e.target.value)}
                    placeholder="Ex: Fim de semana da família"
                    className="border border-red-300 rounded-lg p-2 text-xs bg-white font-bold text-red-700 outline-none focus:border-red-600 transition-colors"
                  />
                </label>
              )}
              
              {!isCancelado && ([] as Cargos[]).concat(
                ['cantico', 'plataforma', 'plataforma2', 'sermao', 'mensagem', 'mensagem2', 'rec', 'rec2', 'ofertas1'],
                diaEhSabado ? ['ofertas2'] : [] 
              ).map((cargo) => {
                let rotulo = cargo.charAt(0).toUpperCase() + cargo.slice(1);
                if (cargo === 'cantico') rotulo = 'S. de Cântico';
                if (cargo === 'plataforma') rotulo = 'Plataforma (Pessoa 1)';
                if (cargo === 'plataforma2') rotulo = 'Plataforma (Pessoa 2)';
                if (cargo === 'mensagem') rotulo = 'Mensagem Especial (Pessoa 1)';
                if (cargo === 'mensagem2') rotulo = 'Mensagem Especial (Pessoa 2)';
                if (cargo === 'rec') rotulo = 'Recepção (Pessoa 1)';
                if (cargo === 'rec2') rotulo = 'Recepção (Pessoa 2)';
                if (cargo === 'ofertas1') rotulo = diaEhSabado ? 'Ofertas (Pessoa 1)' : 'Ofertas';
                if (cargo === 'ofertas2') rotulo = 'Ofertas (Pessoa 2)';

                return (
                  <label key={cargo} className="flex flex-col gap-1 text-xs font-semibold text-gray-700">
                    {rotulo}:
                    <input 
                      list="lista-membros"
                      value={escalaAtual ? escalaAtual[cargo] : ''} 
                      onChange={(e) => atualizarEscala(cargo, e.target.value)}
                      placeholder="Pesquisar membro..."
                      className="border border-gray-300 rounded-lg p-2 text-xs bg-white font-normal outline-none focus:border-blue-600 transition-colors"
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider text-center">Ações</h3>
          <button 
            onClick={exportarImagem}
            className="bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-sm flex justify-center items-center text-xs"
          >
            Exportar em Imagem
          </button>

          <button 
            onClick={apagarTodosOsDados}
            className="mt-2 bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-sm flex justify-center items-center text-xs"
          >
            Apagar Todos os Dados
          </button>
        </div>
      </div>
    </div>
  );
};