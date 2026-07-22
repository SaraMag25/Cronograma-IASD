import { useState, useMemo, useEffect } from 'react';
import { listaDeMembros } from './membros';
import { versiculosBiblicos } from './versiculos';
import html2canvas from 'html2canvas-pro';
import { Cargos, EscalaDoDia } from './types';
import { CartaoDia } from './components/CartaoDia';
import { Sidebar } from './components/Sidebar';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);

  const [mesSelecionado, setMesSelecionado] = useState(() => Number(localStorage.getItem('mesSelecionado')) || 6);
  const [anoSelecionado, setAnoSelecionado] = useState(() => Number(localStorage.getItem('anoSelecionado')) || 2026);
  const [corTema, setCorTema] = useState(() => localStorage.getItem('corTema') || '#c2dceb');
  const [informacoesCustomizadas, setInformacoesCustomizadas] = useState(() => localStorage.getItem('informacoesCustomizadas') || '');
  
  const [escalas, setEscalas] = useState<Record<string, EscalaDoDia>>(() => {
    const dadosSalvos = localStorage.getItem('escalas');
    return dadosSalvos ? JSON.parse(dadosSalvos) : {};
  });

  useEffect(() => localStorage.setItem('mesSelecionado', mesSelecionado.toString()), [mesSelecionado]);
  useEffect(() => localStorage.setItem('anoSelecionado', anoSelecionado.toString()), [anoSelecionado]);
  useEffect(() => localStorage.setItem('corTema', corTema), [corTema]);
  useEffect(() => localStorage.setItem('informacoesCustomizadas', informacoesCustomizadas), [informacoesCustomizadas]);
  useEffect(() => localStorage.setItem('escalas', JSON.stringify(escalas)), [escalas]);

  const nomesDosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const sortearVersiculo = () => {
    const indiceAleatorio = Math.floor(Math.random() * versiculosBiblicos.length);
    setInformacoesCustomizadas(versiculosBiblicos[indiceAleatorio]);
  };

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
    setTimeout(() => setErro(null), 5000);
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

  const exportarImagem = async () => {
    setDiaSelecionado(null); 
    setMenuAberto(false);  
    
    setTimeout(async () => {
      const elemento = document.getElementById('folha-cronograma');
      if (!elemento) return;

      const canvas = await html2canvas(elemento, { 
        scale: 2,
        useCORS: true 
      });
      
      const dataURL = canvas.toDataURL('image/png');
      const nomeDoArquivo = `Cronograma-${nomesDosMeses[mesSelecionado]}-${anoSelecionado}.png`;

      // @ts-ignore
      if (window.api && window.api.salvarImagem) {
        // @ts-ignore
        await window.api.salvarImagem(dataURL, nomeDoArquivo);
      } else {
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = nomeDoArquivo;
        link.click();
      }
    }, 400); 
  };

  const apagarTodosOsDados = () => {
    const confirmacao = window.confirm(
      "ATENÇÃO EXTREMA!\n\n" +
      "Você está prestes a APAGAR TODOS os dados deste aplicativo.\n" +
      "Isso inclui todas as escalas que você montou, avisos e configurações.\n\n" +
      "Tem certeza absoluta de que deseja continuar? Essa ação NÃO PODE ser desfeita!"
    );

    if (confirmacao) {
      localStorage.clear();
      setEscalas({});
      setInformacoesCustomizadas('');
      setDiaSelecionado(null);
      setCorTema('#c2dceb'); 
      mostrarErro("Todos os dados foram apagados com sucesso.");
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-300 flex overflow-x-hidden print:bg-white print:block"
      onClick={() => setDiaSelecionado(null)}
    >
      {erro && (
        <div className="print:hidden fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] bg-red-100 border-l-8 border-red-600 text-red-900 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-lg">Aviso</span>
            <span className="font-medium">{erro}</span>
          </div>
          <button onClick={() => setErro(null)} className="ml-4 font-bold text-xl hover:text-red-500 transition-colors">✕</button>
        </div>
      )}

      <datalist id="lista-membros">
        {listaDeMembros.map(nome => <option key={nome} value={nome} />)}
      </datalist>

      <button 
        onClick={(e) => { e.stopPropagation(); setMenuAberto(true); }}
        className={`print:hidden fixed top-6 left-6 z-40 p-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300 ${
          menuAberto ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-100 translate-x-0"
        }`}
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Sidebar 
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
        mesSelecionado={mesSelecionado}
        setMesSelecionado={setMesSelecionado}
        anoSelecionado={anoSelecionado}
        setAnoSelecionado={setAnoSelecionado}
        corTema={corTema}
        setCorTema={setCorTema}
        informacoesCustomizadas={informacoesCustomizadas}
        setInformacoesCustomizadas={setInformacoesCustomizadas}
        sortearVersiculo={sortearVersiculo}
        diaSelecionado={diaSelecionado}
        setDiaSelecionado={setDiaSelecionado}
        diasDoMes={diasDoMes}
        obterEscalaDoDia={obterEscalaDoDia}
        atualizarEscala={atualizarEscala}
        exportarImagem={exportarImagem}
        apagarTodosOsDados={apagarTodosOsDados}
        nomesDosMeses={nomesDosMeses}
      />

      <div 
        className={`flex-1 flex justify-center items-stretch p-4 md:p-8 transition-all duration-300 ease-in-out print:p-0 print:m-0 print:block ${
          menuAberto ? "ml-80" : "ml-0"
        }`}
      >
        <div className="w-full flex flex-col items-center">
          <div 
            id="folha-cronograma"
            onClick={(e) => e.stopPropagation()} 
            className="bg-white w-full flex-1 border-2 border-black shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print:border-2" 
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img 
                src="./logo.jpeg" 
                alt="" 
                className="w-[45%] opacity-15 object-contain" 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="border-b-2 border-black py-4 transition-colors duration-300 relative z-10" style={{ backgroundColor: corTema }}>
              <h1 className="text-[35px] xl:text-[45px] font-bold text-center text-black tracking-wide">Cronograma</h1>
            </div>

            <div className="grid grid-cols-3 flex-1 relative z-10">
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
                  
                  <div className="mt-8 text-red-600 font-bold text-[16px] xl:text-[18px] leading-tight pb-4 px-4 whitespace-pre-wrap">
                    {informacoesCustomizadas !== '' ? (
                      informacoesCustomizadas
                    ) : (
                      <>
                        Informações do mês de {nomesDosMeses[mesSelecionado]}:<br/>
                        (Escreva os avisos aqui ou clique em sortear versículo)
                      </>
                    )}
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