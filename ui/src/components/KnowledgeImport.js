import React, { useState,useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Layout from './Layout';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KnowledgeImport = () => {

    const [uploadedFileName, setUploadedFileName] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        setUploadedFileName(file.name); 
        reader.onload = async (e) => {
            const bstr = e.target.result;
            const workbook = XLSX.read(bstr, { type: 'binary' });

            const wsname = workbook.SheetNames[0];
            const ws = workbook.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            console.log(data);
            fetch('http://localhost:3033/knowledge/batchImportKnowledge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                toast.success('数据成功上传!');
            })
            .catch(error => {
                console.error('Error sending data:', error);
                toast.error('上传数据出错。请再试一次。');
            });

           
        };

        reader.readAsBinaryString(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.xlsx, .xls'
    });

    return (
        <Layout>
            <ToastContainer />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div {...getRootProps()} className="border rounded d-flex flex-column justify-content-center align-items-center" style={{ width: '95%', maxWidth: '800px', padding: '40px', cursor: 'pointer', borderStyle: 'dashed' }}>
                    <input {...getInputProps()} />
                    <i className="fas fa-upload mb-3" style={{ fontSize: '50px', color: '#007bff' }}></i>
                    {uploadedFileName ? (
                        <p className="mb-0">{uploadedFileName}</p>
                    ) : (
                        <>
                            <p className="mb-0">Drag & drop Excel file here</p>
                            <span className="text-muted">or click to select</span>
                        </>
                    )}
                    <div className="mt-4">
                        <a
                            href="/KnowledgeImport.xlsx"
                            download
                            className="btn btn-outline-primary"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="fas fa-download"></i> Download Template
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
    
}

export default KnowledgeImport;