// MenuPage.jsx - Simplified version
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Button,
    Avatar,
    Paper,
    Divider,
    IconButton,
    Tabs,
    Tab,
    CircularProgress,
    Alert,
    Badge,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    CardMedia,
    Fab,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    ArrowBack,
    Restaurant,
    Share,
    Print,
    Download,
    QrCode as QrCodeIcon,
    Favorite,
    FavoriteBorder,
    ContentCopy,
    Phone,
    Email,
    LocationOn,
    Language,
    Schedule,
    Star,
    LocalOffer,
    Category,
    Image,
    Close,
    Fullscreen,
    Facebook,
    Instagram,
    Twitter,
    LinkedIn,
    WhatsApp
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';

function MenuPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('menu');
    const [isFavorite, setIsFavorite] = useState(false);
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qrDialogOpen, setQrDialogOpen] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [printDialogOpen, setPrintDialogOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    // Mock menu data
    const mockMenuData = {
        id: id,
        title: 'منوی رستوران ایرانی',
        bussinessName: 'رستوران شاندیز',
        description: 'منوی غذاهای ایرانی با کیفیت عالی و سرویس سریع. با بهترین مواد اولیه و طبخ سنتی.',
        icon: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`
    };

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setMenuData(mockMenuData);

            // Check if menu is in favorites
            const favorites = JSON.parse(localStorage.getItem('favoriteMenus') || '[]');
            setIsFavorite(favorites.includes(id));

            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [id]);

    const handleToggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMenus') || '[]');

        if (isFavorite) {
            const newFavorites = favorites.filter(fav => fav !== id);
            localStorage.setItem('favoriteMenus', JSON.stringify(newFavorites));
        } else {
            favorites.push(id);
            localStorage.setItem('favoriteMenus', JSON.stringify(favorites));
        }

        setIsFavorite(!isFavorite);
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: menuData?.title || 'منو رستوران',
                    text: menuData?.description || '',
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
                setShareDialogOpen(true);
            }
        } else {
            setShareDialogOpen(true);
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const generateQRData = () => {
        return window.location.href;
    };

    const handleDownloadQR = () => {
        const svg = document.getElementById('menu-qr-code');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const pngUrl = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = `menu-qr-${id}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };

            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
    };

    const handlePrint = () => {
        setPrintDialogOpen(true);
    };

    // Mock food items
    const foodCategories = [
        {
            id: 1,
            name: 'پیش غذا',
            items: [
                { id: 1, name: 'ترشی کلم', description: 'ترشی مخصوص کلم با ادویه های خاص', price: '۲۵,۰۰۰', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                { id: 2, name: 'سالاد فصل', description: 'سالاد تازه با سس مخصوص', price: '۳۰,۰۰۰', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            ]
        },
        {
            id: 2,
            name: 'غذای اصلی',
            items: [
                { id: 3, name: 'چلوکباب کوبیده', description: 'کباب کوبیده ممتاز با برنج ایرانی', price: '۱۵۰,۰۰۰', image: 'https://images.unsplash.com/photo-1585937421612-70ca003675ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                { id: 4, name: 'قرمه سبزی', description: 'خورشت قرمه سبزی با گوشت گوسفندی', price: '۱۳۰,۰۰۰', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            ]
        },
        {
            id: 3,
            name: 'نوشیدنی',
            items: [
                { id: 5, name: 'دوغ محلی', description: 'دوغ گازدار با نعناع', price: '۱۵,۰۰۰', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                { id: 6, name: 'آب معدنی', description: 'آب معدنی طبیعی', price: '۱۰,۰۰۰', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            ]
        }
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ];

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box textAlign="center">
                    <CircularProgress size={60} sx={{ color: 'white', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        در حال بارگذاری منو...
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                pb: 4,
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: 400,
                    overflow: 'hidden',
                    mb: 4,
                }}
            >
                {menuData?.coverImage && (
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Box
                            component="img"
                            src={menuData.coverImage}
                            alt="Cover"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(0.7)',
                            }}
                        />
                    </motion.div>
                )}

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                    }}
                />

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.3)',
                            },
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <IconButton
                        onClick={handleToggleFavorite}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: isFavorite ? '#ff4081' : 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.3)',
                            },
                        }}
                    >
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </motion.div>

                <Container maxWidth="lg">
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 40,
                            left: 0,
                            right: 0,
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {menuData?.icon && (
                                <Avatar
                                    src={menuData.icon}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mx: 'auto',
                                        mb: 2,
                                        border: '4px solid white',
                                        boxShadow: 3,
                                    }}
                                />
                            )}

                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {menuData?.title}
                            </Typography>

                            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                                {menuData?.bussinessName}
                            </Typography>

                            {menuData?.description && (
                                <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.8 }}>
                                    {menuData.description}
                                </Typography>
                            )}
                        </motion.div>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* Action Buttons */}
                    <Paper
                        sx={{
                            p: 3,
                            mb: 4,
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <Tooltip title="اشتراک گذاری">
                            <Button
                                variant="contained"
                                startIcon={<Share />}
                                onClick={handleShare}
                                sx={{
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                }}
                            >
                                اشتراک
                            </Button>
                        </Tooltip>

                        <Tooltip title="چاپ منو">
                            <Button
                                variant="contained"
                                startIcon={<Print />}
                                onClick={handlePrint}
                                sx={{
                                    background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                }}
                            >
                                چاپ
                            </Button>
                        </Tooltip>

                        <Tooltip title="نمایش QR کد">
                            <Button
                                variant="contained"
                                startIcon={<QrCodeIcon />}
                                onClick={() => setQrDialogOpen(true)}
                                sx={{
                                    background: 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                }}
                            >
                                QR کد
                            </Button>
                        </Tooltip>

                        <Tooltip title="دانلود PDF">
                            <Button
                                variant="contained"
                                startIcon={<Download />}
                                onClick={() => window.print()}
                                sx={{
                                    background: 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                }}
                            >
                                دانلود
                            </Button>
                        </Tooltip>
                    </Paper>

                    {/* Tabs */}
                    <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            variant="fullWidth"
                            sx={{
                                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                '& .MuiTab-root': {
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                },
                                '& .Mui-selected': {
                                    color: '#fff',
                                },
                            }}
                        >
                            <Tab label="منو غذاها" value="menu" icon={<Restaurant />} />
                            <Tab label="اطلاعات رستوران" value="info" icon={<LocationOn />} />
                            <Tab label="عکس‌ها" value="gallery" icon={<Image />} />
                        </Tabs>

                        <Box sx={{ p: 3 }}>
                            <AnimatePresence mode="wait">
                                {activeTab === 'menu' && (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {foodCategories.map((category) => (
                                            <Box key={category.id} sx={{ mb: 4 }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        mb: 3,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        color: 'primary.main',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    <Category sx={{ ml: 1 }} />
                                                    {category.name}
                                                </Typography>

                                                <Grid container spacing={3}>
                                                    {category.items.map((item) => (
                                                        <Grid item xs={12} md={6} key={item.id}>
                                                            <Card
                                                                sx={{
                                                                    height: '100%',
                                                                    borderRadius: 3,
                                                                    overflow: 'hidden',
                                                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                                                    '&:hover': {
                                                                        transform: 'translateY(-5px)',
                                                                        boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                                                                    },
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', height: 150 }}>
                                                                    {item.image && (
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{
                                                                                width: 150,
                                                                                objectFit: 'cover',
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            image={item.image}
                                                                            alt={item.name}
                                                                            onClick={() => setFullscreenImage(item.image)}
                                                                        />
                                                                    )}
                                                                    <CardContent sx={{ flex: 1 }}>
                                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                                {item.name}
                                                                            </Typography>
                                                                            <Chip
                                                                                label={item.price}
                                                                                color="primary"
                                                                                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                                                                            />
                                                                        </Box>
                                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                                            {item.description}
                                                                        </Typography>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <Chip
                                                                                icon={<Star sx={{ fontSize: 16 }} />}
                                                                                label="۴.۵"
                                                                                size="small"
                                                                                variant="outlined"
                                                                            />
                                                                            <Chip
                                                                                icon={<LocalOffer sx={{ fontSize: 16 }} />}
                                                                                label="پرفروش"
                                                                                size="small"
                                                                                color="secondary"
                                                                            />
                                                                        </Box>
                                                                    </CardContent>
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === 'info' && (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={6}>
                                                <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                                        <LocationOn sx={{ ml: 1 }} />
                                                        اطلاعات تماس
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Phone color="primary" />
                                                            <Typography>۰۲۱-۱۲۳۴۵۶۷۸</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Email color="primary" />
                                                            <Typography>info@restaurant.com</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <LocationOn color="primary" />
                                                            <Typography>تهران، خیابان ولیعصر، پلاک ۱۲۳</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Schedule color="primary" />
                                                            <Typography>همه روزه از ۱۲ ظهر تا ۱۱ شب</Typography>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                                        <Language sx={{ ml: 1 }} />
                                                        شبکه‌های اجتماعی
                                                    </Typography>
                                                    <Grid container spacing={2}>
                                                        {[
                                                            { icon: <Instagram />, color: '#E4405F', label: 'اینستاگرام' },
                                                            { icon: <Facebook />, color: '#1877F2', label: 'فیسبوک' },
                                                            { icon: <Twitter />, color: '#1DA1F2', label: 'توییتر' },
                                                            { icon: <LinkedIn />, color: '#0A66C2', label: 'لینکدین' },
                                                            { icon: <WhatsApp />, color: '#25D366', label: 'واتساپ' },
                                                        ].map((social, index) => (
                                                            <Grid item xs={6} key={index}>
                                                                <Button
                                                                    fullWidth
                                                                    startIcon={social.icon}
                                                                    sx={{
                                                                        justifyContent: 'flex-start',
                                                                        color: social.color,
                                                                        border: `1px solid ${social.color}`,
                                                                        borderRadius: 2,
                                                                        py: 1.5,
                                                                    }}
                                                                >
                                                                    {social.label}
                                                                </Button>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </motion.div>
                                )}

                                {activeTab === 'gallery' && (
                                    <motion.div
                                        key="gallery"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Grid container spacing={2}>
                                            {galleryImages.map((img, index) => (
                                                <Grid item xs={12} sm={6} md={4} key={index}>
                                                    <Card
                                                        sx={{
                                                            borderRadius: 3,
                                                            overflow: 'hidden',
                                                            cursor: 'pointer',
                                                            transition: 'transform 0.3s',
                                                            '&:hover': {
                                                                transform: 'scale(1.05)',
                                                            },
                                                        }}
                                                        onClick={() => setFullscreenImage(img)}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            height="200"
                                                            image={img}
                                                            alt={`Gallery ${index + 1}`}
                                                        />
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Paper>

                    {/* QR Code Section */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            QR کد منو
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                            اسکن کنید تا به این منو دسترسی داشته باشید
                        </Typography>

                        <Box
                            sx={{
                                display: 'inline-block',
                                p: 3,
                                backgroundColor: 'white',
                                borderRadius: 3,
                                mb: 3,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            }}
                        >
                            <QRCodeSVG
                                id="menu-qr-code"
                                value={generateQRData()}
                                size={200}
                                level="H"
                                includeMargin={true}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                startIcon={<Download />}
                                onClick={handleDownloadQR}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#764ba2',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                            >
                                دانلود QR
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Share />}
                                onClick={handleShare}
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    '&:hover': {
                                        borderColor: '#e0e0e0',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                اشتراک گذاری
                            </Button>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>

            {/* QR Code Dialog */}
            <Dialog
                open={qrDialogOpen}
                onClose={() => setQrDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    QR کد منو
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                        sx={{
                            p: 3,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            display: 'inline-block',
                            mb: 3,
                        }}
                    >
                        <QRCodeSVG
                            value={generateQRData()}
                            size={256}
                            level="H"
                            includeMargin={true}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        اسکن QR کد برای دسترسی سریع به منو
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        onClick={handleDownloadQR}
                        variant="contained"
                        startIcon={<Download />}
                    >
                        دانلود QR کد
                    </Button>
                    <Button
                        onClick={() => setQrDialogOpen(false)}
                        variant="outlined"
                    >
                        بستن
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Share Dialog */}
            <Dialog
                open={shareDialogOpen}
                onClose={() => setShareDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    اشتراک گذاری منو
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                        {[
                            { icon: <WhatsApp />, color: '#25D366' },
                            { icon: <TelegramIcon />, color: '#0088cc' },
                            { icon: <Instagram />, color: '#E4405F' },
                            { icon: <Facebook />, color: '#1877F2' },
                        ].map((social, index) => (
                            <IconButton
                                key={index}
                                sx={{
                                    backgroundColor: social.color,
                                    color: 'white',
                                    width: 56,
                                    height: 56,
                                    '&:hover': {
                                        backgroundColor: social.color,
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                {social.icon}
                            </IconButton>
                        ))}
                    </Box>
                    <TextField
                        fullWidth
                        value={window.location.href}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="کپی لینک">
                                        <IconButton onClick={handleCopyUrl}>
                                            <ContentCopy />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />
                    {copied && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            لینک کپی شد!
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShareDialogOpen(false)}>بستن</Button>
                </DialogActions>
            </Dialog>

            {/* Fullscreen Image Dialog */}
            <Dialog
                open={!!fullscreenImage}
                onClose={() => setFullscreenImage(null)}
                maxWidth="lg"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                    },
                }}
            >
                <DialogActions>
                    <IconButton
                        onClick={() => setFullscreenImage(null)}
                        sx={{ color: 'white', position: 'absolute', top: 8, left: 8 }}
                    >
                        <Close />
                    </IconButton>
                    <IconButton
                        onClick={() => window.open(fullscreenImage, '_blank')}
                        sx={{ color: 'white', position: 'absolute', top: 8, right: 8 }}
                    >
                        <Fullscreen />
                    </IconButton>
                </DialogActions>
                <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src={fullscreenImage}
                        alt="Fullscreen"
                        sx={{
                            maxWidth: '100%',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* Print Dialog */}
            <Dialog
                open={printDialogOpen}
                onClose={() => setPrintDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    چاپ منو
                </DialogTitle>
                <DialogContent sx={{ py: 4 }}>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        آیا مایل به چاپ منو هستید؟
                    </Typography>
                    <Alert severity="info" sx={{ mb: 3 }}>
                        پیشنهاد می‌شود از حالت منظره (Landscape) برای چاپ استفاده کنید.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            window.print();
                            setPrintDialogOpen(false);
                        }}
                        variant="contained"
                        color="primary"
                    >
                        چاپ
                    </Button>
                    <Button
                        onClick={() => setPrintDialogOpen(false)}
                        variant="outlined"
                    >
                        انصراف
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for copy notification */}
            <Snackbar
                open={copied}
                autoHideDuration={3000}
                onClose={() => setCopied(false)}
                message="لینک در کلیپ‌بورد کپی شد"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />

            {/* Floating QR Button */}
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: 24,
                    background: 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)',
                }}
                onClick={() => setQrDialogOpen(true)}
            >
                <QrCodeIcon />
            </Fab>
        </Box>
    );
}

function TelegramIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.656-.643.136-.953l11.57-4.46c.538-.196 1.006.128.832.941z" />
        </svg>
    );
}

export default MenuPage;