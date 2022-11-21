import React, {useEffect, useRef, useState} from "react";
import Layout from "../components/layout";

export default function Upload() {
    const fileRef = useRef()
    const API_URL = 'http://localhost:8000/api';

    useEffect(() => {
        processDetails();
    }, []);

    const [processDetail, setProcessDetail] = useState({})

    function handleForm(e) {
        e.preventDefault()
        const inputFile = fileRef.current;
        const file = inputFile.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('mycsv', file)
            fetch(`${API_URL}/upload`, { method: 'post', body: formData })
                .then(res => res.json())
                .then(data => console.log(data))
        }
    }

    function processDetails() {
        const batchId = '97cc653c-79bf-495c-a3c5-214422b3243e';
        fetch(`${API_URL}/batch?id=${batchId}`)
            .then(res => res.json())
            .then(data => setProcessDetail(data))
    }

    return (
        <Layout>
            {processDetail &&
                <section>
                    <p>Upload is in progress</p>
                    <progress value={processDetail.progress} max="100"></progress>
                </section>
            }

            {!processDetail &&
                <section>
                    <p className="text-xl text-gray-800 text-center mb-5">Choose a file to Upload</p>
                    <form className="border rounded p-4" onSubmit={handleForm}>
                        <input type="file" ref={fileRef} />
                        <button type="submit" className="px-4 py-2 bg-gray-800 rounded text-white">Upload</button>
                    </form>
                </section>
            }

        </Layout>
    )
}