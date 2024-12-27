import React, { useEffect, useState } from "react";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { useNavigate } from "react-router-dom";
import { getTelegramUser } from "../../utils/CommonMethods";

const WelCome: React.FC = () => {
  const [telegramUser, setTelegramUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [responseToken, setResponseToken] = useState<any | null>(null);
  const { login } = UseNetworkCalls();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTelegramUser = async () => {
      try {
        const user = getTelegramUser();
        if (user) {
          setTelegramUser(user);
          const response = await login({ telegram_id: user.id });
          // const response = await login({ telegram_id: 1552001035 });
          if (response.token) {
            localStorage.setItem("token", response.token);
            setResponseToken(response); // save JWT token in state
            navigate("/home");
          }
        } else {
          throw new Error("Telegram User data not found");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error initializing Telegram WebApp:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTelegramUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome to the Telegram WebApp</h1>
      {telegramUser ? (
        <div>
          <p>
            <strong>ID:</strong> {telegramUser.id}
          </p>
          <p>
            <strong>First Name:</strong> {telegramUser.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {telegramUser.last_name || "N/A"}
          </p>
          <p>
            <strong>Username:</strong> {telegramUser.username || "N/A"}
          </p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Loading Telegram user data...</p>
      )}
      <p>
        <strong>token:</strong>
        {/* {response2?.token || "N/Assss"} */}
      </p>
    </div>
  );
};

export default WelCome;
