import { useRef, useState } from "react"

export default function Picture({ readablePicture, setReadablePicture, setPicture }) {
    const [ error, setError ] = useState("");

    const inputRef = useRef();

    const handlePicture = (e) => {
        const file = e.target.files[0];

        // console.log(file);

        if(
            file.type !== "image/jpeg" &&
            file.type!== "image/png" &&
            file.type !== "image/webp"
        ) {
            setError(`${file.name} format is not supported`)
            return;
        }else if(file.size > 1024 * 1024 * 5) { //5mb
            setError(`${file.name} is too large, maximum 5mb allowed.`)
            return;
        }else {
            setError("");
            setPicture(file);
            //for reading image
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setReadablePicture(e.target.result);
            }
        }
    }

    const handleChangePic = () => {
        console.log("Hello")
        setPicture("");
        setReadablePicture("");
    }


  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
        <label htmlFor="picture" className="text-sm font-bold tracking-wide">
            Picture (Optional)
        </label>
        {
            readablePicture ?
            <div>
                <img className="w-20 h-20 object-cover rounded-full" src={readablePicture} alt="avatar" />

                {/* change pic */}
                <div className="mt-2 py-1 w-20 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
                onClick={() => handleChangePic()}>
                    Remove
                </div>
            </div> : 
            <div className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
                onClick={() => inputRef.current.click()} >
                Upload Picture
            </div>
        }

        <input 
            type="file" 
            name="picture" 
            id="picture" 
            hidden 
            ref={inputRef} 
            accept="image/png, image/jpeg, image/webp"
            onChange={handlePicture} 
        />

        {/* Error */}
        <div className="mt-2">
            <p className="text-red-400">{error}</p>
        </div>
    </div>
  )
}
