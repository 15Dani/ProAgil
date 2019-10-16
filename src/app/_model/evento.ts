import { RedeSocial } from './rede-social';
import { Lote } from './Lote';
import { Palestrante } from './Palestrante';

export interface Evento {
  id: number;
  local: string;
  dataEvneto: Date;
  tema: string;
  qtsPessoas: number;
  imagemURL: string;
  telefone: string;
  email: string;
  lotes: Lote[];
  redeSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];

}
