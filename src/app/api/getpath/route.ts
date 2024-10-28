import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const file = await req.json(); // Process the file from the request body
    // You can process the file here if needed
    return NextResponse.json({ message: 'File received', file }, { status: 200 });
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not implemented' }, { status: 501 });
}


// import { NextResponse, NextRequest } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const filePath = searchParams.get('filePath'); // Get the filePath from query parameters

//     if (!filePath) {
//         return NextResponse.json({ error: 'filePath is required' }, { status: 400 });
//     }

//     try {
//         // Normalize the file path to avoid issues with different formats
//         const resolvedPath = path.resolve(filePath);
//         const data = fs.readFileSync(resolvedPath, 'utf8');
//         return NextResponse.json({ content: data });
//     } catch (err) {
//         console.error('Error reading file:', err);
//         return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
//     }
// }


// import { NextResponse } from 'next/server';
// import fs from 'fs';

// export async function GET() {

//     const filePath = 'D:\\RegistrationOfBSA.txt'; // Update this to your actual file path

//     // const filePath = '\\\\vvserver\\Divyanshi\\Merge folder\\PAPERBIZ\\ArrivalStatus_Master\\NewTextDocument.txt'; 

//     try {
//         const data = fs.readFileSync(filePath, 'utf8');
//         return NextResponse.json({ content: data });
//     } catch (err) {
//         console.error('Error reading file:', err);
//         return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
//     }
// }
