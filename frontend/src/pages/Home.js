import { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";
import { WhatsappHome } from "../components/chat/welcome";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  console.log(activeConversation._id);
  
  //get conversations
  useEffect(() => {
    if(user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="container h-screen flex">
        {/* sidebar */}
        <Sidebar />
        {
          activeConversation._id ? "Home" : <WhatsappHome />
        }
      </div>
    </div>
  )
}

export default Home;