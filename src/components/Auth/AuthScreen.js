import Link from "next/link";
import styles from "./AuthScreen.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const AuthScreenActions = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();
  const { loginUser, signupUser, userId } = useContext(AuthContext);
  if (userId) {
    router.replace("/");
  }
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (mode === "Login") loginUser(email, password);
    else signupUser(email, password, username);
  };

  return (
    <div className={styles["actions"]}>
      <h2>{mode}</h2>
      <form className={styles["auth_form"]} onSubmit={formSubmitHandler}>
        {mode === "Signup" && (
          <>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
          </>
        )}
        <label htmlFor="Email">Email</label>
        <input
          placeholder="Email"
          type="email"
          value={email}
          id="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor="Password">Password</label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button>{mode}</button>
      </form>
    </div>
  );
};

const AuthScreen = ({ mode }) => {
  const { isLoading, error, isSuccess } = useContext(AuthContext);
  return (
    <div className={styles["auth"]}>
      <AuthScreenActions mode={mode} />
      <div className={styles["info"]}>
        <h1>Ultra Notes</h1>
        <p>
          Unleash productivity with Ultra Notes: Capture, organize, and conquer
          your goals effortlessly with our intuitive app.
        </p>
        {mode === "Login" && (
          <>
            <span>Don&#39;t have an account yet? Create a new one:</span>
            <Link href={"/signup"}>
              <button>Signup</button>
            </Link>
          </>
        )}
        {mode === "Signup" && (
          <>
            <span>Already have an account? Login now:</span>
            <Link href={"/login"}>
              <button>Login</button>
            </Link>
          </>
        )}
        <p>
          Status: {isLoading && "Loading"} {error && error.message}{" "}
          {isSuccess && `${mode} successful!`}
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
