import { useEffect, useContext } from "react";
import api from "../externalAPI/api";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Banner } from "../helpers/banner";


export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id:
        "697067995643-6fmeuaii12jk2b2l8hfflh4m77vm5sde.apps.googleusercontent.com",
      callback: handleGoogleLogin
    });

    if (document.getElementById("google-btn").childElementCount === 0) {
      window.google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        {
          theme: "filled_blue",
          size: "large",
          width: "100%"
        }
      );
    }
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const { sub, email, name, picture } = decoded;

      const res = await api.post("/auth/google", {
        googleId: sub,
        email,
        name,
        avatar: picture
      });

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <section className="min-h-screen lg:grid lg:grid-cols-2">
      {/* LEFT - Banner + attractive background */}
      <div className="relative flex flex-col justify-center items-center p-8 overflow-hidden bg-green-500">
        <div className="relative z-10 max-w-md w-full mb-8">
          <Banner />
        </div>

        <h1 className="relative z-10 text-5xl font-bold mb-4 text-white text-center">
          HisabKisab
        </h1>
        <p className="relative z-10 text-lg text-white/90 text-center max-w-sm">
          Smart, Simple & Free Expense Sharing. Track who owes who, split
          expenses instantly, and visualize balances easily.
        </p>
      </div>


      {/* RIGHT - Register */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-sm bg-white rounded-xl p-10 shadow-lg text-center">
          <h2 className="text-3xl font-semibold mb-3 text-gray-900">
            Welcome Back!
          </h2>
          <p className="mb-8 text-gray-600">
            Sign in with Google to manage your groups & expenses
          </p>
          <div id="google-btn" />
          <p className="mt-8 text-sm text-gray-400">Powered by Google OAuth</p>
        </div>
      </div>
    </section>
  );
}

