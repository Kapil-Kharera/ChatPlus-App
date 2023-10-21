import { Contact } from "./index";

export default function SearchResults({ searchResults }) {
  return (
    <div className="w-full conversations scrollbar">
        <div>
            {/* heading */}
            <div className="flex flex-col px-8 pt-8">
                <h1 className="font-extralight text-md text-green_2">Contacts</h1>
                <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
            </div>
            {/* results */}
            <ul>
                {
                    searchResults && searchResults?.users?.map((user) => (
                        <Contact data={user} key={user._id} />
                    ))
                }
            </ul>
        </div>
    </div>
  )
}
