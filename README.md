# Customisable Thirdweb Bundle Drop Embed

### Why?
> I released my first NFT drop a few weeks ago using Thirdweb. I loved the experience - especially, the embed! But I wanted to make a few customisations, to 
> make it fit well with my app and to increase the UX. Unfortuanately, I got to know that it wasn't possible. 
>
> So I decided to write my own. While I was at it, I figured that this can save a lot of time for people who don't wanna get into code for minor customisations. 
> So I added a few more options which I think might be useful.

### Features
- Plug & Play
- Visually similar
- Functionally similar
- Deployed on IPFS
- 30+ customisation params
- No code level involvement required

Thirdweb Embed             |  Custom Embed
:-------------------------:|:-------------------------:
<img src="https://i.imgur.com/2HGwr9i_d.webp?maxwidth=760&fidelity=grand" width="350" height="350"/>   |  <img src="https://i.imgur.com/5aj8e1e_d.webp?maxwidth=760&fidelity=grand" width="350" height="350"/>

### How?
- Copy ```https://cloudflare-ipfs.com/ipfs/QmcyooYTWWNn4NsVttB2VSzXQuKKeoVmQFT6M2EpRU5qHC/```
- Go to this [website](https://www.345tool.com/generator/query-string-generator) and paste the copied link in the ```Base URL``` field. Like this 👇
  <img src="https://user-images.githubusercontent.com/22350239/158563875-bf56abe4-0a22-48ca-8051-389f5e04f060.png" height="80"/><br/>
- Then tap the ```Add Query Pair``` button to add a key/value pair.
- Choose the params that you wish to customise from the [table below](#customisations) and assign a suitable value. Example 👇
  <img src="https://user-images.githubusercontent.com/22350239/158566377-823f5b4a-1d85-4b0c-b864-5fdd9ce703ae.png" height="400"/><br/>
- Copy the generated ```Encoded URL```. Here's an [example](https://cloudflare-ipfs.com/ipfs/QmcyooYTWWNn4NsVttB2VSzXQuKKeoVmQFT6M2EpRU5qHC/?borderRadius=35&chainId=80001&contract=0x048B0556bf62D4c579b93eD5b7Bb75220AfBca68&tokenId=3&showInventory=false). <br/>
  <img src="https://user-images.githubusercontent.com/22350239/158571651-602fc2b2-4c85-4b3b-a500-d1b619c072fb.png" height="200"/><br/>
- Replace the URL in the ```src``` field of the embed code given by thirdweb, with the URL copied in the last step.
```
  <iframe
    src="Enter copied URL here"
    width="600px"
    height="600px"
    style="max-width:100%;"
    frameborder="0"
  ></iframe>
```
- Place this embed wherever you wish (Wix, Bubble, Dorik, Carrd etc) and you're good to go! 🚀

### Customisations

| Param                | Description                                            | Default Value                   | Required |
|----------------------|--------------------------------------------------------|---------------------------------|----------|
| borderRadius         | to change the border radius of the container           | 15                              | No       |
| chainId              | to specify the chain where your contract is deployed   | 1 (Ethereum)                    | Yes      |
| contract             | your contract id                                       | null                            | Yes      |
| description          | to override the description text                       | description in your contract    | No       |
| fallbackImage        | to change the image that shows while NFT is loading    | https://i.imgur.com/Wg2ESNp.png | No       |
| footerImage          | to change the logo in the bottom right corner          | https://i.imgur.com/vsz2mTP.png | No       |
| footerUrl            | to change the hyperlink of the footer logo             | https://thirdweb.com            | No       |
| imageBorderRadius    | to change the border radius of the image               | 20                              | No       |
| imageHeight          | to change the height of the image                      | 178                             | No       |
| imageWidth           | to change the width of the image                       | 178                             | No       |
| inventoryTitle       | to override the title text inside 'Inventory'          | title in your contract          | No       |
| inventoryImageHeight | to change the height of the image inside 'Inventory'   | 320                             | No       |
| inventoryImageWidth  | to change the width of the image inside 'Inventory'    | 320                             | No       |
| mintAllowedPerWallet | to specify how many NFTs can each wallet mint in total | 1                               | No       |
| mintText             | to change the text of the mint button                  | Mint (Free)                     | No       |
| rpcUrl               | to use a custom RPC                                    | based on [chainId](https://github.com/Cheesetouched/thirdweb-bundle-drop-embed/blob/f413140babfff9f51f86d78dda3a1c3857e6eafa/src/utils/helper.js#L12)   | No       |
| showBalance          | to show balance of the connected wallet in popup       | true                            | No       |
| showClaimCount       | to show the counter that shows claim status            | true                            | No       |
| showDescription      | to show the description text                           | true                            | No       |
| showInventory        | to show the inventory tab                              | true                            | No       |
| showRemainingMints   | to show the remaining mints in the 'Mint' tab          | true                            | No       |
| showThirdwebLogo     | to show the Thirdweb logo in the footer                | true                            | No       |
| showTitle            | to show the title text                                 | true                            | No       |
| showWallet           | to show the wallet when connected                      | true                            | No       |
| title                | to override the title text                             | title in your contract          | No       |
| tokenId              | to specify the token id                                | null                            | Yes      |
| relayer              | to specify relayer url to enable gasless transactions  | null                            | No       |
| walletlinkAppName    | to change app name for walletlink                      | test                            | No       |
| walletlinkAppUrl     | to change app url for walletlink                       | https://test.com                | No       |
| walletlinkDarkMode   | to change dark mode for walletlink                     | true                            | No       |

### Don't see your customisation in the table?
> You have 2 options:

1. Create an [issue](https://github.com/Cheesetouched/thirdweb-bundle-drop-embed/issues) and describe the customisation that you want.
I'll try my best to add it as soon as possible. If someone else has created an issue already, just upvote it. This will help me 
prioritise.

2. Fork this repository. Make your customisations, push changes and deploy your own build. I suggest [Fleek](https://fleek.co) as I 
have deployed there myself. It can pick your fork from GitHub directly and deploy to IPFS with your changes. 🔥

### Troubleshooting
> Something not working as expected? Here are your options:

1. Double check the values of ```chainId```, ```contract``` and ```tokenId```, as they are required parameters.
2. Check for typos in parameter names and their values. Refer to the table above to know their default values.
3. Open an [issue](https://github.com/Cheesetouched/thirdweb-bundle-drop-embed/issues) and describe the problem. I will look into it.

### Common Issues
1. **Issue**: Initial load, NFT load and minting process is really slow. <br/>
   **Reason**: Public RPCs are used by default. Sometimes, there's a lot of traffic and hence, the response time is slow. <br/>
   **Fix**:
    - Go to [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/).
    - Register and get a dedicated RPC URL for the desired chain.
    - Pass that to the ```rpcUrl``` param to override the default RPC URL.
    - Done! 🚀

2. **Issue**: Transactions are not gasless. <br/>
   **Reason**: A transaction relayer is required for gasless transactions. It is ```null``` by default. <br/>
   **Fix**:
    - Thirdweb has written a comprehensive guide on this. Obtain relayer URL using [that](https://portal.thirdweb.com/guides/setup-gasless-transactions).
    - Pass the relayer URL to the ```relayer``` param.
    - You transactions should be gasless now! 🚀

### What Next?
Thirdweb team is already working on a customisable embed as this is one of the most requested features but as of now there's no ETA. 
So I will maintain this project for as long as I can (hard to keep up with Thirdweb as they ship really fast! 😬) until they release. 
Hopefully this will fulfil majority of the customisation needs in the meantime. If this project helped you in anyway, consider starring 
it and sharing it with anyone who might need it. Adios! 👋
