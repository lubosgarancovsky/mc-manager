import { Button, ButtonGroup } from "@nextui-org/button";
import React from "react";
import { PlayIcon } from "../../icons";
import useGameRunner from "./use-game-runner";

interface GameRunnerProps {}

const GameRunner: React.FC<GameRunnerProps> = ({}) => {
  const { fileName, run, save } = useGameRunner();

  return (
    <ButtonGroup>
      <Button onClick={save}>{fileName || "Select executable..."}</Button>
      <Button isIconOnly color="success" isDisabled={!fileName} onPress={run}>
        <PlayIcon className="w-3" />
      </Button>
    </ButtonGroup>
  );
};

export default GameRunner;
