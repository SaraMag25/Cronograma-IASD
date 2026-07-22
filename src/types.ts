export type Cargos = 'cantico' | 'plataforma' | 'sermao' | 'mensagem' | 'rec' | 'ofertas1' | 'ofertas2';

export type EscalaDoDia = {
  [key in Cargos]: string;
};