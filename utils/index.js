import { ethers } from "ethers";
import identiFi from "./identiFi.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0xF24fd048593DACd98d70ef794afD56DB935C6f71",
      identiFi.abi,
      signer
    );

    return contractReader;
  }
};
