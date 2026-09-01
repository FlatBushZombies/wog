const locks = new Set<string>();
let savedScrollY = 0;

function setLenisLocked(locked: boolean) {
  window.dispatchEvent(new CustomEvent("dmwog:scroll-lock", { detail: locked }));
}

export function lockScroll(key: string) {
  if (typeof document === "undefined") return;
  if (locks.size === 0) {
    savedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    setLenisLocked(true);
  }
  locks.add(key);
}

export function unlockScroll(key: string) {
  if (typeof document === "undefined") return;
  locks.delete(key);
  if (locks.size === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, savedScrollY);
    setLenisLocked(false);
  }
}
