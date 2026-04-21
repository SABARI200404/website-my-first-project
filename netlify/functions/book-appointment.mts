import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return Response.json(
      { status: "Failed", message: "Method not allowed" },
      { status: 405 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { status: "Failed", message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { name, phone, email, testType, date } = body;
  if (!name || !phone || !email || !testType || !date) {
    return Response.json(
      { status: "Failed", message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const store = getStore("appointments");
    const appointment = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      testType,
      date,
      createdAt: new Date().toISOString(),
    };
    await store.setJSON(appointment.id, appointment);
    return Response.json({ status: "Sent", message: "Appointment saved successfully" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return Response.json(
      { status: "Failed", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
