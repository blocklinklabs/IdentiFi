import { ethers } from "ethers";
import identiFi from "./identiFi.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0xF0a3621822BD75352FdEE286e820Fe5571Ded2ca",
      identiFi.abi,
      signer
    );

    return contractReader;
  }
};
