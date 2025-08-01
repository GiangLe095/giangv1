import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <div className="font-bold text-lg">MyApp</div>
      <div className="flex gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
