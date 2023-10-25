import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
//import ckeditors from './Myckeditor';

import MyEditor from './ckeditors';


const KnowledgeInput = () => {


    const { guid } = useParams();

    const [loading, setLoading] = useState(true);
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A6',
        '#A633FF', '#FF8C33', '#33FFD7', '#FF3357',
        // ... 任何其他
    ];
    const saveButtonStyle = {
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        backgroundColor: 'blue',
        borderColor: 'blue'
    };

    const cardBodyStyle = {
        paddingBottom: '70px'
    };


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [knowledgecontent, setKnowledgecontent] = useState('');
    const [category, setCategory] = useState('');
    const [Id, setId] = useState('');
    const categories = [
        'Knowledge',
        'Interview',
    ];

    const [buttonsData, setButtonsData] = useState([]); // data from database
    const [selectedButtons, setSelectedButtons] = useState([]); // selected buttons values
    const [checkboxError, setCheckboxError] = useState(false);
    // const [filteredButtons, setFilteredButtons] = useState([]);

    const [errors, setErrors] = useState({
        title: false,
        content: false,
        category: false
    });

    //checkbox
    const [languagesFromDatabase, setLanguagesFromDatabase] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

 

    useEffect(() => {

        async function fetchButtonsData() {
            try {
                const response = await fetch('http://localhost:3033/master/getTagDatas');
                const data = await response.json();
                setButtonsData(data.data);
                setLoading(false); // 出错时也设置为 false
            } catch (error) {
                console.error("Error fetching buttons data:", error);
            }
        }
        fetchButtonsData();
        async function fetchData() {
            setLoading(true); // 开始获取数据时设置为 true
            if (guid) {
                try {
                    const response = await fetch(`http://localhost:3033/knowledge/getknowledge/${guid}`);
                    const data = await response.json();

                    // 使用data初始化组件的state
                    setTitle(data.data.title);
                    setContent(data.data.content);
                    setKnowledgecontent(data.data.knowledgecontent);
                    setCategory(data.data.category);
                    setSelectedButtons(data.data.tags);
                    setSelectedLanguages(data.data.tagstype);
                    setId(data.data.id);
                    setLoading(false); // 数据已经获取，设置为 false
                } catch (error) {
                    console.error("Error fetching the data:", error);
                    setLoading(false); // 出错时也设置为 false
                }
            }
        }

        fetchData();
        async function fetchLanguages() {
            try {
                const response = await fetch('http://localhost:3033/master/getTagDatas');
                const data = await response.json();
                const programmingLanguages = data.data.filter(item => item.type === "Programming Language");
                setLanguagesFromDatabase(programmingLanguages);

            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        }

        fetchLanguages()
    }, [guid]);

    const handleButtonClick = (id) => {
        setSelectedButtons((prevState) => {
            const strId = String(id);
            if (prevState.includes(strId)) {
                return prevState.filter(item => item !== strId);
            } else {
                return [...prevState, strId];
            }
        });
    };

    const  handleEditorData = (data) => {
        console.log("Received data from MyEditor:", data);
        
        setKnowledgecontent(data);
        
        console.log("knowledgecontent:", knowledgecontent);
        // 在这里，您可以根据需要进一步处理或使用数据
    };



    const handleLanguageChange = (langValue) => {
        if (selectedLanguages.includes(langValue)) {
            setSelectedLanguages(prevLanguages => prevLanguages.filter(lang => lang !== langValue));
            // Filter the buttons based on the selected languages

        } else {
            setSelectedLanguages(prevLanguages => [...prevLanguages, langValue]);
        }
    };

    const handleBlur = (field) => {
        switch (field) {
            case 'title':
                setErrors(prev => ({ ...prev, title: !title.trim() }));
                break;
            case 'content':
                setErrors(prev => ({ ...prev, content: !content.trim() }));
                break;
            case 'category':
                setErrors(prev => ({ ...prev, category: !category.trim() }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedLanguages.length === 0) {
            setCheckboxError(true);
            return;
        }


        let decodedToken = null;
        const tokenCookie = localStorage.getItem('token');
        if (tokenCookie) {
            decodedToken = jwtDecode(tokenCookie);
        }

        // 前端验证
        if (!title.trim() || !content.trim() || !category.trim()) {
            setErrors({
                title: !title.trim(),
                content: !content.trim(),
                category: !category.trim()
            });
            return;
        }

        const data = {
            title: title,
            content: content,
            category: category,
            knowledgecontent: knowledgecontent,
            selectedButtons: selectedButtons, // including selected buttons values
            tagstype: selectedLanguages,
            username: decodedToken ? decodedToken.username : null,
            guid: guid  // assuming you've state or prop named guid
        };


        const endpoint = guid ? `http://localhost:3033/knowledge/updateknowledge/${guid}` : 'http://localhost:3033/knowledge/createknowledge';
        const method = guid ? 'PUT' : 'POST';

        // Send the data to the backend
        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                alert(guid ? "数据已修改！" : "数据已保存！");
            } else {
                alert("操作失败！");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
  


    return (


        <Layout>

            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">

                        {guid ? <span className="me-2 small" style={{ color: '#007BFF' }}>ID:{Id}</span> : null}
                        <h2>Input</h2>


                    </div>
                    <div className="card-body" style={cardBodyStyle}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={() => handleBlur('title')}
                                    required
                                />
                                {errors.title && <div className="text-danger mt-2">Title is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Memo <span className="text-danger">*</span></label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    rows="2"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    onBlur={() => handleBlur('content')}
                                    required
                                ></textarea>
                                {errors.content && <div className="text-danger mt-2">Content is required</div>}
                            </div>

                            <div className="mb-3  editor-container">
                            <label htmlFor="content" className="form-label">Content</label>
                                <MyEditor onDataChanged={handleEditorData} initialValue={knowledgecontent || ""}
> </MyEditor>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category <span className="text-danger">*</span></label>
                                <select
                                    className="form-control"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    onBlur={() => handleBlur('category')}
                                    required
                                >
                                    <option value="">--Select a Category--</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <div className="text-danger mt-2">Category is required</div>}
                            </div>
                            <div className="mb-3">
                                {languagesFromDatabase.map(lang => (
                                    <div className="form-check form-check-inline" key={lang.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languageOptions"
                                            id={`${lang.id}Option`}
                                            value={lang.label}
                                            checked={selectedLanguages.includes(String(lang.id))}
                                            onChange={() => {
                                                handleLanguageChange(String(lang.id));
                                                setCheckboxError(false);  // Reset the error when a checkbox is selected
                                            }}

                                        />
                                        <label className="form-check-label" htmlFor={`${lang.value}Option`}>{lang.label}</label>
                                    </div>
                                ))}
                                {checkboxError && <div className="text-danger mt-2">At least one language must be selected</div>}
                            </div>




                            <div className="mb-3">
                                <div className="mb-2">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        (() => {
                                            // Derive the list of values based on selectedLanguages
                                            const selectedValues = selectedLanguages.map(langId => {
                                                const matchedButton = buttonsData.find(button => String(button.id) === String(langId));
                                                return matchedButton ? matchedButton.value : null;
                                            }).filter(Boolean);  // Remove any null values

                                            return buttonsData
                                                .filter(button => selectedValues.includes(button.value) && button.type === "Framework")
                                                .map(button => {
                                                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                                                    const isSelected = selectedButtons.includes(String(button.id));
                                                    return (
                                                        <button
                                                            key={button.id}
                                                            type="button"
                                                            active={isSelected ? "true" : "false"}
                                                            className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'} m-1 rounded-pill`}
                                                            onClick={() => handleButtonClick(button.id)}
                                                            style={{
                                                                borderWidth: '2px',
                                                            }}
                                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = randomColor}
                                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                                                        >
                                                            {button.label}
                                                        </button>
                                                    );
                                                })
                                        })()
                                    )}
                                </div>

                            </div>


                            <button type="submit" className="btn btn-dark" style={saveButtonStyle}> {guid ? "update" : "Save"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default KnowledgeInput;
