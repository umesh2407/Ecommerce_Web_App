import React from 'react'
import Layout from '../components/Layout/Layout'
// import { useAuth } from '../context/auth-context';

const Home = () => {
    // const [auth,setAuth]= useAuth();
  return (

   <Layout title={"Best offers"}>
    Home
    {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
   </Layout>
  )
}

export default Home