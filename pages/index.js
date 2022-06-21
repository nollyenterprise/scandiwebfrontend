import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { Footer } from './../components/Partials/Footer';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [ isError, setError ] = useState(0);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ allProduct, setAllProduct ] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const rawResponse = await fetch(process.env.serverBaseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {"action":"getProducts", "productType": "All", id: "0"} )
    });
    const response = await rawResponse.json();
    if(response.code){
      setAllProduct(response.data);
    }else{
      setError(1);
      setErrorMessage(response.message);
    }
  }

  const deleteProduct = async () => {
    var id = [];
    document.querySelectorAll(".delete-checkbox").forEach(element=>{
      if(element.checked)
        id.push(element.getAttribute("req"));
    });
    if(id.length){
      const rawResponse = await fetch(process.env.serverBaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {"action":"deleteProducts", "productType": "All", id: id.join(",")} )
      });
      const response = await rawResponse.json();
      if(response.code){
        getProduct();
        document.querySelectorAll(".delete-checkbox").forEach(element=>{
          element.checked = false;
        });
      }else{
        setError(1);
        setErrorMessage(response.message);
      }
    }
  }

  const closeErrorMessage = () => {
    setError(0);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Scandiweb Test assignment</title>
        <meta name="description" content="Scandiweb Test assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={'errorMessage '+(!isError?'hide':'')}>
            Error! {errorMessage}
            <span onClick={closeErrorMessage}>&times;</span>
          </div>
          <header className={styles.header}>
            <span>
              <h1 className="page-title">Product List</h1>
            </span>
            <span>
              <button className='btn add' onClick={()=>router.push('/add-product')} >ADD</button>
              <button id='delete-product-btn' className='btn delete' onClick={deleteProduct}>MASS DELETE</button>
            </span>
          </header>
        </div>
        <hr className='line-divider' />
        <div className={styles.container}>
          <div className={styles.products}>

            {allProduct && allProduct.map((e,k) => {
                return (
                  <div key={k}>
                    <span>
                      <input type='checkbox' className='delete-checkbox' req={e.id} />
                    </span>
                    <span>
                      <span>{e.sku}</span>
                      <span>{e.name}</span>
                      <span>{e.price} {e.currency}</span>
                      <span>{e.prodType}</span>
                    </span>
                  </div>
              );
            })}
            
          </div>
        </div>
      </main>

      <Footer styles={styles} />
    </div>
  )
}
