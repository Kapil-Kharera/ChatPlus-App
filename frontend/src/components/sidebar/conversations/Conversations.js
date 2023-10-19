import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useSelector((state) => state.chat);

  return (
    <div className="conversations scrollbar">
      <ul>
        {
          conversations && conversations.map((con) => {
            return <Conversation data={con} key={con._id} />
          })
        }
      </ul>
    </div>
  )
}
