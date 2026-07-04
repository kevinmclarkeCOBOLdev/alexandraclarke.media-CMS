import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the file to public directory with its name
    const fileName = file.name || "uploaded-cv.pdf";
    // Sanitize filename to prevent directory traversal
    const safeFileName = path.basename(fileName);
    
    // Path to public directory
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, safeFileName);

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, buffer);

    // Return the URL for the uploaded file
    return NextResponse.json({
      success: true,
      url: `/${safeFileName}`,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save file";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
