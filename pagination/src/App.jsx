import './App.css'
import { useState,useEffect } from 'react'
function App() {

  const [products,setProducts] =useState([]);
  const [page, setPage] = useState(1);
  const [totalpages,setTotalpages]=useState(0)

  const fetchProducts=async()=>{
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data=await res.json();
    console.log(data);

    if(data && data.products){
      setProducts(data.products)
      setTotalpages(Math.ceil(data.total / 10));
    }
  }
useEffect(()=>{
  fetchProducts()
},[page])

const selectPagehandler=(selectPage)=>{
  if(selectPage>=1 && 
    selectPage<= totalpages
     && selectPage !== page)
    setPage(selectPage)
}
  return (
   <div>
    {products.length>0 && <div className='products'>
      {products.map((item)=>{
return <span className='products__singal' key={item.id}>
  <img src={item.thumbnail} alt={item.title} />
  <span>
    {item.title}
  </span>
</span>
      })}
      </div>}

   
      {products.length > 0 && <div className="pagination">
       <span onClick={()=>selectPagehandler(page-1)} className={page>1 ?"":"pagination__disable"}>◀</span>
       {[...Array(totalpages)].map((_,i)=>{
        return <span key={i} className={page===i+1?"pagination__selected":""} onClick={()=>selectPagehandler(i+1)}>{i+1}</span>
       })}
       <span onClick={()=>selectPagehandler(page+1)} className={page<totalpages ? "":"pagination__disable"}>▶</span>
      </div>}
   </div>
  );
}

export default App
