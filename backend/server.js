const express = require('express');
const qr = require('qr-image');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Generate QR code endpoint
app.get('/generate', (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }

    try {
        const qr_png = qr.image(text, { type: 'png' });
        res.setHeader('Content-type', 'image/png');
        qr_png.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

// Generate QR code with custom size
app.get('/generate-custom', (req, res) => {
    const { text, size = 200 } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }

    try {
        const qr_svg = qr.image(text, {
            type: 'svg',
            size: parseInt(size)
        });
        res.setHeader('Content-type', 'image/svg+xml');
        qr_svg.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

// Download QR code
app.get('/download', (req, res) => {
    const { text, filename = 'qrcode' } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }

    try {
        const qr_png = qr.image(text, { type: 'png' });
        res.setHeader('Content-disposition', `attachment; filename=${filename}.png`);
        res.setHeader('Content-type', 'image/png');
        qr_png.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

// API endpoint that returns QR code as base64
app.post('/api/qrcode', (req, res) => {
    const { text, format = 'png' } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }

    try {
        const qr_buffer = qr.imageSync(text, { type: format });
        const base64 = qr_buffer.toString('base64');
        const dataUrl = `data:image/${format};base64,${base64}`;

        res.json({
            success: true,
            data: dataUrl,
            format: format
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to generate QR code'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`QR Code Generator running on http://localhost:${PORT}`);
});