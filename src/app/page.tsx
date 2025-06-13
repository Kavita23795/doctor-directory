// import { PrismaClient } from '@prisma/client';
// import Link from 'next/link';

// const prisma = new PrismaClient();

// type Doctor = {
//   id: number;
//   doctorid: number;
//   title: string;
//   firstname: string;
//   lastname: string;
//   oncology: string | null;
//   specialization: string | null;
//   doctor_city: string | null;
//   hospitalid: number;
//   hospital_name: string;
//   addressfield1: string | null;
//   addressfield2: string | null;
//   hospital_city: string | null;
//   state: string | null;
//   pincode: number | null;
//   area: string | null;
//   websitelink: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// };

// async function getDoctors(searchParams: any) {
//   const { search, specialization, city, page = '1' } = searchParams;
//   const itemsPerPage = 12;
//   const skip = (parseInt(page) - 1) * itemsPerPage;

//   let whereClause: any = {};

//   if (search) {
//     whereClause.OR = [
//       { firstname: { contains: search, mode: 'insensitive' } },
//       { lastname: { contains: search, mode: 'insensitive' } },
//       { hospital_name: { contains: search, mode: 'insensitive' } },
//     ];
//   }

//   if (specialization) {
//     whereClause.specialization = { contains: specialization, mode: 'insensitive' };
//   }

//   if (city) {
//     whereClause.OR = [
//       ...(whereClause.OR || []),
//       { hospital_city: { contains: city, mode: 'insensitive' } },
//       { doctor_city: { contains: city, mode: 'insensitive' } },
//       { state: { contains: city, mode: 'insensitive' } }
//     ];
//   }

//   try {
//     const [doctors, totalCount] = await Promise.all([
//       prisma.doctor.findMany({
//         where: whereClause,
//         take: itemsPerPage,
//         skip: skip,
//         orderBy: { firstname: 'asc' }
//       }),
//       prisma.doctor.count({ where: whereClause })
//     ]);

//     return { 
//       doctors, 
//       totalCount, 
//       currentPage: parseInt(page), 
//       totalPages: Math.ceil(totalCount / itemsPerPage) 
//     };
//   } catch (error) {
//     console.error('Database error:', error);
//     return { doctors: [], totalCount: 0, currentPage: 1, totalPages: 0 };
//   }
// }

// // Helper function to build pagination URLs
// function buildPaginationUrl(searchParams: any, page: number) {
//   const params = new URLSearchParams();
  
//   if (searchParams.search) params.set('search', searchParams.search);
//   if (searchParams.specialization) params.set('specialization', searchParams.specialization);
//   if (searchParams.city) params.set('city', searchParams.city);
//   params.set('page', page.toString());
  
//   return `/doctors?${params.toString()}`;
// }

// export default async function DoctorsPage({ searchParams }: { searchParams: any }) {
//   const { doctors, totalCount, currentPage, totalPages } = await getDoctors(searchParams || {});

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           {/* <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
//             ← Back to Home
//           </Link> */}
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Directory</h1>
//           <p className="text-gray-600">Search and filter through our database of qualified healthcare professionals</p>
//         </div>

//         {/* Search and Filter Form */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter Doctors</h2>
//           <form method="GET" action="/doctors" className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
//                   Search by Name or Hospital
//                 </label>
//                 <input
//                   type="text"
//                   id="search"
//                   name="search"
//                   defaultValue={searchParams?.search || ''}
//                   placeholder="Enter doctor name or hospital..."
//                   className="w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
//                   Filter by Specialization
//                 </label>
//                 <input
//                   type="text"
//                   id="specialization"
//                   name="specialization"
//                   defaultValue={searchParams?.specialization || ''}
//                   placeholder="e.g., Cancer Treatment, Cardiology..."
//                   className="w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
//                   Filter by City/State
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   defaultValue={searchParams?.city || ''}
//                   placeholder="e.g., Mumbai, Delhi, Maharashtra..."
//                   className="w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
//               >
//                 🔍 Search & Filter
//               </button>
//               <Link
//                 href="/doctors"
//                 className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
//               >
//                 🔄 Clear All
//               </Link>
//             </div>
//           </form>
//         </div>

//         {/* Current Filters Display */}
//         {(searchParams?.search || searchParams?.specialization || searchParams?.city) && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//             <h3 className="text-sm font-medium text-blue-900 mb-2">Active Filters:</h3>
//             <div className="flex flex-wrap gap-2">
//               {searchParams.search && (
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                   Search: "{searchParams.search}"
//                 </span>
//               )}
//               {searchParams.specialization && (
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                   Specialization: "{searchParams.specialization}"
//                 </span>
//               )}
//               {searchParams.city && (
//                 <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
//                   Location: "{searchParams.city}"
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Stats */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">{doctors.length}</div>
//               <div className="text-gray-600 text-sm">Showing</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600">{totalCount}</div>
//               <div className="text-gray-600 text-sm">Total Found</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-purple-600">{currentPage}</div>
//               <div className="text-gray-600 text-sm">Current Page</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-orange-600">{totalPages}</div>
//               <div className="text-gray-600 text-sm">Total Pages</div>
//             </div>
//           </div>
//         </div>

//         {/* No Results */}
//         {doctors.length === 0 && (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
//             <p className="text-gray-600 mb-4">Try different search terms or clear your filters</p>
//             <Link href="/doctors" className="text-blue-600 hover:text-blue-800 font-medium">
//               View all doctors
//             </Link>
//           </div>
//         )}

//         {/* Doctors Grid */}
//         {doctors.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {doctors.map((doctor: Doctor) => (
//               <div key={doctor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
//                 <div className="mb-4">
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     {doctor.title} {doctor.firstname} {doctor.lastname}
//                   </h3>
//                   <p className="text-blue-600 font-medium">
//                     {doctor.specialization || 'General Practice'}
//                   </p>
//                   {doctor.oncology && (
//                     <p className="text-green-600 text-sm">{doctor.oncology}</p>
//                   )}
//                 </div>
                
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <div><span className="font-medium">Hospital:</span> {doctor.hospital_name}</div>
//                   <div><span className="font-medium">Location:</span> {doctor.hospital_city}, {doctor.state}</div>
//                 </div>
                
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <Link href={`/doctors/${doctor.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
//                     View Profile →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {/* {totalPages > 1 && (
//           <div className="mt-8 flex justify-center items-center space-x-2">
//             {currentPage > 1 && (
//               <Link 
//                 href={buildPaginationUrl(searchParams, currentPage - 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 ← Previous
//               </Link>
//             )}
            
//             <span className="px-4 py-2 bg-gray-200 rounded">
//               Page {currentPage} of {totalPages}
//             </span>
            
//             {currentPage < totalPages && (
//               <Link 
//                 href={buildPaginationUrl(searchParams, currentPage + 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Next →
//               </Link>
//             )}
//           </div>
//         )} */}
//         {totalPages > 1 && (
//   <div className="mt-8 flex justify-center items-center space-x-2 flex-wrap">
//     {/* Previous button */}
//     {currentPage > 1 && (
//       <Link
//         href={buildPaginationUrl(searchParams, currentPage - 1)}
//         className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         ← Previous
//       </Link>
//     )}

//     {/* Always show first page */}
//     <Link
//       href={buildPaginationUrl(searchParams, 1)}
//       className={`px-3 py-2 rounded ${
//         currentPage === 1
//           ? 'bg-blue-700 text-white'
//           : 'bg-gray-200 text-black hover:bg-gray-300'
//       }`}
//     >
//       1
//     </Link>

//     {/* Show 2, 3, 4 if currentPage is near start */}
//     {currentPage <= 4 &&
//       Array.from({ length: Math.min(totalPages - 2, 3) }, (_, i) => i + 2).map(
//         (page) => (
//           <Link
//             key={page}
//             href={buildPaginationUrl(searchParams, page)}
//             className={`px-3 py-2 rounded ${
//               currentPage === page
//                 ? 'bg-blue-700 text-white'
//                 : 'bg-gray-200 text-black hover:bg-gray-300'
//             }`}
//           >
//             {page}
//           </Link>
//         )
//       )}

//     {/* Show middle pages around currentPage */}
//     {currentPage > 4 && currentPage < totalPages - 3 && (
//       <>
//         <span className="px-2">...</span>
//         {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i).map((page) => (
//           <Link
//             key={page}
//             href={buildPaginationUrl(searchParams, page)}
//             className={`px-3 py-2 rounded ${
//               currentPage === page
//                 ? 'bg-blue-700 text-white'
//                 : 'bg-gray-200 text-black hover:bg-gray-300'
//             }`}
//           >
//             {page}
//           </Link>
//         ))}
//         <span className="px-2">...</span>
//       </>
//     )}

//     {/* Show last few pages if currentPage is near end */}
//     {currentPage >= totalPages - 3 &&
//       Array.from({ length: 3 }, (_, i) => totalPages - 3 + i).map((page) => (
//         page > 1 && page < totalPages && (
//           <Link
//             key={page}
//             href={buildPaginationUrl(searchParams, page)}
//             className={`px-3 py-2 rounded ${
//               currentPage === page
//                 ? 'bg-blue-700 text-white'
//                 : 'bg-gray-200 text-black hover:bg-gray-300'
//             }`}
//           >
//             {page}
//           </Link>
//         )
//       ))}

//     {/* Always show last page if not already shown */}
//     {totalPages > 1 && currentPage !== totalPages && (
//       <>
//         {currentPage < totalPages - 3 && <span className="px-2">...</span>}
//         <Link
//           href={buildPaginationUrl(searchParams, totalPages)}
//           className={`px-3 py-2 rounded ${
//             currentPage === totalPages
//               ? 'bg-blue-700 text-white'
//               : 'bg-gray-200 text-black hover:bg-gray-300'
//           }`}
//         >
//           {totalPages}
//         </Link>
//       </>
//     )}

//     {/* Next button */}
//     {currentPage < totalPages && (
//       <Link
//         href={buildPaginationUrl(searchParams, currentPage + 1)}
//         className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Next →
//       </Link>
//     )}
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

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
