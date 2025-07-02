import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(options);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const employee = await User.findOne({ email: session.user.email });
    
    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(options);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Don't allow changing email or role through this endpoint
    delete body.email;
    delete body.role;

    const employee = await User.findOneAndUpdate(
      { email: session.user.email },
      body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error updating employee profile:", error);
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}