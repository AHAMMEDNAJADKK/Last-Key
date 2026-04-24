import { Toaster } from "react-hot-toast";

/**
 * ToastProvider — drop this inside BrowserRouter to get
 * branded toast notifications throughout the app.
 * Call via:  toast.success("msg") / toast.error("msg")
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      containerStyle={{ top: 80 }}   // below navbar
      toastOptions={{
        duration: 3500,
        style: {
          background: "#fff",
          color: "#2e1e5e",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.88rem",
          fontWeight: 500,
          borderRadius: "12px",
          border: "1px solid rgba(68,45,130,0.14)",
          boxShadow: "0 8px 30px rgba(68,45,130,0.18)",
          padding: "12px 18px",
          maxWidth: "340px",
        },
        success: {
          iconTheme: { primary: "#b7d333", secondary: "#fff" },
          style: {
            borderLeft: "4px solid #b7d333",
          },
        },
        error: {
          iconTheme: { primary: "#e04f5f", secondary: "#fff" },
          style: {
            borderLeft: "4px solid #e04f5f",
          },
        },
        loading: {
          iconTheme: { primary: "#442d82", secondary: "#fff" },
          style: {
            borderLeft: "4px solid #442d82",
          },
        },
      }}
    />
  );
}
