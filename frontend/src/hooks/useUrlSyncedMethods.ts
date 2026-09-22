import { useEffect, useState } from "react";

const PARAM = "m";
const DEFAULT_METHODS = ["SHA_256", "BASE_64"];

const readFromUrl = (): string[] => {
  const raw = new URLSearchParams(window.location.search).get(PARAM);
  if (!raw) return [];
  // No method name contains a comma, so a plain split is enough; trim() is
  // just tolerance for stray spaces in a hand-edited URL
  return raw.split(",").map((m) => m.trim()).filter(Boolean);
};

const writeToUrl = (methods: string[]) => {
  const params = new URLSearchParams(window.location.search);
  if (methods.length > 0) {
    // URLSearchParams already percent-encodes the whole value (spaces,
    // commas used as our separator, etc.) and decodes it back on read
    params.set(PARAM, methods.join(","));
  } else {
    params.delete(PARAM);
  }
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    query ? `?${query}` : window.location.pathname
  );
};

// selectedMethods, kept in sync with the "?m=" query param so a combination
// can be copied and shared as a link. `methods` is the full list the backend
// supports; it is used once, as soon as it loads, to drop any method a
// hand-edited URL might contain that doesn't actually exist.
export const useUrlSyncedMethods = (methods: string[]) => {
  const [selectedMethods, setSelectedMethods] = useState<string[]>(() => {
    const fromUrl = readFromUrl();
    return fromUrl.length > 0 ? fromUrl : DEFAULT_METHODS;
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (validated || methods.length === 0) return;
    setSelectedMethods((current) => current.filter((m) => methods.includes(m)));
    setValidated(true);
  }, [methods, validated]);

  useEffect(() => {
    writeToUrl(selectedMethods);
  }, [selectedMethods]);

  return [selectedMethods, setSelectedMethods] as const;
};
