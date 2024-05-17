import { page } from "@/stores/stores";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

interface SetPageProps {
  children: React.ReactNode;
}



export function SetPage({children} : SetPageProps) {
  const setCurrentPage = useSetAtom(page);

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, [window.location.pathname])
  
  return children;
}