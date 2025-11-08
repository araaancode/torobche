import React from 'react';

const ImageGallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "رستوران لوکس",
      description: "منوی دیجیتال در محیطی مدرن"
    },
    {
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "کافه دنج",
      description: "تجربه سفارش‌دهی راحت"
    },
    {
      url: "https://images.unsplash.com/photo-1578474846611-2fe67db3f397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "فست فود",
      description: "سفارش‌گیری سریع و کارآمد"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {images.map((image, index) => (
        <div key={index} className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
          <img 
            src={image.url} 
            alt={image.title}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="text-white">
              <h4 className="text-xl font-bold mb-2">{image.title}</h4>
              <p className="text-blue-100">{image.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;