// this is the entrypoint to our application. Here we will update the code to include components that will be rendered/displayed, global imports, navigation, wallet connection, context, and some basic styling. This page serves as a wrapper or layout for the rest of the app

import '../styles/globals.css'
import { useState } from 'react' // form managing local state
import Link from 'next/link' //create links b/w pages
import { css } from '@emotion/css' // css api from emotion
import { ethers } from 'ethers'
import Web3Modal from 'web3modal' // allow us to get the users wallet
import WalletConnectProvider from '@walletconnect/web3-provider' // allows to choose different wallets other than metamask
import { AccountContext } from '../context.js' //helps to manage and update the address of the sign in user and pass that info around the app
import { ownerAddress } from '../config' // importing the owner address
import 'easymde/dist/easymde.min.css'

function MyApp({ Component, pageProps }) {
  /* create local state to save account information after signin, by default, it is set to null */
  const [account, setAccount] = useState(null)
 
  /* web3Modal configuration for enabling wallet access, create a new instance of web3 modal and return it */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      //network: 'mainnet',
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            //infuraId: process.env.NEXT_PUBLIC_INFURA_ID
            infuraId: "b782f651fe5442088319190ab7f55d2b"
          },
        },
      },
    })
    return web3Modal
  }

  /* the connect function calls web3 modal and get its instance to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection) //create a provider using ethers.js
      const accounts = await provider.listAccounts()
      setAccount(accounts[0]) //get first item in the array of accounts which will be the sign in user. this will set the local state
    } catch (err) {
      console.log('error:', err)
    }
  }

  //now we will return our UI
  return (
    <div>
      <nav className={nav}>
        <div className={header}>
        {
          /* header it is the svg */
        }
          <Link href="/">
            <a>
              <img
                src='/logo.svg'
                alt="React Logo"
                style={{ width: '50px' }}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={titleContainer}>
                <h2 className={title}>Full Stack</h2>
                <p className={description}>Web3 Blog</p>
              </div>
            </a>
          </Link>
          {
          /*check if user is connected w/ metamask or not*/
        }
          {
            !account && (
              <div className={buttonContainer}>
                <button className={buttonStyle} onClick={connect}><b>Connect</b></button>
              </div>
            )
          }
          {
            account && <p className={accountInfo}>{account}</p>
          }
        </div>
        <div className={linkContainer}>
          <Link href="/" >
            <a className={link}>
              Home
            </a>
          </Link>
          {
            /* if the signed in user is the contract owner, we */
            /* show the nav link to create a new post */
            (account === ownerAddress) && (
              <Link href="/create-post">
                <a className={link}>
                  Create Post
                </a>
              </Link>
            )
          }
        </div>
        <span className={creditsContainer}>
          <Link href="https://www.linkedin.com/in/dhaval-kukreja/" >
            <a className={link}>
              Built by : <u>https://www.linkedin.com/in/dhaval-kukreja/</u>
            </a>
          </Link>
          DEPLOYED ON MATIC MUMBAI TESTNET
        </span>
      </nav>
      {
        /* Here we will be rendering our actual application. when value of account changes, the second line changes and so on */
      }
      <div className={container}>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  )
}


// const my var = css `` hower effects are also available

const accountInfo = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 12px;
`

const container = css`
  padding: 40px;
`

const linkContainer = css`
  padding: 30px 60px;
  background-color: #fafafa;
`
const creditsContainer = css`
  padding: 20px 60px;
  background-color: #ffff00;
  font-family: "Lucida Console", "Courier New", monospace;
`

const nav = css`
  background-color: white;
`

const header = css`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, .075);
  padding: 20px 30px;
`

const description = css`
  margin: 0;
  color: #999999;
`

const titleContainer = css`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`

const title = css`
  margin-left: 30px;
  font-weight: 500;
  margin: 0;
`

const buttonContainer = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const buttonStyle = css`
  background-color: #ffff00;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 16px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const link = css`
  margin: 0px 40px 0px 0px;
  font-size: 16px;
  font-weight: 400;
`

export default MyApp