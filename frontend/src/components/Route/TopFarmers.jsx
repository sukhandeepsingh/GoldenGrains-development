import React from 'react'

const TopFarmers = () => {

  const farmers = [
    { id: 1, name: 'John Doe', rating: 4.5, imageUrl: require('../../Assets/Images/carousel/pexels-flambo-388007-1112080.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    { id: 2, name: 'Jane Smith', rating: 4.7, imageUrl: require('../../Assets/Images/carousel/pexels-nc-farm-bureau-mark-2252584.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    { id: 3, name: 'Alice Johnson', rating: 4.1, imageUrl: require('../../Assets/Images/carousel/pexels-pixabay-164504.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    { id: 4, name: 'Bob Johnson', rating: 4.6, imageUrl: require('../../Assets/Images/carousel/pexels-pixabay-461960.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    { id: 5, name: 'Grett Alice', rating: 4.2, imageUrl: require('../../Assets/Images/carousel/pexels-quang-nguyen-vinh-222549-2165688.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    { id: 6, name: 'Don Clark', rating: 4.8, imageUrl: require('../../Assets/Images/carousel/pexels-tomfisk-1595108.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    { id: 7, name: 'David Hop', rating: 4.0, imageUrl: require('../../Assets/Images/carousel/pexels-pixabay-461960.jpg'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', memberSince: '2022-01-01' },
    // Add more farmers as needed
  ];

  const sortedFarmers = farmers.sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="w-full flex justify-center my-5">
      <div className="block w-11/12 justify-center bg-gradient-to-br from-slate-950 to-slate-600 p-6 rounded-lg">
        <div className="text-center text-3xl font-bold mb-8 text-[#fff]"> Top Farmers
          <div className="w-full flex justify-center items-center mt-5 mb-10">
            <hr className='w-[50%] text-[#fff]' />
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedFarmers && sortedFarmers.map((farmer) => (
            <div key={farmer.id} className="rounded-lg overflow-hidden min-w-[200px]">
              <img src={farmer.imageUrl} alt={farmer.name} className="w-[100pt] h-[100pt] object-cover rounded-full" />
              <div className="p-4 bg-transparent">
                <h3 className="text-lg font-medium mb-2 text-[#fff]">{farmer.name}</h3>
                <div className="flex items-center mb-2 text-[#fff]">
                  {[...Array(Math.floor(farmer.rating))].map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a1 1 0 0 1 1 1v5.879l2.44-1.42a1 1 0 1 1 1 1.732l-3 1.732a1 1 0 0 1-1 0l-3-1.732a1 1 0 0 1 1-1.732L9 9.879V4a1 1 0 0 1 1-1z" clipRule="evenodd" />
                    </svg>
                  ))}
                  {[...Array(Math.ceil(farmer.rating) - Math.floor(farmer.rating))].map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a1 1 0 0 1 1 1v5.879l2.44-1.42a1 1 0 1 1 1 1.732l-3 1.732a1 1 0 0 1-1 0l-3-1.732a1 1 0 0 1 1-1.732L9 9.879V4a1 1 0 0 1 1-1z" clipRule="evenodd" />
                    </svg>
                  ))}
                  <span className="text-[#fff]">{farmer.rating.toFixed(1)}</span>
                </div>
                <p className="mb-4 text-[#fff]">{farmer.description}</p>
                <div className="flex items-center justify-between text-sm text-[#fff]">
                  <span>Member Since: {farmer.memberSince}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopFarmers