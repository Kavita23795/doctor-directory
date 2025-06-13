
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl text-black font-bold mb-6">Welcome to the Doctor Directory</h1>
      <p className="text-lg text-black mb-8">Find doctors by name, specialization, or hospital.</p>
      <Link href="/doctors">
        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">
          Browse Doctors
        </button>
      </Link>
    </div>
  );
}
