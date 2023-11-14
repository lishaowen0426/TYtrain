// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 这里只是一个模拟登录操作。在真实的应用中，您可能需要与后端验证。
        if (formData.username && formData.password) {
            fetch("http://127.0.0.1:3033/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Login successful!") {
                        // 存储token到localStorage
                        localStorage.setItem("token", data.token);
                        navigate("/knowledge"); // 跳转到Dashboard页面
                    } else {
                        alert("账号密码错误");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            alert("Please enter both email and password!");
        }
        console.log("Form data submitted:", formData);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-4 text-center">面接管理システム</h4>{" "}
                            {/* 添加的标题 */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">
                                        User
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
