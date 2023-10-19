
export default function Conversation({ data }) {

  return (
    <li className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 dark:text-dark_text_1 px-[10px] cursor-pointer">
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* left */}
        <div className="flex items-center gap-x-3">
          {/* conversation, user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img src={data.picture} alt={data.name} className="w-full h-full object-cover" />
          </div>
          {/* conversation name and msg */}
          <div className="w-full flex flex-col">
            {/* conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {data.name}
            </h1>
            {/* conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {data.latestMessage.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
