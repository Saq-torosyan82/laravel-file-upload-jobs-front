import React, {useRef} from "react";
import Layout from "../components/layout";

export default function Upload() {
    const fileRef = useRef()
    const API_URL = 'http://localhost:8000/api';

    function handleForm(e) {
        e.preventDefault()
        const inputFile = fileRef.current;
        const file = inputFile.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('mycsv', file)
            fetch(`${API_URL}/upload`, formData)
                .then(res => res.json())
                .then(data => console.log(data))
        }
    }

    return (
        <Layout>
            <p className="text-xl text-gray-800 text-center mb-5">Choose a file to Upload</p>
            <form className="border rounded p-4" onSubmit={handleForm}>
                <input type="file" ref={fileRef} />
                <button type="submit" className="px-4 py-2 bg-gray-800 rounded text-white">Upload</button>
            </form>
        </Layout>
    )
}