import NotesApp from "@/components/NotesApp";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const { userId, setUserId, setUsername } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("current-user");
    if (!userId && !storedUser) {
      router.replace("/login");
    } else if (!userId && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUserId(parsedUser.id);
      setUsername(parsedUser.username);
    }
  });
  if (!userId) {
    return <center>Redirecting to Login page...</center>;
  } else return <NotesApp />;
};

export default HomePage;
