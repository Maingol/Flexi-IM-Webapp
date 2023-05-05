import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    // useState：这是一个用于在函数组件中添加状态的 Hook。它返回一个包含两个元素的数组：
    // 当前状态值和一个更新状态的函数。你可以在组件中多次使用 useState，以创建多个独立的状态变量。
    // 传入 useState 的参数值是状态的初始值。
    const [inputText, setInputText] = useState("");
    const [socket, setSocket] = useState(null);

    // 我们使用 useEffect 在组件挂载时初始化 WebSocket 连接，并在组件卸载时关闭连接。
    // 同时，我们将 socket 的状态存储在 useState 中，这样我们可以在点击按钮时发送消息。
    // 这里使用了 React 的函数式组件和 React Hooks，使代码更简洁。

    // useEffect：这是一个用于在函数组件中执行副作用（如数据获取、订阅或手动修改 DOM 等）的 Hook。
    // 它接收两个参数：一个副作用函数和一个依赖数组。副作用函数在组件渲染后执行，并在依赖数组中的任何值发生变化时重新执行。

    // useEffect 中的 return 语句定义了一个清除函数。当组件卸载（unmount）时，清除函数会被执行。以下是针对您提到的不同情况的说明：
    // 刷新页面：刷新页面时，React 组件会被卸载，然后重新挂载。在组件卸载时，清除函数会被执行。
    // 关闭页面：当关闭页面时，React 组件也会被卸载，清除函数同样会被执行。
    // 切换到其他页面：这个情况取决于您的应用程序结构。如果您是在一个单页应用（SPA）中切换路由，且在切换过程中当前组件被卸载，那么清除函数会被执行。如果您的应用只是隐藏了当前组件，而没有真正将其从 DOM 中移除，那么清除函数将不会被执行。
    // 总之，在任何情况下，只要组件被卸载，useEffect 中定义的清除函数就会被执行。
    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:4000/connect");
        ws.onopen = () => {
            console.log("WebSocket connected");
        };
        ws.onmessage = (event) => {
            alert(event.data);
        };
        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };
        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []); // 空数组表示只在组件挂载和卸载时执行副作用


    const sendMessage = () => {
        if (socket) {
            socket.send(inputText);
            setInputText("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="container">
            <input
                type="text"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                onKeyPress={handleKeyPress}
                className="input"
            />
            <button onClick={sendMessage} className="button">
                <span className="button-text">Send message</span>
            </button>
        </div>
    );

}

export default App;
