import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Post() {
    const { setData , post  , processing} = useForm({
        post : "",
        file : null
    })
    const submit : FormEventHandler  = (e)=>{
        e.preventDefault();
        post(route("store.post"))
    }
    return(
        <>
            <form onSubmit={submit} >
                <div>
                    <InputLabel htmlFor="text" value="post" />
                    <TextInput
                        id="post"
                        type="text"
                        name="post"
                        className="mt-1 "
                        isFocused={true}
                        onChange={(e)=>setData("post" , e.target.value)}
                    />
                    <TextInput
                        id="file"
                        type="file"
                        name="file"
                        className="mt-1"
                        isFocused={true}
                        onChange={(e)=>setData("file" ,  e.target.files[0])}
                    />
                    <PrimaryButton className="ml-14" disabled={processing}>
                        post now
                    </PrimaryButton>
                </div>
            </form>
        </>
    )

}
