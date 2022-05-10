import { ethers } from "ethers";

let ethersProvider;

if (typeof window !== "undefined") {
  ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  ethersProvider = new ethers.providers.JsonRpcProvider();
}

export default ethersProvider;
