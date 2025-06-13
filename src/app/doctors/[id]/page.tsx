import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

// Define the Doctor type (same as before)
type Doctor = {
  id: number;
  doctorid: number;
  title: string;
  firstname: string;
  lastname: string;
  oncology: string | null;
  specialization: string | null;
  doctor_city: string | null;
  hospitalid: number;
  hospital_name: string;
  addressfield1: string | null;
  addressfield2: string | null;
  hospital_city: string | null;
  state: string | null;
  pincode: number | null;
  area: string | null;
  websitelink: string | null;
  createdAt: Date;
  updatedAt: Date;
};

async function getDoctor(id: string): Promise<Doctor | null> {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) }
    });
    return doctor;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = await getDoctor(params.id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/doctors" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Directory
          </Link>
        </div>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">
              {doctor.title} {doctor.firstname} {doctor.lastname}
            </h1>
            <p className="text-xl text-blue-100">
              {doctor.specialization || 'General Practice'}
            </p>
            {doctor.oncology && (
              <p className="text-lg text-blue-200 mt-2">
                {doctor.oncology}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hospital Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Hospital Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Hospital:</span>
                    <p className="text-gray-600">{doctor.hospital_name}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-600">
                      {doctor.addressfield1}
                      {doctor.addressfield2 && <><br />{doctor.addressfield2}</>}
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-600">
                      {doctor.hospital_city}, {doctor.state}
                      {doctor.pincode && <> - {doctor.pincode}</>}
                    </p>
                  </div>
                  
                  {doctor.area && (
                    <div>
                      <span className="font-medium text-gray-700">Area:</span>
                      <p className="text-gray-600">{doctor.area}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Doctor Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Doctor ID:</span>
                    <p className="text-gray-600">{doctor.doctorid}</p>
                  </div>
                  
                  {doctor.doctor_city && (
                    <div>
                      <span className="font-medium text-gray-700">Doctor's City:</span>
                      <p className="text-gray-600">{doctor.doctor_city}</p>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium text-gray-700">Hospital ID:</span>
                    <p className="text-gray-600">{doctor.hospitalid}</p>
                  </div>
                  
                  {doctor.websitelink && (
                    <div>
                      <span className="font-medium text-gray-700">Website: </span>
                      <a 
                        href={doctor.websitelink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >{doctor.websitelink}
                        {/* Visit Website */}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/doctors"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Back to Directory
                </Link>
                
                {/* <Link 
                  href="/"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Back to Home
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}