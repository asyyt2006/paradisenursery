import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantCategories = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters indoor air pollutants.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores from air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Natural air humidifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Cleans formaldehyde from air.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2017/04/10/16/54/aloe-vera-2218820_1280.jpg", description: "Purifies air and heals skin.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/22/18/03/lavender-1535496_1280.jpg", description: "Calming scent for relaxation.", cost: "$16" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/08/01/08/29/jasmine-2563678_1280.jpg", description: "Sweet, fragrant white flowers.", cost: "$22" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Fragrant herb for cooking.", cost: "$12" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2017/07/11/18/25/mint-2494637_1280.jpg", description: "Refreshing scent and herbal tea.", cost: "$8" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/11/17/20/09/eucalyptus-3821915_1280.jpg", description: "Invigorating fresh scent.", cost: "$19" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2016/06/15/18/38/herb-1459695_1280.jpg", description: "Citrus aroma to boost mood.", cost: "$11" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi (Holy Basil)", image: "https://cdn.pixabay.com/photo/2020/08/28/06/13/tulsi-5523671_1280.jpg", description: "Boosts immune system health.", cost: "$13" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/peppermint-1238258_1280.jpg", description: "Aids digestion and soothing.", cost: "$9" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2017/07/12/12/32/chamomile-2496794_1280.jpg", description: "Promotes restful sleep.", cost: "$14" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2017/07/19/08/50/marigold-2518423_1280.jpg", description: "Soothes skin irritations.", cost: "$11" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2016/09/02/16/32/thyme-1639695_1280.jpg", description: "Natural antimicrobial herb.", cost: "$10" },
        { name: "Gotu Kola", image: "https://cdn.pixabay.com/photo/2021/02/17/14/05/plant-6024345_1280.jpg", description: "Supports memory and brain health.", cost: "$17" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#2e7d32', color: '#fff' }}>
        <h2>Paradise Nursery</h2>
        <div>
          <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1rem', marginRight: '20px', cursor: 'pointer' }}>Plants</button>
          <button onClick={() => setShowCart(true)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}>
            🛒 Cart ({totalQuantity})
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantCategories.map((cat, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2 style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '10px' }}>{cat.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3>{plant.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', margin: '10px 0' }}>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)} 
                      disabled={isPlantInCart(plant.name)}
                      style={{ padding: '8px 16px', backgroundColor: isPlantInCart(plant.name) ? '#ccc' : '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: isPlantInCart(plant.name) ? 'not-allowed' : 'pointer' }}
                    >
                      {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
