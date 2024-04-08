import { page } from "@/stores/stores";
import { useSetAtom } from "jotai";

interface SetPageProps {
  children: React.ReactNode;
}



export function SetPage({children} : SetPageProps) {
  const setCurrentPage = useSetAtom(page);

  setCurrentPage(window.location.pathname);

  return children;
}