import { EscalaDoDia } from '../types';

interface CartaoDiaProps {
  data: string;
  escala: EscalaDoDia;
  selecionado: boolean;
  aoClicar: () => void;
}

export const CartaoDia = ({ data, escala, selecionado, aoClicar }: CartaoDiaProps) => {
  const renderLinha = (label: string, valor: string) => (
    <div>
      <span className="font-bold text-black">{label}: </span>
      <span className="font-bold text-red-600">{valor}</span>
    </div>
  );

  return (
    <div
      onClick={aoClicar}
      className={`px-1 py-0.5 mb-1 cursor-pointer transition-all ${
        selecionado ? 'bg-blue-100 ring-2 ring-blue-500 rounded-sm' : 'hover:bg-gray-50'
      } text-[16px] leading-tight`} 
    >
      <div className="font-bold text-black">
        {data}
      </div>
      
      {renderLinha('S.de Cântico', escala.cantico)}
      {renderLinha('Plataforma', escala.plataforma)}
      {renderLinha('Sermão', escala.sermao)}
      {renderLinha('Mensagem especial', escala.mensagem)}

      <div className="flex flex-wrap gap-x-2">
        <div>
          <span className="font-bold text-black">Rec: </span>
          <span className="font-bold text-red-600">{escala.rec}</span>
        </div>
        
        <div className="ml-2">
          <span className="font-bold text-black">Ofertas: </span>
          <span className="font-bold text-red-600">
            {escala.ofertas1}
            {escala.ofertas2 ? `/ ${escala.ofertas2}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};