import React from 'react';

function Pagination({ current, total, pageSize, onChange }) {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onChange(newPage);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0" // 添加一些垂直方向的内边距
        }}>
            <nav>
                <ul className="pagination">
                    <li 
                        className={`page-item ${current === 1 ? 'disabled' : ''}`} 
                        style={{ margin: "0 5px" }} // 为每个列表项添加一些水平间距
                    >
                        <button 
                            className="page-link" 
                            style={{
                                padding: "10px 15px", // 调整按钮大小
                                borderRadius: "5px" // 轻微调整圆角
                            }} 
                            onClick={() => handlePageClick(current - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <li 
                            key={pageNumber + 1} 
                            className={`page-item ${current === pageNumber + 1 ? 'active' : ''}`} 
                            style={{ margin: "0 5px" }}
                        >
                            <button 
                                className="page-link" 
                                style={{
                                    padding: "10px 15px",
                                    borderRadius: "5px"
                                }} 
                                onClick={() => handlePageClick(pageNumber + 1)}
                            >
                                {pageNumber + 1}
                            </button>
                        </li>
                    ))}
                    <li 
                        className={`page-item ${current === totalPages ? 'disabled' : ''}`} 
                        style={{ margin: "0 5px" }}
                    >
                        <button 
                            className="page-link" 
                            style={{
                                padding: "10px 15px",
                                borderRadius: "5px"
                            }} 
                            onClick={() => handlePageClick(current + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        
    );
}

export default Pagination;
