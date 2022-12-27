import React from "react";
import "./App.css";
import { Web3Button } from "@web3modal/react";
import { useController } from "./web3/useController";
import { SendEth } from "./components/SendEth";
import { DeployContract } from "./components/DeployContract";
import { FallingContract } from "./components/FallingContract";
import { CreateToken } from "./components/CreateToken";
import { CollectiblesContract } from "./components/CollectiblesContract";
import { SignMessage } from "./components/SignMessage";
import { SignTypeData } from "./components/SignTypeData";
import { SendForm } from "./components/SendForm";
import dappImage from "./dapp.png";
import { useAutoConnect } from "./web3/useAutoConnect";

function App() {
  const { address, chain } = useController();
  useAutoConnect();
  return (
    <div className="App">
      <main className="container-fluid">
        <header>
          <div id="logo-container">
            <h1 id="logo-text" className="text-center">
              E2E Test Dapp
            </h1>

            <img id="mm-logo" src={dappImage} />
          </div>
        </header>

        <section>
          <div className="row d-flex justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-body align-items-center">
                  <Web3Button />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="info-text alert alert-primary">
                Network: <span id="network">{chain?.name}</span>
              </p>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="info-text alert alert-secondary">
                ChainId: <span id="chainId">{chain?.id}</span>
              </p>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="info-text alert alert-success">
                Accounts: <span id="accounts"> {address}</span>
              </p>
            </div>
          </div>
        </section>

        {/*<section>*/}
        {/*  <div className="row d-flex justify-content-center">*/}
        {/*    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">*/}
        {/*      <div className="card">*/}
        {/*        <div className="card-body">*/}
        {/*          <h4 className="card-title">Permissions Actions</h4>*/}

        {/*          <button*/}
        {/*            className="btn btn-primary btn-lg btn-block mb-3"*/}
        {/*            id="requestPermissions"*/}
        {/*          >*/}
        {/*            Request Permissions*/}
        {/*          </button>*/}

        {/*          <button*/}
        {/*            className="btn btn-primary btn-lg btn-block mb-3"*/}
        {/*            id="getPermissions"*/}
        {/*          >*/}
        {/*            Get Permissions*/}
        {/*          </button>*/}

        {/*          <p className="info-text alert alert-secondary">*/}
        {/*            Permissions result: <span id="permissionsResult"></span>*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        <section>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch">
              <div className="card full-width">
                <div className="card-body">
                  <h4 className="card-title">Send Eth</h4>

                  <SendEth />
                  <hr />
                  <h4 className="card-title">Froggy bank contract</h4>

                  <DeployContract />

                  <hr />
                  <h4 className="card-title">Failing contract</h4>

                  <FallingContract />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch">
              <div className="card full-width">
                <div className="card-body">
                  <h4 className="card-title">Send Tokens</h4>

                  <CreateToken />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch">
              <div className="card full-width">
                <div className="card-body">
                  <h4 className="card-title">Collectibles</h4>

                  <CollectiblesContract />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch">
              <div className="card full-width">
                <div className="card-body">
                  <SignMessage />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch">
              <div className="card full-width">
                <div className="card-body">
                  <SignTypeData />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="row d-flex justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-body">
                  <SendForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
