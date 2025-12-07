import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuApi, foodApi } from '../utils/api';

const FoodManager = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // بارگذاری منو
                const menuRes = await menuApi.getById(id);
                if (menuRes && menuRes.success) {
                    setMenu(menuRes.data);
                    setSelectedFoods(menuRes.data.foods || []);
                }

                // بارگذاری غذاهای موجود
                const foodsRes = await foodApi.getAll();
                if (foodsRes && foodsRes.success) {
                    setFoods(foodsRes.data || []);
                }
            } catch (error) {
                console.error('خطا در بارگذاری:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleSaveFoods = async () => {
        try {
            const response = await menuApi.update(id, {
                ...menu,
                foods: selectedFoods
            });

            if (response && response.success) {
                alert('✅ غذاها با موفقیت ذخیره شدند');
                navigate('/');
            }
        } catch (error) {
            alert('❌ خطا در ذخیره غذاها');
        }
    };

    if (loading) return <div>در حال بارگذاری...</div>;
    if (!menu) return <div>منو یافت نشد</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">مدیریت غذاهای منو: {menu.title}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* لیست غذاهای موجود */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <h2 className="text-xl font-bold mb-4">غذاهای موجود</h2>
                        <div className="space-y-3">
                            {foods.map(food => (
                                <div key={food._id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">{food.name}</h3>
                                        <p className="text-sm text-gray-600">{food.price} تومان</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (!selectedFoods.includes(food._id)) {
                                                setSelectedFoods([...selectedFoods, food._id]);
                                            }
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        افزودن
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* غذاهای انتخاب شده */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <h2 className="text-xl font-bold mb-4">غذاهای منو ({selectedFoods.length})</h2>
                        <div className="space-y-3">
                            {selectedFoods.map(foodId => {
                                const food = foods.find(f => f._id === foodId);
                                if (!food) return null;

                                return (
                                    <div key={foodId} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h3 className="font-medium">{food.name}</h3>
                                            <p className="text-sm text-gray-600">{food.price} تومان</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedFoods(selectedFoods.filter(id => id !== foodId));
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleSaveFoods}
                            className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            ذخیره غذاها
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodManager;