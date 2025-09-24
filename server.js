const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url);
    
    // Если запрос к корню - отдаем index.html
    if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
    }
    
    // Проверяем существование файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('File not found');
            return;
        }
        
        // Определяем Content-Type
        const ext = path.extname(filePath);
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        };
        
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // Читаем и отправляем файл
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    });
});