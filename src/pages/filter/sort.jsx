

function Sort(){
return(
    <div className="flex items-center mt-8">
    <h1>Sort</h1>
        <button className=' px-6 py-2 mx-4 border border-gray-400 rounded-xl'>Relevance</button>
       <button  className='px-6 py-2 mx-4 border border-gray-400 rounded-xl'>Popular</button>
        <button  className='px-6 py-2 mx-4 border border-gray-400 rounded-xl'>Most new</button>
        <button  className='px-6 py-2 mx-4 border border-gray-400 rounded-xl'>Price</button>
    </div>
)
}
export default Sort;