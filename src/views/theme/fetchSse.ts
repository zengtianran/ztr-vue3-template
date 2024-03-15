import http from "@/utils/request";

export function useSse() {
  let ctrl: any;

  async function fetchEventSource(
    url: string,
    body: any,
    onmessage: (e: any) => void,
    onopen?: (e: any) => void,
    onerror?: (e: any) => void
  ) {
    ctrl = new AbortController();
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
      signal: ctrl.signal
    })
      .then((res) => {
        if (res.status === 200) {
          onopen && onopen(res);
          return res.body;
        }
      })
      .then((resp: any) => {
        const reader = resp.getReader();
        const push = () => {
          reader.read().then(({ done, value }: { done: boolean; value: ArrayBuffer }) => {
            if (done) {
              return;
            } else {
              onmessage && onmessage(new TextDecoder().decode(value));
              push();
            }
          });
        };
        return push();
      })
      .catch((e) => {
        onerror && onerror(e);
      });
  }

  function closeSse() {
    if (ctrl) {
      ctrl.abort();
      ctrl = null;
    }
  }

  return {
    ctrl,
    fetchEventSource,
    closeSse
  };
}
