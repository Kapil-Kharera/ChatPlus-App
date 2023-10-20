import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notification } from "./notifications"
import { Search } from "./search";
import { Conversations } from "./conversations";

export default function Sidebar() {
  const [ searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  return (
    <div className="w-[40%] h-full select-none">
        {/* sidebar header */}
        <SidebarHeader />
        {/* notification */}
        <Notification />
        {/* search */}
        <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
        {/* conversation */}
        <Conversations />
    </div>
  )
}
