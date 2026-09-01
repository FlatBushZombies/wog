"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { lockScroll, unlockScroll } from "./scroll-lock";

export type ModalIntent = "prayer" | "visit" | "connect" | "info";

interface UiStateContextValue {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  isModalOpen: boolean;
  modalIntent: ModalIntent;
  openModal: (intent?: ModalIntent) => void;
  closeModal: () => void;
}

const UiStateContext = createContext<UiStateContextValue | null>(null);

export function UiStateProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState<ModalIntent>("prayer");

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    lockScroll("menu");
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    unlockScroll("menu");
  }, []);

  const openModal = useCallback((intent: ModalIntent = "prayer") => {
    setModalIntent(intent);
    setModalOpen(true);
    lockScroll("modal");
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    unlockScroll("modal");
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (isModalOpen) {
        closeModal();
      } else if (isMenuOpen) {
        closeMenu();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, isMenuOpen, closeModal, closeMenu]);

  return (
    <UiStateContext.Provider
      value={{ isMenuOpen, openMenu, closeMenu, isModalOpen, modalIntent, openModal, closeModal }}
    >
      {children}
    </UiStateContext.Provider>
  );
}

export function useUiState() {
  const ctx = useContext(UiStateContext);
  if (!ctx) throw new Error("useUiState must be used within UiStateProvider");
  return ctx;
}
