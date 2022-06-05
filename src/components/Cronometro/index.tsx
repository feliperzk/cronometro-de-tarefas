import { useEffect, useState } from "react";
import { tempoParaSegundos } from "../../common/utils/time";
import { ITarefa } from "../../types/tarefa";
import Botao from "../Botao";
import style from "./Cronometro.module.scss";
import Relogio from "./Relogio";

interface Props {
  selecionado: ITarefa | undefined;
  finalizarTarefa: () => void;
}

const audio = new Audio(
  "https://www.myinstants.com/media/sounds/foguete-apito-sound-effect_K7vsiIT.mp3"
);

const start = () => {
  audio.play();
};


export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if (selecionado?.tempo) {
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado]);

  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1);
        return regressiva(contador - 1);
      }
      finalizarTarefa();
      start();
    }, 1000);
  }
 

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}> Escolha uma tarefa e inicie o cronômetro </p>
      Tempo restante: {tempo} segundos.
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo} />
      </div>
      <Botao onClick={() => regressiva(tempo)}>Começar!</Botao>
    </div>
  );
}
