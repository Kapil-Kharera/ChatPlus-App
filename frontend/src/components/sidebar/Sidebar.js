import { SidebarHeader } from "./header";
import { Notification } from "./notifications"

export default function Sidebar() {
  return (
    <div className="w-[40%] h-full select-none">
        {/* sidebar header */}
        <SidebarHeader />
        {/* notification */}
        <Notification />
    </div>
  )
}
