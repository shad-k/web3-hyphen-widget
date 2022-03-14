import React from "react";
import { Hyphen } from "@biconomy/hyphen";
import { Options } from "@biconomy/hyphen/dist/types";

const useHyphenBridge = (
  provider: unknown,
  options: Options = {
    debug: true, // If 'true', it prints debug logs on console window
    environment: "test", // It can be "test" or "prod"
  }
): Hyphen | undefined => {
  const [hyphenObject, setHyphenObject] = React.useState<Hyphen>();
  React.useEffect(() => {
    const hyphen = new Hyphen(provider, options);
    (async () => {
      await hyphen.init();
      console.log("Tokens", hyphen.getSupportedTokens(1));
      setHyphenObject(hyphen);
    })();
  }, [options, provider]);
  return hyphenObject;
};

export default useHyphenBridge;
