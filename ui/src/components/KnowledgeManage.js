import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';

function KnowledgeManage() {
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filterValue, setFilterValue] = useState({});

    const [tables, setTables] = useState([]);
    const [columns, setColumns] = useState([]);
    const [tableData, setTableData] = useState([]);
    //const tables = ["Table1", "Table2", "Table3"];
    // const columns = ["Column1", "Column2", "Column3"];
    const [editingRow, setEditingRow] = useState(null);

    const handleFilterChange = (column, value) => {
        setFilterValue(prev => ({ ...prev, [column]: value }));
    };
    const handleTableChange = (e) => {
        setSelectedTable(e.target.value);
        setSelectedColumns([]);  // 重置selectedColumns状态
    };

    const handleInputChange = (e, rowIndex, column) => {
        const updatedData = [...tableData];
        updatedData[rowIndex][column] = e.target.value;
        setTableData(updatedData);
    };
    const handleSave = async (rowIndex) => {
        // 获取当前行的数据
        const rowData = tableData[rowIndex];

        // TODO: 保存数据到后端，例如使用axios发送POST或PUT请求
        // await axios.post('/api/saveData', rowData);

        // 保存成功后，退出编辑模式
        setEditingRow(null);
    };
    useEffect(() => {
        axios.get('http://localhost:3033/backmanager/searchTables')
            .then(response => {
                setTables(response.data);  // 更新状态以存储从数据库获取的表名称
            })
            .catch(error => {
                console.error("Error fetching tables:", error);
            });

        if (selectedTable) {
            axios.get(`http://localhost:3033/backManager/getColumnsForTable/${selectedTable}`)
                .then(response => {
                    setColumns(response.data);  // 更新状态以存储从数据库获取的列名
                    setSelectedColumns(response.data);  // 默认选中所有列
                })
                .catch(error => {
                    console.error("Error fetching columns:", error);
                });
        }

        if (selectedTable) {
            axios.get(`http://localhost:3033/backManager/getDataForTable/${selectedTable}`)
                .then(response => {
                    setTableData(response.data);  // 更新状态以存储从数据库获取的数据
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }

    }, [selectedTable]);



    return (
        <Layout>
            <div className="container mt-5">
                <h1 className="text-center mb-5">知识库管理</h1>

                <div className="mb-4">
                    <label htmlFor="tableSelect" className="form-label">选择知识表</label>
                    <select className="form-select" id="tableSelect" onChange={handleTableChange}>
                        <option value="">请选择</option>
                        {tables.map(table => <option key={table} value={table}>{table}</option>)}
                    </select>
                </div>

                {selectedTable && (
                    <>
                        <div className="mb-4">
                            <label className="form-label">选择列</label>
                            {columns.map(column => (
                                <div className="form-check" key={column}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={column}
                                        id={`check-${column}`}
                                        checked={selectedColumns.includes(column)}  // 这里添加了checked属性
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedColumns(prev => [...prev, column]);
                                            } else {
                                                setSelectedColumns(prev => prev.filter(col => col !== column));
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor={`check-${column}`}>
                                        {column}
                                    </label>
                                </div>
                            ))}
                        </div>


                        <div className="mb-4">
                            <h2 className="mb-3">{selectedTable} 数据</h2>
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        {selectedColumns.map(column => (
                                            <th key={column}>{column}</th>
                                        ))}
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {selectedColumns.map(column => (
                                                <td key={column}>
                                                    {editingRow === rowIndex ? (
                                                        <input type="text" value={row[column]} onChange={e => handleInputChange(e, rowIndex, column)} />
                                                    ) : (
                                                        row[column]
                                                    )}
                                                </td>
                                            ))}
                                            <td>
                                                {editingRow === rowIndex ? (
                                                    <>
                                                        <button className="btn btn-sm btn-success mr-2" onClick={() => handleSave(rowIndex)}>保存</button>
                                                        <button className="btn btn-sm btn-secondary mr-2" onClick={() => setEditingRow(null)}>取消</button>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-sm btn-primary mr-2" onClick={() => setEditingRow(rowIndex)}>编辑</button>
                                                )}
                                                <button className="btn btn-sm btn-danger">删除</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                        <div className="mb-4">
                            <button className="btn btn-outline-success mr-3">导出选中数据</button>
                            <button className="btn btn-outline-info">导出全部数据</button>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default KnowledgeManage;
