import { EscalaDoDia } from '../types';

interface CartaoDiaProps {
  data: string;
  escala: EscalaDoDia;
  selecionado: boolean;
  aoClicar: () => void;
}

export const CartaoDia = ({ data, escala, selecionado, aoClicar }: CartaoDiaProps) => {
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