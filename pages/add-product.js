import Head from 'next/head';
import styles from '../styles/AddProducts.module.css';
import { useRouter } from 'next/router';
import { DvdOption, FurnitureOption, BookOption } from './../components/productTypeSwitcher'
import { Footer } from './../components/Partials/Footer';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [ productType, setProductType ] = useState('1');
  const [ sku, setSku ] = useState('');
  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ size, setSize ] = useState('');
  const [ height, setHeight ] = useState('');
  const [ width, setWidth ] = useState('');
  const [ length, setLength ] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ isError, setError ] = useState(0);
  const [ errorMessage, setErrorMessage ] = useState('');
  const typeSwitcher = (req) => {
    setProductType(req.target.value);
  }
  const submitHandler = async () => {
    const rawResponse = await fetch('https://applications.tekxus.com/scandiwebjwd/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {"action":"Add",productType,sku,name,price,size,height,width,length,weight} )
    });
    const response = await rawResponse.json();
    if(response.code)
      router.push("/");
    else{
      setError(1);
      setErrorMessage(response.message);
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
          <header className={styles.header}>
            <span>
              <h1 className="page-title">Product Add</h1>
            </span>
            <span>
              <button className='btn save' onClick={ submitHandler }>Save</button>
              <button className='btn cancel' onClick={()=>router.push('/')} >Cancel</button>
            </span>
          </header>
        </div>
        <hr className='line-divider' />
        <div className={styles.container}>
          <div className={'errorMessage '+(!isError?'hide':'')}>
            Error! {errorMessage}
            <span onClick={closeErrorMessage}>&times;</span>
          </div>
          <div className={styles.addProducts}>
            <form id="product_form"  className={styles.productForm}>
                <div>
                    <label>SKU</label>
                    <div>
                        <input 
                          type='text'
                          id="sku" 
                          className="form-scandiweb" 
                          defaultValue={sku} 
                          onChange={(e)=>setSku(e.target.value)} 
                        />
                    </div>
                </div>
                <div>
                    <label>Name</label>
                    <div>
                        <input
                          type='text'
                          id="name" 
                          className="form-scandiweb" 
                          defaultValue={name} 
                          onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label>Price</label>
                    <div>
                        <input 
                          type='number'
                          id="price" 
                          className="form-scandiweb" 
                          defaultValue={price} 
                          onChange={(e)=>setPrice(e.target.value)} 
                        />
                    </div>
                </div>
                <div>
                    <label>TYPE SWITCHER</label>
                    <select id="productType" className="form-scandiweb" onChange={typeSwitcher}>
                        <option id="DVD" value="1">DVD</option>
                        <option id="Furniture" value="2">Furniture</option>
                        <option id="Book" value="3">Book</option>
                    </select>
                </div>
                {productType=="1"?
                <DvdOption 
                  size={size} 
                  setSize={setSize}
                />:
                productType=="2"?
                <FurnitureOption
                  height={height}
                  width={width}
                  length={length}
                  setHeight={setHeight}
                  setWidth={setWidth}
                  setLength={setLength}
                />:
                <BookOption
                  weight={ weight } 
                  setWeight={setWeight}
                />}
            </form>
          </div>
        </div>
      </main>

      <Footer styles={styles} />
    </div>
  )
}
