const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// 定义 API 接口，根据参数名、日期和小时返回对应的数据
app.get('/api/data/:param/:dateHour', (req, res) => {
    const { param, dateHour } = req.params;
    const fileName = `${param}_${dateHour}.json`;
    // 修改为实际的数据路径
    const filePath = path.join('/home/hko/VisualModule/suwen/windy/data-preprocessing/json', fileName);

    // 读取 JSON 文件
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 文件不存在，返回 404 错误
                res.status(404).send('Data not found');
            } else {
                // 读取文件时发生其他错误，返回 500 错误
                res.status(500).send('Error reading data');
            }
            return;
        }
        try {
            // 解析 JSON 数据
            const jsonData = JSON.parse(data);
            // 将解析后的数据以 JSON 格式返回给客户端
            res.json(jsonData);
        } catch (parseError) {
            // 解析 JSON 数据时发生错误，返回 500 错误
            res.status(500).send('Error parsing JSON data');
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});