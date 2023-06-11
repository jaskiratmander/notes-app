import NotesApp from "@/components/NotesApp";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const { userId } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!userId) {
      router.replace("/login");
    }
  });
  if (!userId) {
    return <center>Redirecting to Login page...</center>;
  } else return <NotesApp />;
};

export default HomePage;
