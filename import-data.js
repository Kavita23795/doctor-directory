
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importCsvData() {
  try {
    console.log('Starting CSV import...');
    
    // Read CSV file from Downloads folder
    const csvPath = 'C:\\Users\\Kaustubh Avhad\\Downloads\\Doctors.csv';
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV
    const lines = csvContent.split('\n');
    const headers = lines[0].replace('\r', '').split(',');
    
    console.log(`Found ${lines.length - 1} records to import`);
    
    // Process each line
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].replace('\r', '').split(',');
        
        const doctorData = {
          doctorid: parseInt(values[0]) || 0,
          title: values[1] || '',
          firstname: values[2] || '',
          lastname: values[3] || '',
          oncology: values[4] || null,
          specialization: values[5] || null,
          doctor_city: values[6] || null,
          hospitalid: parseInt(values[7]) || 0,
          hospital_name: values[8] || '',
          addressfield1: values[9] || null,
          addressfield2: values[10] || null,
          hospital_city: values[11] || null,
          state: values[12] || null,
          pincode: parseInt(values[13]) || null,
          area: values[14] || null,
          websitelink: values[15] || null,
        };
        
        await prisma.doctor.create({
          data: doctorData
        });
        
        if (i % 50 === 0) {
          console.log(`Imported ${i} records...`);
        }
      }
    }
    
    console.log('Import completed successfully!');
    
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importCsvData();
