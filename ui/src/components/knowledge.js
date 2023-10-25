import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import '../css/knowledge.css';
import Layout from './Layout';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Modal({ item, onClose }) {
    return (
        <div className="modal-background">
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{item.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div
                            className="modal-body"
                            dangerouslySetInnerHTML={{ __html: item.knowledgecontent }}>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



const Knowledge = () => {
    const [understoodItems, setUnderstoodItems] = useState([]);
    const [notUnderstoodItems, setNotUnderstoodItems] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);
    const navigate = useNavigate();

    const handleEditClick = (guid) => {
        navigate(`/knowledgeInput/${guid}`);
    };

    const handleUnderstandClick = async (rowguid) => {
        setUnderstoodItems(prevState => [...prevState, rowguid]);
        // 如果之前标记为不理解，现在标记为理解，则应从不理解的列表中移除
        setNotUnderstoodItems(prevState => prevState.filter(id => id !== rowguid));
        // 其他逻辑...
        const data = {
            userId: userId, // Assuming you have user's id in a state or context
            knowledgeId: rowguid,
            understandingStatus: "UNDERSTOOD"
        };

        try {
            // Make API request to your backend
            const response = await fetch('http://localhost:3033/knowledge/storeUnderstandingStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            // handle success if needed

        } catch (error) {
            console.error("Error updating understanding status:", error);
            // handle errors, maybe show a notification to the user
        }
        setFlashMessage("您已标记为理解此知识点");
        setTimeout(() => setFlashMessage(null), 1000);
    }

    const handleNotUnderstandClick = async (rowguid) => {
        setNotUnderstoodItems(prevState => [...prevState, rowguid]);
        // 如果之前标记为理解，现在标记为不理解，则应从理解的列表中移除
        setUnderstoodItems(prevState => prevState.filter(id => id !== rowguid));
        // 其他逻辑...
        const data = {
            userId: userId,
            knowledgeId: rowguid,
            understandingStatus: "NOT_UNDERSTOOD"
        };

        try {
            const response = await fetch('http://localhost:3033/knowledge/storeUnderstandingStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            // handle success if needed

        } catch (error) {
            console.error("Error updating understanding status:", error);
            // handle errors, maybe show a notification to the user
        }
        setFlashMessage("您已标记为不理解此知识点");
        setTimeout(() => setFlashMessage(null), 1000);
    }



    const [userId, setUserId] = useState(null);
    const [createuser, setcreateuser] = useState(null);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A6',
        '#A633FF', '#FF8C33', '#33FFD7', '#FF3357',

    ];

    const [knowledgeList, setKnowledgeList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const pageType = 'Knowledge';
    // const [language, setLanguage] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedKnowledge, setDisplayedKnowledge] = useState(knowledgeList);

    const [buttonsData, setButtonsData] = useState([]); // data from database
    const [selectedButtons, setSelectedButtons] = useState([]); // selected buttons values

    //checkbox
    const [languagesFromDatabase, setLanguagesFromDatabase] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    // Load buttons data from the database

    //Modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        async function fetchData(page, pageSize, pageType) {
            try {
                let userIdFromToken;
                let response;
                let data;
                //let userId;
                // 获取存储在cookie中的token
                const tokenCookie = localStorage.getItem('token');
                if (tokenCookie) {
                    // 使用jwt-decode库解码token
                    const decodedToken = jwtDecode(tokenCookie);
                    userIdFromToken = decodedToken.userid;
                    // 假设token中的role字段包含用户角色
                    setcreateuser(decodedToken.username);
                    setUserId(userIdFromToken);

                }
                if (searchTerm || selectedLanguages.length > 0 || selectedButtons.length > 0) {
                    // 使用axios.post进行搜索请求
                    response = await axios.post('http://localhost:3033/knowledge/searchKnowledge', {
                        searchTerm,
                        selectedLanguages,
                        selectedButtons,
                        page,
                        pageSize,
                        pageType,
                    });

                    data = response.data;
                    setKnowledgeList(data.items);
                    setTotalItems(data.totalItems);
                    setKnowledgeList(data.data);
                    setDisplayedKnowledge(data.data);
                    fetchLanguagesUnderstanad(userIdFromToken);
                    // 重置理解和不理解的状态
                    //setUnderstoodItems([]);
                    //setNotUnderstoodItems([])
                } else {
                    response = await fetch(`http://localhost:3033/knowledge/getPaginatedKnowledge?page=${page}&pageSize=${pageSize}&pageType=Knowledge`);
                    data = await response.json();
                    setKnowledgeList(data.items);
                    setTotalItems(data.totalItems);
                    setKnowledgeList(data.data);
                    setDisplayedKnowledge(data.data);
                    // 重置理解和不理解的状态
                    fetchLanguagesUnderstanad(userIdFromToken);
                    // setUnderstoodItems([]);
                    //setNotUnderstoodItems([])

                }


            } catch (error) {
                console.error("Error fetching knowledge data:", error);
            }
        }
        async function fetchButtonsData() {
            try {
                const response = await fetch('http://localhost:3033/master/getTagDatas');
                const data = await response.json();
                setButtonsData(data.data);
            } catch (error) {
                console.error("Error fetching buttons data:", error);
            }

        }

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

        async function fetchLanguagesUnderstanad(userId) {
            try {
                const response = await fetch(`http://localhost:3033/knowledge/searchKnowledgeUnderstand?userId=${userId}`);
                const data = await response.json();
                const understoodIds = data.data.filter(item => item.status === 'UNDERSTOOD').map(item => item.knowledge_id);
                const notUnderstoodIds = data.data.filter(item => item.status === 'NOT_UNDERSTOOD').map(item => item.knowledge_id);

                setUnderstoodItems(understoodIds);
                setNotUnderstoodItems(notUnderstoodIds);


            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        }

        fetchData(page, pageSize, pageType);
        fetchButtonsData();
        fetchLanguages();

    }, [page, pageSize, searchTerm, selectedLanguages, selectedButtons]);

    const handleButtonClick = (value) => {
        setSelectedButtons(prevState => {
            if (prevState.includes(value)) {
                return prevState.filter(item => item !== value);
            } else {
                return [...prevState, value];
            }
        });
    };

    const handleLanguageChange = (langValue) => {
        if (selectedLanguages.includes(langValue)) {
            setSelectedLanguages(prevLanguages => prevLanguages.filter(lang => lang !== langValue));
            // Filter the buttons based on the selected languages

        } else {
            setSelectedLanguages(prevLanguages => [...prevLanguages, langValue]);
        }
    };
    // const filteredButtons = buttonsData.filter(button =>
    //     selectedLanguages.includes(button.value) && button.type === 'Framework'
    // );

    const selectedValues = buttonsData
        .filter(button => selectedLanguages.includes(button.id))
        .map(button => button.value);

    // 使用selectedValues来过滤buttonsData
    const filteredButtons = buttonsData.filter(button =>
        selectedValues.includes(button.value) && button.type === 'Framework'
    );


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Layout>

            <div className="yourComponentClassOrWrapper">

                {/* pop... */}

                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '10px 20px',
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '5px',
                    display: flashMessage ? 'block' : 'none',
                    opacity: flashMessage ? 1 : 0,
                    transition: 'opacity 0.5s',
                    zIndex: 9999
                }}>
                    {flashMessage}
                </div>
            </div>

            <div className="container mt-4 dashboard-content">
                <form onSubmit={handleSubmit}>

                    <h5 className="mb-2">
                        <i className="fas fa-tags mr-2"></i> {/* FontAwesome标签图标 */}
                        Knowledge
                        <span className="text-danger"></span>
                    </h5>

                    <div className="mb-3 d-flex align-items-center border p-3 rounded">
                        <input
                            type="checkbox"
                            id="myPublications"
                            value={showOnlyMine}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setShowOnlyMine(true);
                                    // 你可以在这里添加其他当复选框被选中时需要执行的代码
                                    let results = [];
                                    results = [...knowledgeList]; // 如果 searchTerm 为空，直接使用整个 knowledgeList

                                    results = results.filter(item => item.createuser === createuser);
                                    setDisplayedKnowledge(results);
                                } else {
                                    setShowOnlyMine(false);
                                    let results = [];
                                    results = [...knowledgeList]; // 如果 searchTerm 为空，直接使用整个 knowledgeList
                                    setDisplayedKnowledge(results);
                                }
                            }}
                            className="mr-2"
                        />
                        <label htmlFor="myPublications" style={{ fontWeight: 'bold', color: '#007bff', fontSize: '0.9em' }}>
                            仅显示我发布的内容
                        </label>
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
                                    checked={selectedLanguages.includes(lang.id)}
                                    onChange={() => handleLanguageChange(lang.id)}
                                />
                                <label className="form-check-label" htmlFor={`${lang.value}Option`}>{lang.label}</label>
                            </div>
                        ))}
                    </div>

                    <div className="mb-3">
                        <div className="mb-2">
                            {filteredButtons.map(button => {
                                // 对于每个按钮，随机选择一个颜色
                                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                                return (
                                    <button
                                        key={button.id}
                                        type="button"
                                        className={`btn ${selectedButtons.includes(button.id) ? 'btn-primary' : 'btn-outline-primary'} m-1 rounded-pill`}
                                        onClick={() => handleButtonClick(button.id)}
                                        style={{
                                            borderWidth: '2px',  // 增加按钮的边界宽度
                                            // borderColor: randomColor  // 设置按钮边框颜色为随机颜色
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = randomColor} // 悬停时设置背景颜色
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''} // 鼠标移出时清除背景颜色
                                    >
                                        {button.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter search term..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ marginRight: '20px' }}  // 内联样式增加右侧外边距
                            />
                            {/* <button type="submit" className="btn btn-primary">Search</button> */}
                        </div>
                    </div>




                </form>

                {isModalOpen && selectedItem && (
                    <Modal
                        item={selectedItem}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedItem(null);
                        }}
                    />
                )}
                <ul className="list-group">
                    {displayedKnowledge.map(item => (
                        <li key={item.guid} className="list-group-item" onClick={() => {
                            setSelectedItem(item);
                            setIsModalOpen(true);
                        }}>
                            <div className="d-flex align-items-center">
                                <span className="me-2 small" style={{ color: '#007BFF' }}>{item.id}</span>
                                <div className="vertical-divider"></div>
                                <div className="fw-bold ml-2">{item.title}</div>

                                <div className="position-absolute top-0 end-0 mt-2 me-2 btn-group">
                                    {item.createuser === createuser && (
                                        <button
                                            className="btn btn-sm btn-outline-primary edit-button"
                                            onClick={() => handleEditClick(item.guid)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    )}

                                    <button
                                        className={`btn btn-sm ${understoodItems.includes(item.guid) ? 'btn-success' : 'btn-outline-success'}`}
                                        onClick={() => handleUnderstandClick(item.guid)}
                                        title="理解"
                                    >
                                        <i className="fas fa-thumbs-up"></i>
                                    </button>

                                    <button
                                        className={`btn btn-sm ${notUnderstoodItems.includes(item.guid) ? 'btn-danger' : 'btn-outline-danger'}`}
                                        onClick={() => handleNotUnderstandClick(item.guid)}
                                        title="不理解"
                                    >
                                        <i className="fas fa-thumbs-down"></i>
                                    </button>
                                </div>
                            </div>
                            <hr className="inner-divider" />
                            <div className="content-part">{item.content}</div>

                            <span className="position-absolute bottom-0 end-0 mb-3 me-2 small-text">
                                {item.updateTime && new Date(item.updateTime).toISOString().split('T')[0]}
                            </span>
                        </li>
                    ))}
                </ul>


                <Pagination
                    current={page}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(newPage) => setPage(newPage)}

                />
            </div>
        </Layout>
    );
}





export default Knowledge;
