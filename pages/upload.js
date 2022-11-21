import React, {useEffect, useRef, useState} from "react";
import Layout from "../components/layout";

export default function Upload() {
    const fileRef = useRef()
    const API_URL = 'http://localhost:8000/api';

    const [processDetail, setProcessDetail] = useState({})
    const [batchId, setBatchId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (batchId != null) {
            updateProgress();
        }
    }, [batchId]);

    function handleForm(e) {
        e.preventDefault();

        if (!loading) {
            const inputFile = fileRef.current;
            const file = inputFile.files[0];

            if (file) {
                const formData = new FormData();
                formData.append('mycsv', file);
                setLoading(true);

                fetch(`${API_URL}/upload`, { method: 'post', body: formData })
                    .then(res => res.json())
                    .then(data => {
                        setBatchId(data.id);
                        processDetails();
                        setLoading(false);
                    })
            }
        }
    }

    function processDetails(id = null) {
        const selectedBatchId = id ?? batchId;

        fetch(`${API_URL}/batch?id=${selectedBatchId}`)
            .then(res => res.json())
            .then(data => setProcessDetail(data))
    }

    function updateProgress() {
        setInterval(() => {
            processDetails();
        }, 2000);
    }

    return (
        <Layout>
            { processDetail.progress >= 0 ?
                (<section>
                    <p>Upload is in progress ({processDetail.progress}%)</p>
                    <progress value={processDetail.progress} max="100"></progress>
                </section>) :
                (<section>
                    <p className="text-xl text-gray-800 text-center mb-5">Choose a file to Upload</p>
                    <form className="border rounded p-4" onSubmit={handleForm}>
                        <input type="file" ref={fileRef} />
                        <button type="submit" className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400 otline-none' : 'bg-gray-800'}`}>Upload</button>
                    </form>
                </section>)
            }
        </Layout>
    )
}