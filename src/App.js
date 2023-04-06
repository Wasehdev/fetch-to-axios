import './App.css';
import { deleteService, getService, postService, putService } from './utils/service';

function App() {
  async function fetchData (){
  let params = {
    limit: 10,
    skip: 10,
    select:'title'
  }
  let res = await  getService('https://dummyjson.com/products', params)
  // let res2 = await  getService('https://dummyjson.com/products')
  // let res3 = await  getService('https://dummyjson.com/products1', 'null21121')


  let res4 = await postService('https://dummyjson.com/products/add', { title: 'BMW Pencil'})

  let res5 = await putService('https://dummyjson.com/products/1', { title: 'BMW Hello'})

  let res6 = await deleteService('https://dummyjson.com/products/1')

  // let res5 = await postService('https://dummyjson.com/products/add',formData)
  console.log("fetch with params", res)
  // console.log("fetch without params", res2)
  // console.log("fetch with error", res3)
  console.log("fetch post", res4)
  console.log("fetch put", res5)
  console.log("fetch delete", res6)

}

fetchData()
  return (
    <div className="App">
    </div>
  );
}

export default App;
