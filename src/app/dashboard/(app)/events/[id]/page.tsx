import { notFound } from "next/navigation";
import { getEventById, getAttendanceForEvent } from "@/lib/db/queries";
import { EventDetailHeader } from "@/components/dashboard/EventDetailHeader";
import { AttendanceChecklist } from "@/components/dashboard/AttendanceChecklist";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const attendanceList = await getAttendanceForEvent(id);

  return (
    <div className="flex flex-col gap-[1.5rem]">
      <EventDetailHeader event={event} />

      <div>
        <h2 className="text-[1.1rem] font-semibold tracking-tight text-ink">Attendance</h2>
        <p className="mt-[0.25rem] text-[0.95rem] text-muted">
          Check off everyone who attended this event.
        </p>
        <div className="mt-[1rem]">
          <AttendanceChecklist eventId={id} members={attendanceList} />
        </div>
      </div>
    </div>
  );
}
