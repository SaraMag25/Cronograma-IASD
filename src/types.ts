export type Cargos = 'cantico' | 'plataforma' | 'plataforma2' | 'sermao' | 'mensagem' | 'mensagem2' | 'rec' | 'rec2' | 'ofertas1' | 'ofertas2';

export interface EscalaDoDia {
  cantico: string;
  plataforma: string;
  plataforma2?: string;
  sermao: string;
  mensagem: string;
  mensagem2?: string;
  rec: string;
  rec2?: string;
  ofertas1: string;
  ofertas2?: string;
}