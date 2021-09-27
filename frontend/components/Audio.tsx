import { useEffect } from "react";
import { useAudio } from "react-use";
import styles from "../styles/Card.module.css";
import { BASE_URI } from "../lib/env";

type Props = {
  id: string;
};

export const Audio: React.FC<Props> = ({ id }) => {
  const [audio, state, controls] = useAudio({
    src: `${BASE_URI}/sounds/${parseInt(id)}`,
  });

  useEffect(() => {
    controls.volume(0.2);
  }, []);

  const onClick = () => {
    const { playing } = state;
    if (playing) {
      controls.pause();
    } else {
      controls.play();
    }
  };

  return (
    <button className={styles.svg} onClick={() => onClick()}>
      {audio}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        {state.playing ? (
          <path d="M31 12.41 29.59 11 26 14.59 22.41 11 21 12.41 24.59 16 21 19.59 22.41 21 26 17.41 29.59 21 31 19.59 27.41 16 31 12.41zM18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0 1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1ZM4 20h6a1.17 1.17 0 0 1 .79.3L17 26.57V5.43l-6.21 6.27a1.17 1.17 0 0 1-.79.3H4Z" />
        ) : (
          <>
            <path d="m27.16 8.08-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88Z" />
            <path d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59ZM18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0 1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1ZM4 20h6.08a1 1 0 0 1 .71.3L17 26.57V5.43l-6.21 6.27a1 1 0 0 1-.71.3H4Z" />
          </>
        )}
      </svg>
    </button>
  );
};
